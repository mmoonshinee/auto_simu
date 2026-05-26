"""One-time setup: create a meshed template .mechdat with geometry imported + meshed.
Run this once per geometry. Subsequent FEA runs load the template (saves ~2 min per run)."""
import os, sys, json, time

OUTPUT_DIR = r"D:\Claude Works\IDEA works\ANSYS_SIMULATION_TEST1"
STEP_FILE = os.path.join(OUTPUT_DIR, "work_pieces", "shaft.step")
TEMPLATE_FILE = os.path.join(OUTPUT_DIR, "meshed_template.mechdat")

MECH_EXE = r"F:\WORKS\Ansys\ANSYS Inc\v252\aisol\bin\winx64\AnsysWBU.exe"
QUEUE_ROOT = os.path.join(OUTPUT_DIR, "ansys-workbench-mcp", "workbench_queue")
REQ_DIR = os.path.join(QUEUE_ROOT, "requests")
RESP_DIR = os.path.join(QUEUE_ROOT, "responses")

def queue_req(code, rid, timeout=600):
    rfile = os.path.join(REQ_DIR, rid + ".json")
    rspfile = os.path.join(RESP_DIR, rid + ".json")
    if os.path.exists(rspfile): os.remove(rspfile)
    with open(rfile, "w", encoding="utf-8") as f:
        json.dump({"action": "execute_python", "code": code}, f)
    print("  queued", rid)
    for i in range(timeout):
        if os.path.exists(rspfile):
            with open(rspfile, "r", encoding="utf-8") as f:
                return json.load(f)
        time.sleep(1)
    return {"ok": False, "error": "timeout"}

# Check if Mechanical already running
stale = os.popen('tasklist | findstr AnsysWBU').read()
mech_alive = 'AnsysWBU' in stale

if not mech_alive:
    print("Launching Mechanical standalone (90s wait)...")
    for d in [QUEUE_ROOT, REQ_DIR, RESP_DIR]:
        os.makedirs(d, exist_ok=True)
    for f in os.listdir(REQ_DIR):
        try: os.remove(os.path.join(REQ_DIR, f))
        except: pass
    for f in os.listdir(RESP_DIR):
        try: os.remove(os.path.join(RESP_DIR, f))
        except: pass
    env = os.environ.copy()
    env["WB1_STANDALONE"] = "1"
    args = [MECH_EXE, "-r", "252", "-AppModeMech", "-DSApplet", "-nosplash", "-notabctrl"]
    subprocess.Popen(args, env=env, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
        creationflags=subprocess.CREATE_NO_WINDOW)
    for i in range(90):
        alive = os.popen('tasklist | findstr AnsysWBU').read()
        if "AnsysWBU" not in alive:
            print("ERROR: Mechanical died during startup"); sys.exit(1)
        if i % 15 == 14: print("  still waiting... ({}/{})".format(i+1, 90))
        time.sleep(1)
else:
    print("Mechanical already running (PID: {}), skipping launch.".format(stale.split()[1]))

print("Creating meshed template...")
TEMPLATE_CODE = r"""
from __future__ import print_function
import os
outdir = r"D:\Claude Works\IDEA works\ANSYS_SIMULATION_TEST1"
stepfile = os.path.join(outdir, "work_pieces", "shaft.step")
template = os.path.join(outdir, "meshed_template.mechdat")
log = []; ok = True
_m = None
try: _m = Model
except:
    try: _m = ExtAPI.DataModel.Project.Model
    except: pass
if _m is None:
    try:
        ExtAPI.DataModel.Project.New()
        _m = ExtAPI.DataModel.Project.Model
        log.append("project=new")
    except Exception as e:
        log.append("project=fail:" + str(e)[:200]); ok = False
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
if ok:
    try:
        ExtAPI.DataModel.Project.Save(template)
        log.append("template_saved=ok")
    except Exception as e:
        log.append("template_save=fail:" + str(e)[:200])
print("TEMPLATE_STATUS:" + ("ok" if "template_saved=ok" in log else "fail"))
for item in log: print("  " + item)
"""

resp = queue_req(TEMPLATE_CODE, "setup_template", timeout=600)
if resp.get("ok"):
    stdout = resp.get("stdout", "")
    print(stdout)
    if "TEMPLATE_STATUS:ok" in stdout:
        print("\nTemplate created: {}".format(TEMPLATE_FILE))
    else:
        print("\nTemplate creation had issues.")
else:
    print("Failed:", resp.get("error", ""))
    print(resp.get("traceback", "")[:500])
