"""One-shot geometry audit for any STEP model in ANSYS Mechanical.
Dumps all faces, vertices, edges with spatial properties — eliminates exploration phase.

Usage:
  py geometry_audit.py <path_to_step_file>

Output: JSON file with face/vertex/edge maps, segment analysis, and centroid data.
"""
import os, sys, json, time, subprocess

OUTPUT_DIR = r"D:\Claude Works\IDEA works\ANSYS_SIMULATION_TEST1"
MECH_EXE = r"F:\WORKS\Ansys\ANSYS Inc\v252\aisol\bin\winx64\AnsysWBU.exe"
QUEUE_ROOT = os.path.join(OUTPUT_DIR, "ansys-workbench-mcp", "workbench_queue")
REQ_DIR = os.path.join(QUEUE_ROOT, "requests")
RESP_DIR = os.path.join(QUEUE_ROOT, "responses")

STEP_FILE = sys.argv[1] if len(sys.argv) > 1 else os.path.join(OUTPUT_DIR, "work_pieces", "shaft.step")
AUDIT_FILE = os.path.join(OUTPUT_DIR, "geometry_audit.json")

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

# ─── Launch / reuse Mechanical ─────────────────────────────────────
stale = subprocess.getoutput('tasklist | findstr AnsysWBU')
mech_alive = 'AnsysWBU' in stale

if not mech_alive:
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
    print("Launching Mechanical standalone...")
    subprocess.Popen(args, env=env, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
        creationflags=subprocess.CREATE_NO_WINDOW)
    for i in range(90):
        alive = subprocess.getoutput('tasklist | findstr AnsysWBU')
        if "AnsysWBU" not in alive:
            print("ERROR: Mechanical died during startup"); sys.exit(1)
        if i % 15 == 14: print("  still waiting... ({}/{})".format(i+1, 90))
        time.sleep(1)
else:
    print("Mechanical already running, reusing.")

AUDIT_CODE = r"""
from __future__ import print_function
import os, time

stepfile = r"%s"
outdir = r"%s"

ExtAPI.DataModel.Project.New()
_model = ExtAPI.DataModel.Project.Model
log = []; audit = {}
face_data = []; vert_data = []; edge_data = []
all_vpos = set()

# Import geometry
try:
    gi = _model.GeometryImportGroup.AddGeometryImport()
    gi.Import(stepfile)
    log.append("import=ok")
except Exception as e:
    log.append("import=fail:" + str(e)[:200])

# Mesh (needed for some geometry queries)
try:
    msh = _model.Mesh
    try: msh.ElementSize = Quantity(5.0, "mm")
    except: pass
    msh.GenerateMesh()
    log.append("mesh=ok")
except Exception as e:
    log.append("mesh=fail:" + str(e)[:200])

# Get the body
try:
    bodies = list(_model.Geometry.GetBodies())
    body = bodies[0]
    gb = body.GetGeoBody()
    log.append("body=ok")

    # ── Faces (from gb.Faces — GeoFaceWrapper objects) ──
    try:
        face_ids = list(gb.FaceIds)
        flist = list(gb.Faces)
        for i, fid in enumerate(face_ids):
            f = flist[i]
            info = {"id": fid}
            for attr in ["SurfaceType", "Area", "Radius"]:
                try: info[attr] = str(getattr(f, attr))
                except: info[attr] = "?"
            try:
                c = f.Centroid
                try: info["centroid"] = {"x": float(c.X), "y": float(c.Y), "z": float(c.Z)}
                except: info["centroid"] = {"x": float(c[0]), "y": float(c[1]), "z": float(c[2])}
            except: info["centroid"] = {"x": -999, "y": -999, "z": -999}
            # Face vertices (GeoVertexWrapper — .X/.Y/.Z works)
            vpos = []
            try:
                for v in list(f.Vertices):
                    try: vpos.append({"x": float(v.X), "y": float(v.Y), "z": float(v.Z)})
                    except: vpos.append({"x": float(v[0]), "y": float(v[1]), "z": float(v[2])})
            except Exception as ve:
                log.append("fv_fail_{}={}".format(fid, str(ve)[:100]))
            info["vertex_positions"] = vpos
            face_data.append(info)
        log.append("faces=" + str(len(face_data)))
    except Exception as fe:
        log.append("faces_fail=" + str(fe)[:200])

    # ── Vertex count via face vertices ──
    try:
        all_vpos = set()
        for fd in face_data:
            for vp in fd.get("vertex_positions", []):
                key = (round(vp["x"], 4), round(vp["y"], 4), round(vp["z"], 4))
                all_vpos.add(key)
        log.append("verts=" + str(len(all_vpos)))
    except Exception as ve:
        log.append("verts_fail=" + str(ve)[:200])

    # ── Edges ──
    edge_count = 0
    try: edge_count = len(list(gb.EdgeIds))
    except: pass
    log.append("edges=" + str(edge_count))

    audit["faces"] = face_data
    audit["edge_count"] = edge_count
except Exception as e:
    log.append("body_fail=" + str(e)[:500])

# Print results line by line (avoid json module — IronPython incompatibility)
print("AUDIT_BEGIN")
for item in log: print("LOG:" + item)
print("FACE_COUNT:" + str(len(face_data)))
for fd in face_data:
    c = fd.get("centroid", {"x":0,"y":0,"z":0})
    print("FACE:{}|{}|{}|{},{},{}|{}".format(
        fd["id"], fd.get("SurfaceType","?"), fd.get("Radius","0"),
        c["x"], c["y"], c["z"], fd.get("Area","0")))
# Vertex positions from face data (deduplicated)
seen_pos = {}
for fd in face_data:
    for vp in fd.get("vertex_positions", []):
        key = (round(vp["x"],4), round(vp["y"],4), round(vp["z"],4))
        seen_pos[key] = seen_pos.get(key, 0) + 1
print("VERTEX_COUNT:" + str(len(seen_pos)))
idx = 0
for (vx, vy, vz) in sorted(seen_pos.keys()):
    print("VERTEX:{}|{:.4f},{:.4f},{:.4f}".format(idx, vx, vy, vz))
    idx += 1
print("AUDIT_END")
""" % (STEP_FILE.replace("\\", "/"), OUTPUT_DIR.replace("\\", "/"))

