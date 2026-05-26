"""Full FEA for TEST3_轴.STEP — Static Structural via file queue."""
import json, sys, os, time
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "ansys-workbench-mcp"))
from tools.workbench_file_queue import submit_request, read_response

STEP_FILE = r"D:\Claude Works\IDEA works\ANSYS_SIMULATION_TEST1\work pieces\TEST3_轴.STEP"
RESULTS_DIR = r"D:\Claude Works\IDEA works\ANSYS_SIMULATION_TEST1\results"
MATERIAL_XML = r"F:\WORKS\Ansys\ANSYS Inc\v252\Addins\EngineeringData\Samples\General_Materials.xml"

os.makedirs(RESULTS_DIR, exist_ok=True)

IRONPYTHON_CODE = r'''from __future__ import print_function
import os, time

stepfile = r"D:\Claude Works\IDEA works\ANSYS_SIMULATION_TEST1\work pieces\TEST3_轴.STEP"
resdir = r"D:\Claude Works\IDEA works\ANSYS_SIMULATION_TEST1\results"
mat_xml = r"F:\WORKS\Ansys\ANSYS Inc\v252\Addins\EngineeringData\Samples\General_Materials.xml"
timestamp = time.strftime("%Y%m%d_%H%M%S")
result_mechdat = os.path.join(r"D:\Claude Works\IDEA works\ANSYS_SIMULATION_TEST1", "test3_shaft_result_" + timestamp + ".mechdat")

if not os.path.isdir(resdir): os.makedirs(resdir)

# ── Fresh project ──
ExtAPI.DataModel.Project.New()
time.sleep(1)

# ── Import geometry ──
gi = Model.GeometryImportGroup.AddGeometryImport()
gi.Import(stepfile)
print("import=ok")

# ── Material ──
try:
    mats = Model.Materials
    mats.Import(mat_xml)
    body = list(Model.Geometry.GetBodies())[0]
    body.Material = "Structural Steel"
    print("material=Structural_Steel")
except Exception as e:
    print("material_fail=" + str(e)[:200])

# ── Mesh ──
msh = Model.Mesh
msh.ElementSize = Quantity(3.0, "mm")
msh.Resolution = 5
msh.GenerateMesh()
try: nc = str(msh.NodeCount)
except: nc = "?"
try: ec = str(msh.ElementCount)
except: ec = "?"
print("mesh=ok,nodes=" + nc + ",elements=" + ec)

# ── Static Structural Analysis ──
analysis = Model.AddStaticStructuralAnalysis()

# ── Fixed Support: Face 53 (end cap at Y=0, bottom) ──
sel_fixed = ExtAPI.SelectionManager.CreateSelectionInfo(0)  # GeometryType
sel_fixed.Ids = [53]
fs = analysis.AddFixedSupport()
fs.Location = sel_fixed
print("fixed_support=face_53")

# ── Force: 2000N in -Z on Face 62 (end cap at Y=120, top) ──
sel_force = ExtAPI.SelectionManager.CreateSelectionInfo(0)
sel_force.Ids = [62]
f = analysis.AddForce()
f.DefineBy = 0  # Components
f.ZComponent.Output.SetDiscreteValue(0, Quantity(-2000.0, "N"))
f.Location = sel_force
print("force=2000N_-Z_face_62")

# ── Solve ──
sol = analysis.Solution
print("solving...")
import time; t0 = time.time()
sol.Solve()
t1 = time.time()
print("solve=ok,time=" + str(round(t1-t0,1)) + "s")

# ── Results ──
# Equivalent Stress
es = sol.AddEquivalentStress()
es.EvaluateAllResults()
print("STRESS_MIN_MPa:" + str(es.Minimum))
print("STRESS_MAX_MPa:" + str(es.Maximum))

# Equivalent Elastic Strain
ee = sol.AddEquivalentElasticStrain()
ee.EvaluateAllResults()
print("STRAIN_MIN_mm_per_mm:" + str(ee.Minimum))
print("STRAIN_MAX_mm_per_mm:" + str(ee.Maximum))

# Total Deformation
td = sol.AddTotalDeformation()
td.EvaluateAllResults()
print("DEFORM_MIN_mm:" + str(td.Minimum))
print("DEFORM_MAX_mm:" + str(td.Maximum))

# Safety Factor
try:
    sf = sol.AddSafetyFactor()
    sf.EvaluateAllResults()
    print("SAFETY_MIN:" + str(sf.Minimum))
except Exception as e:
    print("safety_fail:" + str(e)[:200])

# ── Save ──
try:
    ExtAPI.DataModel.Project.Save(result_mechdat)
    print("saved=" + result_mechdat)
except Exception as e:
    print("save_fail:" + str(e)[:200])

print("FEA_DONE")
'''

print("Submitting full FEA for TEST3_轴.STEP...")
print()
print("工况设定:")
print("  固定约束: Face 53 (Y=0 底端面)")
print("  载荷: 2000N -Z方向, Face 62 (Y=120 顶端面)")
print("  材料: Structural Steel (结构钢)")
print("  网格: ElementSize=3mm, Resolution=5")
print()

submitted = submit_request('execute_python', {'code': IRONPYTHON_CODE})
print(f"Request ID: {submitted['request_id']}")

deadline = time.time() + 300  # 5 min timeout
resp = None
while time.time() <= deadline:
    resp = read_response(submitted['request_id'])
    if resp.get('ready'):
        break
    time.sleep(1)

if resp and resp.get('ready'):
    r = resp.get('response', {})
    if r.get('ok'):
        stdout = r.get('stdout', '')
        print(stdout)
        if r.get('stderr', '').strip():
            print('STDERR:', r['stderr'][:500])

        # Parse and save results
        result_data = {
            "part": "TEST3_轴",
            "material": "Structural Steel",
            "fixed_support": "Face 53 (Y=0 end cap)",
            "force": "2000N -Z on Face 62 (Y=120 end cap)",
            "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
        }
        for line in stdout.splitlines():
            line = line.strip()
            if line.startswith("STRESS_MAX_MPa:"):
                result_data["max_stress_MPa"] = float(line.split(":")[1])
            elif line.startswith("STRESS_MIN_MPa:"):
                result_data["min_stress_MPa"] = float(line.split(":")[1])
            elif line.startswith("DEFORM_MAX_mm:"):
                result_data["max_deformation_mm"] = float(line.split(":")[1])
            elif line.startswith("STRAIN_MAX_mm_per_mm:"):
                result_data["max_strain_mm_per_mm"] = float(line.split(":")[1])
            elif line.startswith("SAFETY_MIN:"):
                result_data["safety_factor_min"] = float(line.split(":")[1])
            elif line.startswith("mesh=ok"):
                parts = line.split(",")
                for p in parts:
                    if "nodes=" in p:
                        result_data["nodes"] = int(p.split("=")[1])
                    elif "elements=" in p:
                        result_data["elements"] = int(p.split("=")[1])

        result_file = os.path.join(RESULTS_DIR, "test3_shaft_results.json")
        with open(result_file, "w", encoding="utf-8") as fp:
            json.dump(result_data, fp, indent=2, ensure_ascii=False)
        print(f"\nResults saved to: {result_file}")
    else:
        print('Execution failed:')
        print('stdout:', r.get('stdout', ''))
        print('stderr:', r.get('stderr', ''))
        print('traceback:', r.get('traceback', '')[:1500])
else:
    print('Timeout: no response received')
