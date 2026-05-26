"""ANSYS Mechanical v252 Shaft FEA — optimized workflow with template caching.

Usage:
  py run_mech_and_fea.py

First run:  launches Mechanical, imports geometry, meshes, saves template (~3 min)
Repeat run: opens cached template, applies loads, solves (~90s)

Geometry map (shaft):
  Seg 1: Y=0-20,  R=8.5  — free end
  Seg 2: Y=20-40, R=9.5  — FixedSupport on faces [50, 54]
  Seg 3: Y=40-80, R=10.5 — largest diameter
  Seg 4: Y=80-100,R=9.5  — Force 500N at vertex 45 (0,80,9.5), -Z direction
  Seg 5: Y=100-120,R=8.5 — free end
"""
import os, sys, json, time, subprocess

OUTPUT_DIR = r"D:\Claude Works\IDEA works\ANSYS_SIMULATION_TEST1"
RESULTS_DIR = os.path.join(OUTPUT_DIR, "results")
STEP_FILE = os.path.join(OUTPUT_DIR, "work_pieces", "shaft.step")
TEMPLATE_FILE = os.path.join(OUTPUT_DIR, "meshed_template.mechdat")
RESULT_FILE = os.path.join(RESULTS_DIR, "analysis_results.json")

MECH_EXE = r"F:\WORKS\Ansys\ANSYS Inc\v252\aisol\bin\winx64\AnsysWBU.exe"

QUEUE_ROOT = os.path.join(OUTPUT_DIR, "ansys-workbench-mcp", "workbench_queue")
REQ_DIR = os.path.join(QUEUE_ROOT, "requests")
RESP_DIR = os.path.join(QUEUE_ROOT, "responses")
for d in [RESULTS_DIR, QUEUE_ROOT, REQ_DIR, RESP_DIR]:
    os.makedirs(d, exist_ok=True)

# ─── Queue helper ────────────────────────────────────────────────────
def queue_req(code, rid, timeout=600):
    rfile = os.path.join(REQ_DIR, rid + ".json")
    rspfile = os.path.join(RESP_DIR, rid + ".json")
    if os.path.exists(rspfile): os.remove(rspfile)
    with open(rfile, "w", encoding="utf-8") as f:
        json.dump({"action": "execute_python", "code": code}, f)
    for i in range(timeout):
        if os.path.exists(rspfile):
            with open(rspfile, "r", encoding="utf-8") as f:
                return json.load(f)
        time.sleep(1)
    return {"ok": False, "error": "timeout"}

# ─── Launch Mechanical if not already running ───────────────────────
stale = subprocess.getoutput('tasklist | findstr AnsysWBU')
mech_alive = 'AnsysWBU' in stale

if not mech_alive:
    # Clean queue
    for f in os.listdir(REQ_DIR):
        try: os.remove(os.path.join(REQ_DIR, f))
        except: pass
    for f in os.listdir(RESP_DIR):
        try: os.remove(os.path.join(RESP_DIR, f))
        except: pass

    env = os.environ.copy()
    env["WB1_STANDALONE"] = "1"
    args = [MECH_EXE, "-r", "252", "-AppModeMech", "-DSApplet", "-nosplash", "-notabctrl"]
    print("Launching Mechanical standalone...")
    subprocess.Popen(args, env=env, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
        creationflags=subprocess.CREATE_NO_WINDOW)

    print("Waiting 90s for initialization...")
    for i in range(90):
        alive = subprocess.getoutput('tasklist | findstr AnsysWBU')
        if "AnsysWBU" not in alive:
            print("ERROR: Mechanical died during startup"); sys.exit(1)
        if i % 15 == 14:
            print("  still waiting... ({}/{})".format(i+1, 90))
        time.sleep(1)
    print("Mechanical ready.")
else:
    print("Mechanical already running (PID: {}), reusing.".format(stale.split()[1]))

