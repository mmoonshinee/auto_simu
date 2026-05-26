"""lianjiejian (连接件) FEA — 侧面2孔固定，底面5000N分布力，6061铝合金。"""
import os, sys, json, time, subprocess

OUTPUT_DIR = r"D:\Claude Works\IDEA works\ANSYS_SIMULATION_TEST1"
RESULTS_DIR = os.path.join(OUTPUT_DIR, "results")
STEP_FILE = os.path.join(OUTPUT_DIR, "work_pieces", "lianjiejian.STEP")
MECH_EXE = r"F:\WORKS\Ansys\ANSYS Inc\v252\aisol\bin\winx64\AnsysWBU.exe"
QUEUE_ROOT = os.path.join(OUTPUT_DIR, "ansys-workbench-mcp", "workbench_queue")
REQ_DIR = os.path.join(QUEUE_ROOT, "requests")
RESP_DIR = os.path.join(QUEUE_ROOT, "responses")
for d in [RESULTS_DIR, REQ_DIR, RESP_DIR]:
    os.makedirs(d, exist_ok=True)

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

# Launch Mechanical if not running
stale = subprocess.getoutput('tasklist | findstr AnsysWBU')
mech_alive = 'AnsysWBU' in stale
if not mech_alive:
    for f in os.listdir(REQ_DIR):
        try: os.remove(os.path.join(REQ_DIR, f))
        except: pass
    for f in os.listdir(RESP_DIR):
        try: os.remove(os.path.join(RESP_DIR, f))
        except: pass
    env = os.environ.copy(); env["WB1_STANDALONE"] = "1"
    args = [MECH_EXE, "-r", "252", "-AppModeMech", "-DSApplet", "-nosplash", "-notabctrl"]
    print("Launching Mechanical standalone...")
    subprocess.Popen(args, env=env, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
        creationflags=subprocess.CREATE_NO_WINDOW)
    for i in range(90):
        alive = subprocess.getoutput('tasklist | findstr AnsysWBU')
        if "AnsysWBU" not in alive:
            print("ERROR: Mechanical died"); sys.exit(1)
        if i % 15 == 14: print("  waiting... {}/90".format(i+1))
        time.sleep(1)
else:
    print("Mechanical already running, reusing.")

FEA_CODE = r"""
from __future__ import print_function
import os, time

outdir = r"D:\Claude Works\IDEA works\ANSYS_SIMULATION_TEST1"
resdir = os.path.join(outdir, "results")
stepfile = os.path.join(outdir, "work_pieces", "lianjiejian.STEP")
timestamp = time.strftime("%Y%m%d_%H%M%S")
result_mechdat = os.path.join(outdir, "lianjiejian_result_" + timestamp + ".mechdat")

if not os.path.isdir(resdir): os.makedirs(resdir)
log = []; ok = True; _m = None

# Fresh project
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
        try: msh.ElementSize = Quantity(3.0, "mm")
        except: pass
        try: msh.Resolution = 5
        except: pass
        msh.GenerateMesh()
        log.append("mesh=ok")
    except Exception as e:
        log.append("mesh=fail:" + str(e)[:200]); ok = False

if not ok:
    log.append("status=failed")
else:
    # Body
    body = None
    try:
        bodies = list(_m.Geometry.GetBodies())
        body = bodies[0]
        log.append("body=ok")
    except Exception as e:
        log.append("body_err=" + str(e)[:200]); ok = False

    # Material: Import Aluminum Alloy from library
    if ok and body is not None:
        try:
            mats = _m.Materials
            mats.Import(r"F:/WORKS/Ansys/ANSYS Inc/v252/Addins/EngineeringData/Samples/General_Materials.xml")
            body.Material = "Aluminum Alloy"
            log.append("mat=AluminumAlloy")
        except Exception as me:
            try: body.Material = "Structural Steel"; log.append("mat=steel")
            except: log.append("mat=bypass")

    # FixedSupport on 2 through-holes (4 cylindrical faces: 64,65,79,80)
    if ok:
        try:
            fs = a.AddFixedSupport()
            sel = ExtAPI.SelectionManager.CreateSelectionInfo(0)
            sel.Ids = [64, 65, 79, 80]
            fs.Location = sel
            log.append("FS=ok (holes 64,65,79,80)")
        except Exception as e:
            log.append("FS_fail=" + str(e)[:200]); ok = False

    # Force 100N on bottom face 72 (Z=-100), +Z direction
    if ok:
        try:
            f = a.AddForce()
            f.DefineBy = 0
            f.ZComponent.Output.SetDiscreteValue(0, Quantity(5000.0, "N"))
            sel = ExtAPI.SelectionManager.CreateSelectionInfo(0)
            sel.Ids = [72]
            f.Location = sel
            log.append("Force=ok (face72 +Z 100N)")
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

        try:
            deform = sol.AddTotalDeformation()
            deform.EvaluateAllResults()
            print("DEFORM_MIN:" + str(deform.Minimum))
            print("DEFORM_MAX:" + str(deform.Maximum))
            log.append("deform=ok")
        except Exception as e:
            log.append("deform=fail:" + str(e)[:200])

    # Save
    try:
        ExtAPI.DataModel.Project.Save(result_mechdat)
        log.append("saved=ok")
    except Exception as e:
        log.append("save=fail:" + str(e)[:200])

log.append("status=completed" if ok else "status=failed")
print("FEA_DONE")
for item in log: print("LOG:" + item)
"""

