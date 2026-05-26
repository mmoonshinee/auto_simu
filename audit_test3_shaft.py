"""Geometry audit for TEST3_轴.STEP via socket timer."""
import json, sys, os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "ansys-workbench-mcp"))
from tools.workbench_socket_timer import socket_timer_execute_python

IRONPYTHON_CODE = r"""
from __future__ import print_function
import os, json

stepfile = r"D:\Claude Works\IDEA works\ANSYS_SIMULATION_TEST1\work pieces\TEST3_轴.STEP"
outfile = r"D:\Claude Works\IDEA works\ANSYS_SIMULATION_TEST1\geometry_audit_test3.json"

try: ExtAPI.DataModel.Project.New()
except: pass

model = ExtAPI.DataModel.Project.Model
analysis = model.AddStaticStructuralAnalysis()

import_options = ExtAPI.SelectionManager.GetImportOptions()
import_options.SetSolid()
import_options.AutoGenerateContacts = True
imported = model.Geometry.ImportGeometry(stepfile)

bodies = list(model.Geometry.GetBodies())
if not bodies:
    print("FAIL:No bodies imported")
else:
    body = bodies[0]
    print("BODY:name=" + str(body.Name) + ",volume=" + str(body.Volume))

faces = []
for geo in model.Geometry.Children:
    if str(geo.GetType()) == "GeoBody":
        for face in geo.Faces:
            info = {}
            info["id"] = face.Id
            info["type"] = str(face.Shape)
            try:
                c = face.Centroid
                info["centroid"] = [round(c[0],2), round(c[1],2), round(c[2],2)]
            except:
                info["centroid"] = None
            try:
                info["area"] = round(face.Area, 2)
            except:
                info["area"] = None
            try:
                info["radius"] = round(face.Radius, 2)
            except:
                info["radius"] = None
            faces.append(info)

vert_count = 0
for geo in model.Geometry.Children:
    if str(geo.GetType()) == "GeoBody":
        for v in geo.Vertices:
            vert_count += 1
            if vert_count <= 20:
                try:
                    c = v.Centroid
                    print("VERTEX:id=" + str(v.Id) + ",centroid=(" + str(round(c[0],2)) + "," + str(round(c[1],2)) + "," + str(round(c[2],2)) + ")")
                except:
                    print("VERTEX:id=" + str(v.Id))

result = {
    "ok": True,
    "body_name": str(body.Name) if bodies else None,
    "body_volume": body.Volume if bodies else 0,
    "face_count": len(faces),
    "vertex_count": vert_count,
    "faces": faces,
    "named_selections": []
}

with open(outfile, "w") as f:
    json.dump(result, f, indent=2, ensure_ascii=False, default=str)
print("AUDIT_DONE:" + outfile)
print("FACE_COUNT:" + str(len(faces)))
for f1 in faces:
    rstr = (" R=" + str(f1["radius"])) if f1.get("radius") else ""
    print("FACE:id=" + str(f1["id"]) + ",type=" + f1["type"] + ",area=" + str(f1.get("area","?")) + rstr + ",centroid=" + str(f1.get("centroid","?")))
"""

print("Executing geometry audit via socket timer...")
result = socket_timer_execute_python(IRONPYTHON_CODE, timeout=120.0)
print(json.dumps(result, indent=2, ensure_ascii=False))