print("=== Submitting geometry audit ===")
resp = queue_req(AUDIT_CODE, "geometry_audit", timeout=600)

if resp.get("ok"):
    stdout = resp.get("stdout", "")
    print(stdout)

    # Parse audit output
    faces = []; verts = []; logs = []
    in_audit = False
    for line in stdout.splitlines():
        line = line.strip()
        if line == "AUDIT_BEGIN": in_audit = True; continue
        if line == "AUDIT_END": in_audit = False; continue
        if not in_audit: continue
        if line.startswith("LOG:"): logs.append(line[4:])
        elif line.startswith("FACE_COUNT:"): pass
        elif line.startswith("FACE:"):
            parts = line[5:].split("|")
            if len(parts) >= 5:
                c = parts[3].split(",")
                faces.append({
                    "id": int(parts[0]), "surface_type": parts[1],
                    "radius": parts[2],
                    "centroid": {"x": float(c[0]), "y": float(c[1]), "z": float(c[2])},
                    "area": parts[4],
                })
        elif line.startswith("VERTEX_COUNT:"): pass
        elif line.startswith("VERTEX:"):
            parts = line[7:].split("|")
            p = parts[1].split(",")
            verts.append({"id": int(parts[0]), "x": float(p[0]), "y": float(p[1]), "z": float(p[2])})

    audit = {"faces": faces, "vertices": verts, "log": logs}
    with open(AUDIT_FILE, "w") as f:
        json.dump(audit, f, indent=2)
    print("\nAudit saved to: {}".format(AUDIT_FILE))
    print("  {} faces, {} vertices".format(len(faces), len(verts)))

    # Segment analysis
    if faces:
        segments = {}
        for f in faces:
            y = f["centroid"]["y"]
            r = f["radius"]
            seg_key = "Y={:.0f}-{:.0f}, R={:.1f}".format(
                max(0, (y//20)*20), min(120, (y//20)*20+20), r)
            if seg_key not in segments:
                segments[seg_key] = []
            segments[seg_key].append(f["id"])
        print("\n  Segments by Y position:")
        for sk, sids in sorted(segments.items()):
            print("    {} → faces {}".format(sk, sids))
else:
    print("Failed:", resp.get("error", ""))
    if resp.get("traceback"):
        print(resp["traceback"][:500])
