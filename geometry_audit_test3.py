"""Geometry audit for TEST3_轴.STEP via file queue."""
import json, sys, os, time
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "ansys-workbench-mcp"))
from tools.workbench_file_queue import submit_request, read_response

IRONPYTHON_CODE = r'''from __future__ import print_function

stepfile = r"D:\Claude Works\IDEA works\ANSYS_SIMULATION_TEST1\work pieces\TEST3_轴.STEP"

ExtAPI.DataModel.Project.New()
import time
time.sleep(1)

gi = Model.GeometryImportGroup.AddGeometryImport()
gi.Import(stepfile)
print("import=ok")

msh = Model.Mesh
try: msh.ElementSize = Quantity(5.0, "mm")
except: pass
msh.GenerateMesh()
print("mesh=ok")

bodies = list(Model.Geometry.GetBodies())
print("body_count=" + str(len(bodies)))
if bodies:
    body = bodies[0]
    # GetGeoBody for face enumeration
    gb = body.GetGeoBody()
    face_ids = list(gb.FaceIds)
    flist = list(gb.Faces)
    print("face_count=" + str(len(face_ids)))

    for i, fid in enumerate(face_ids):
        f = flist[i]
        st = "?"
        r = "0"
        a = "0"
        cx, cy, cz = -999, -999, -999
        try: st = str(f.SurfaceType)
        except: pass
        try: r = str(f.Radius)
        except: pass
        try: a = str(f.Area)
        except: pass
        try:
            c = f.Centroid
            cx = round(float(c[0]),2); cy = round(float(c[1]),2); cz = round(float(c[2]),2)
        except:
            try:
                cx = round(float(c.X),2); cy = round(float(c.Y),2); cz = round(float(c.Z),2)
            except: pass
        print("FACE:" + str(fid) + "|" + st + "|R=" + r + "|A=" + a + "|" + str(cx) + "," + str(cy) + "," + str(cz))

    # Count vertices from faces
    all_vpos = set()
    for i, fid in enumerate(face_ids):
        f = flist[i]
        try:
            for v in list(f.Vertices):
                try:
                    all_vpos.add((round(float(v.X),4), round(float(v.Y),4), round(float(v.Z),4)))
                except:
                    all_vpos.add((round(float(v[0]),4), round(float(v[1]),4), round(float(v[2]),4)))
        except: pass
    print("vertex_count=" + str(len(all_vpos)))
    idx = 0
    for vx, vy, vz in sorted(all_vpos):
        print("VERTEX:" + str(idx) + "|" + str(vx) + "," + str(vy) + "," + str(vz))
        idx += 1
else:
    print("NO_BODIES")
'''

print("Submitting geometry audit request...")
submitted = submit_request('execute_python', {'code': IRONPYTHON_CODE})
print(f"Request ID: {submitted['request_id']}")

deadline = time.time() + 180
resp = None
while time.time() <= deadline:
    resp = read_response(submitted['request_id'])
    if resp.get('ready'):
        break
    time.sleep(1)

if resp and resp.get('ready'):
    r = resp.get('response', {})
    if r.get('ok'):
        print(r.get('stdout', '(no stdout)'))
        if r.get('stderr', '').strip():
            print('STDERR:', r['stderr'][:500])
    else:
        print('Execution failed:')
        print('stdout:', r.get('stdout', ''))
        print('stderr:', r.get('stderr', ''))
        print('traceback:', r.get('traceback', '')[:1000])
else:
    print(json.dumps(resp, indent=2, ensure_ascii=False)[:1000])