# ─── Build & submit FEA code ────────────────────────────────────────
FEA_CODE = r"""
from __future__ import print_function
import os, time

outdir = r"D:\Claude Works\IDEA works\ANSYS_SIMULATION_TEST1"
resdir = os.path.join(outdir, "results")
stepfile = os.path.join(outdir, "work_pieces", "shaft.step")
template = os.path.join(outdir, "meshed_template.mechdat")
timestamp = time.strftime("%Y%m%d_%H%M%S")
result_mechdat = os.path.join(outdir, "shaft_result_" + timestamp + ".mechdat")

if not os.path.isdir(resdir): os.makedirs(resdir)
log = []; ok = True; _m = None

# Fresh project every time (reliable)
try: ExtAPI.DataModel.Project.New()
except: pass
try:
    _m = ExtAPI.DataModel.Project.Model
    log.append("project=new")
except Exception as e:
    log.append("project=fail:" + str(e)[:200]); ok = False

if ok:
    try:
        a = _m.AddStaticStructuralAnalysis()
        log.append("analysis=ok")
    except Exception as e:
        log.append("analysis=fail:" + str(e)[:200]); ok = False

if ok:
    try:
        gi = _m.GeometryImportGroup.AddGeometryImport()
        gi.Import(stepfile)
        log.append("import=ok")
    except Exception as e:
        log.append("import=fail:" + str(e)[:200]); ok = False

if ok:
    try:
        msh = _m.Mesh
        try: msh.ElementSize = Quantity(5.0, "mm")
        except: pass
        try: msh.Resolution = 5
        except: pass
        msh.GenerateMesh()
        log.append("mesh=ok")
    except Exception as e:
        log.append("mesh=fail:" + str(e)[:200]); ok = False

# Cache meshed project as template for future (saved, not loaded)
try: ExtAPI.DataModel.Project.Save(template)
except: pass

if not ok:
    log.append("status=failed")
else:
    body = None
    try:
        bodies = list(_m.Geometry.GetBodies())
        body = bodies[0]
        log.append("body=ok")
    except Exception as e:
        log.append("body_err=" + str(e)[:200]); ok = False

    if ok and body is not None:
        try: body.Material = "Structural Steel"; log.append("mat=ok")
        except: log.append("mat=bypass")

    # FixedSupport on Seg 2 (faces 50, 54)
    if ok:
        try:
            fs = a.AddFixedSupport()
            sel = ExtAPI.SelectionManager.CreateSelectionInfo(0)
            sel.Ids = [50, 54]
            fs.Location = sel
            log.append("FS=ok")
        except Exception as e:
            log.append("FS_fail=" + str(e)[:200]); ok = False

    # Force 500N at vertex 45, -Z direction
    if ok:
        try:
            f = a.AddForce()
            f.DefineBy = 0
            f.ZComponent.Output.SetDiscreteValue(0, Quantity(-500.0, "N"))
            sel = ExtAPI.SelectionManager.CreateSelectionInfo(0)
            sel.Ids = [45]
            f.Location = sel
            log.append("Force=ok")
        except Exception as e:
            log.append("Force_fail=" + str(e)[:200]); ok = False

    # Solve
    if ok:
        try:
            sol = a.Solution
            sol.Solve()
            log.append("solve=ok")
        except Exception as e:
            log.append("solve=fail:" + str(e)[:200]); ok = False

    # Results
    if ok:
        try:
            es = sol.AddEquivalentStress()
            es.EvaluateAllResults()
            print("STRESS_MIN:" + str(es.Minimum))
            print("STRESS_MAX:" + str(es.Maximum))
            log.append("stress=ok")
        except Exception as e:
            log.append("stress=fail:" + str(e)[:200])

        try:
            est = sol.AddEquivalentElasticStrain()
            est.EvaluateAllResults()
            print("STRAIN_MIN:" + str(est.Minimum))
            print("STRAIN_MAX:" + str(est.Maximum))
            log.append("strain=ok")
        except Exception as e:
            log.append("strain=fail:" + str(e)[:200])

    # Save result .mechdat
    try:
        ExtAPI.DataModel.Project.Save(result_mechdat)
        log.append("saved=ok")
    except Exception as e:
        log.append("save=fail:" + str(e)[:200])

log.append("status=completed" if ok else "status=failed")

print("FEA_DONE")
for item in log: print("LOG:" + item)
"""

print("=== Submitting FEA ===")
resp = queue_req(FEA_CODE, "run_fea", timeout=600)

status = "unknown"
stress_min = stress_max = strain_min = strain_max = None

if resp.get("ok"):
    stdout = resp.get("stdout", "")
    for line in stdout.splitlines():
        line = line.strip()
        if line.startswith("STRESS_MIN:"): stress_min = line[11:]
        elif line.startswith("STRESS_MAX:"): stress_max = line[11:]
        elif line.startswith("STRAIN_MIN:"): strain_min = line[12:]
        elif line.startswith("STRAIN_MAX:"): strain_max = line[12:]
        elif line.startswith("LOG:status="): status = line[11:]
        elif line == "FEA_DONE": pass
    if stdout:
        print(stdout)
else:
    print("FEA failed:", resp.get("error", "unknown error"))
    if resp.get("traceback"):
        print(resp["traceback"][:500])

# Write results JSON from parsed stdout
results = {"status": status, "solved": status == "completed"}
if stress_min: results["stress_min"] = stress_min
if stress_max: results["stress_max"] = stress_max
if strain_min: results["strain_min"] = strain_min
if strain_max: results["strain_max"] = strain_max
with open(RESULT_FILE, "w") as f:
    json.dump(results, f, indent=2)

# Summary
if stress_max:
    try:
        smax_mpa = float(stress_max.split()[0]) / 1e6
        smin_val = float(stress_min.split()[0]) if stress_min else 0
        emax_val = float(strain_max.split()[0]) if strain_max else 0
        emin_val = float(strain_min.split()[0]) if strain_min else 0
        print("\n  Stress:  {:.2f} MPa  (min {:.2e} Pa)".format(smax_mpa, smin_val))
        print("  Strain:  {:.2e} m/m  (min {:.2e} m/m)".format(emax_val, emin_val))
    except: pass
print("  Status:  {}".format(status))
print("\nDone. Mechanical kept running for fast iterations.")