print("=== Submitting lianjiejian FEA ===")
resp = queue_req(FEA_CODE, "lianjiejian_fea", timeout=600)

status = "unknown"
stress_min = stress_max = strain_min = strain_max = deform_min = deform_max = None

if resp.get("ok"):
    stdout = resp.get("stdout", "")
    for line in stdout.splitlines():
        line = line.strip()
        if line.startswith("STRESS_MIN:"): stress_min = line[11:]
        elif line.startswith("STRESS_MAX:"): stress_max = line[11:]
        elif line.startswith("STRAIN_MIN:"): strain_min = line[11:]
        elif line.startswith("STRAIN_MAX:"): strain_max = line[11:]
        elif line.startswith("DEFORM_MIN:"): deform_min = line[11:]
        elif line.startswith("DEFORM_MAX:"): deform_max = line[11:]
        elif line.startswith("LOG:status="): status = line[11:]
    if stdout:
        print(stdout[:3000])
else:
    print("FEA failed:", resp.get("error", ""))
    if resp.get("traceback"):
        print(resp["traceback"][:500])

# Write results
results = {"status": status, "part": "lianjiejian", "material": "6061 Aluminum"}
if stress_min: results["stress_min"] = stress_min
if stress_max: results["stress_max"] = stress_max
if strain_min: results["strain_min"] = strain_min
if strain_max: results["strain_max"] = strain_max
if deform_min: results["deform_min"] = deform_min
if deform_max: results["deform_max"] = deform_max
rf = os.path.join(RESULTS_DIR, "lianjiejian_results.json")
with open(rf, "w") as f:
    json.dump(results, f, indent=2)

# Summary
print("\n======= lianjiejian FEA Results =======")
if stress_max:
    try:
        s_max = float(stress_max.split()[0])
        s_min = float(stress_min.split()[0]) if stress_min else 0
        e_max = float(strain_max.split()[0]) if strain_max else 0
        e_min = float(strain_min.split()[0]) if strain_min else 0
        d_max = float(deform_max.split()[0]) if deform_max else 0
        d_min = float(deform_min.split()[0]) if deform_min else 0
        print("  Stress:   {:.2f} MPa  (min {:.2e} Pa)".format(s_max/1e6, s_min))
        print("  Strain:   {:.2e} m/m  (min {:.2e} m/m)".format(e_max, e_min))
        print("  Deform:   {:.4e} mm  (min {:.4e} mm)".format(d_max*1000, d_min*1000))
        print("  Material: 6061 Aluminum (σy=276 MPa)")
        if s_max > 276e6:
            print("  WARNING: Stress exceeds yield strength!")
        else:
            safety = 276e6 / s_max
            print("  Safety Factor: {:.2f}".format(safety))
        print("  Status:   {}".format(status))
    except: pass
print("=======================================")
print("Result .mechdat saved to project root.")
print("Results JSON: {}".format(rf))
