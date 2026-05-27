"""Generic FEA runner — takes any STEP file, auto-detects geometry, runs FEA, exports contour images.
Usage:
  py run_generic_fea.py <step_file_path> [--material "Structural Steel"] [--force-direction +Z] [--force-magnitude 5000]
  py run_generic_fea.py <step_file_path> --faces '{"fix": [1,2], "force": [3], "force_dir": "+Z", "force_N": 5000}'
Output:
  results/<part_name>_results.json — contains stress/strain/deformation values + image paths
  results/<part_name>_stress.png, _strain.png, _deform.png — contour plot images
"""
import os, sys, json, time, subprocess, argparse
from pathlib import Path

# ── Paths ───────────────────────────────────────────────
OUTPUT_DIR = r"D:\Claude Works\IDEA works\ANSYS_SIMULATION_TEST1"
RESULTS_DIR = os.path.join(OUTPUT_DIR, "results")
MECH_EXE = r"F:\WORKS\Ansys\ANSYS Inc\v252\aisol\bin\winx64\AnsysWBU.exe"
QUEUE_ROOT = os.path.join(OUTPUT_DIR, "ansys-workbench-mcp", "workbench_queue")
REQ_DIR = os.path.join(QUEUE_ROOT, "requests")
RESP_DIR = os.path.join(QUEUE_ROOT, "responses")
MATERIAL_LIB = r"F:/WORKS/Ansys/ANSYS Inc/v252/Addins/EngineeringData/Samples/General_Materials.xml"

for d in [RESULTS_DIR, REQ_DIR, RESP_DIR]:
    os.makedirs(d, exist_ok=True)


def queue_req(code, rid, timeout=600):
    rfile = os.path.join(REQ_DIR, rid + ".json")
    rspfile = os.path.join(RESP_DIR, rid + ".json")
    if os.path.exists(rspfile):
        os.remove(rspfile)
    with open(rfile, "w", encoding="utf-8") as f:
        json.dump({"action": "execute_python", "code": code}, f)
    for i in range(timeout):
        if os.path.exists(rspfile):
            with open(rspfile, "r", encoding="utf-8") as f:
                return json.load(f)
        time.sleep(1)
    return {"ok": False, "error": "timeout"}


def launch_mechanical():
    """Start Mechanical if not already running."""
    stale = subprocess.getoutput('tasklist | findstr AnsysWBU')
    if 'AnsysWBU' in stale:
        print("Mechanical already running, reusing.")
        return True

    # Clean stale queue files
    for d in [REQ_DIR, RESP_DIR]:
        for f in os.listdir(d):
            try: os.remove(os.path.join(d, f))
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
            print("ERROR: Mechanical died during startup")
            return False
        if i % 15 == 14:
            print(f"  waiting... {i+1}/90")
        time.sleep(1)
    print("Mechanical ready.")
    return True


def run_geometry_audit(step_path):
    """Run geometry audit on a STEP file, return parsed face data."""
    print(f"\n=== Geometry Audit: {step_path} ===")

    audit_code = rf'''
from __future__ import print_function
stepfile = r"{step_path}"
ExtAPI.DataModel.Project.New()
_model = ExtAPI.DataModel.Project.Model
face_data = []

try:
    gi = _model.GeometryImportGroup.AddGeometryImport()
    gi.Import(stepfile)
except Exception as e:
    print("IMPORT_FAIL:" + str(e)[:300])
    raise

try:
    msh = _model.Mesh
    msh.ElementSize = Quantity(5.0, "mm")
    msh.GenerateMesh()
except Exception as e:
    print("MESH_FAIL:" + str(e)[:200])
    raise

bodies = list(_model.Geometry.GetBodies())
body = bodies[0]
gb = body.GetGeoBody()
face_ids = list(gb.FaceIds)
flist = list(gb.Faces)

for i, fid in enumerate(face_ids):
    f = flist[i]
    info = {{"id": fid}}
    for attr in ["SurfaceType", "Area", "Radius"]:
        try: info[attr] = str(getattr(f, attr))
        except: info[attr] = "?"
    try:
        c = f.Centroid
        info["centroid"] = {{"x": float(c[0]), "y": float(c[1]), "z": float(c[2])}}
    except:
        info["centroid"] = {{"x": -999, "y": -999, "z": -999}}
    face_data.append(info)

print("AUDIT_BEGIN")
print("FACE_COUNT:" + str(len(face_data)))
for fd in face_data:
    c = fd["centroid"]
    print("FACE:{{}}|{{}}|{{}}|{{}},{{}},{{}}|{{}}".format(
        fd["id"], fd.get("SurfaceType","?"), fd.get("Radius","0"),
        c["x"], c["y"], c["z"], fd.get("Area","0")))
# Body dimensions
bbox_min = [min(fd["centroid"]["x"] for fd in face_data),
             min(fd["centroid"]["y"] for fd in face_data),
             min(fd["centroid"]["z"] for fd in face_data)]
bbox_max = [max(fd["centroid"]["x"] for fd in face_data),
             max(fd["centroid"]["y"] for fd in face_data),
             max(fd["centroid"]["z"] for fd in face_data)]
print("BBOX:{{}},{{}},{{}}|{{}},{{}},{{}}".format(
    bbox_min[0], bbox_min[1], bbox_min[2],
    bbox_max[0], bbox_max[1], bbox_max[2]))
print("AUDIT_END")
'''

    resp = queue_req(audit_code, "generic_audit", timeout=300)
    if not resp.get("ok"):
        print("Audit failed:", resp.get("error", ""))
        return None

    stdout = resp.get("stdout", "")
    faces = []
    bbox = None
    in_audit = False
    for line in stdout.splitlines():
        line = line.strip()
        if line == "AUDIT_BEGIN":
            in_audit = True
            continue
        if line == "AUDIT_END":
            in_audit = False
            continue
        if not in_audit:
            continue
        if line.startswith("FACE:"):
            parts = line[5:].split("|")
            if len(parts) >= 5:
                c = parts[3].split(",")
                faces.append({
                    "id": int(parts[0]),
                    "surface_type": parts[1],
                    "radius": parts[2],
                    "centroid": {"x": float(c[0]), "y": float(c[1]), "z": float(c[2])},
                    "area": parts[4],
                })
        elif line.startswith("BBOX:"):
            parts = line[5:].split("|")
            bmin = parts[0].split(",")
            bmax = parts[1].split(",")
            bbox = {
                "min": {"x": float(bmin[0]), "y": float(bmin[1]), "z": float(bmin[2])},
                "max": {"x": float(bmax[0]), "y": float(bmax[1]), "z": float(bmax[2])},
            }

    print(f"  Found {len(faces)} faces")
    return {"faces": faces, "bbox": bbox}


def auto_select_faces(audit, force_direction="+Z", force_magnitude=5000):
    """Auto-detect which faces to fix and which to apply force to."""
    faces = audit["faces"]
    bbox = audit.get("bbox")

    cylinders = [f for f in faces if f["surface_type"].lower() in ("cylinder", "cone")]
    planes = [f for f in faces if f["surface_type"].lower() == "plane"]

    # Determine primary axis from bounding box
    if bbox:
        dx = bbox["max"]["x"] - bbox["min"]["x"]
        dy = bbox["max"]["y"] - bbox["min"]["y"]
        dz = bbox["max"]["z"] - bbox["min"]["z"]
        primary_axis = max(
            ("x", dx, bbox["min"]["x"], bbox["max"]["x"]),
            ("y", dy, bbox["min"]["y"], bbox["max"]["y"]),
            ("z", dz, bbox["min"]["z"], bbox["max"]["z"]),
            key=lambda t: t[1],
        )
    else:
        primary_axis = ("z", 1, -50, 50)

    axis_name = primary_axis[0]
    axis_min = primary_axis[2]
    axis_max = primary_axis[3]
    axis_range = primary_axis[1]

    print(f"  Primary axis: {axis_name} (range={axis_range:.1f}mm)")

    # Strategy:
    # - Fix: cylindrical faces near ONE end of the primary axis (mounting holes/faces)
    # - Force: large planar face at the OPPOSITE end
    #
    # If cylinders exist: fix cylinder faces near axis_min, apply force to largest
    # plane face near axis_max (or vice versa, pick the end with more cylinders)
    #
    # If no cylinders: fix plane faces near axis_min, force on plane faces near axis_max

    fix_faces = []
    force_faces = []

    threshold = axis_min + axis_range * 0.35  # 35% from min end
    threshold_high = axis_max - axis_range * 0.35

    if cylinders:
        # Fix: cylinders near one end
        cyl_near_min = [f for f in cylinders if f["centroid"][axis_name] < threshold]
        cyl_near_max = [f for f in cylinders if f["centroid"][axis_name] > threshold_high]

        if len(cyl_near_min) >= len(cyl_near_max):
            fix_faces = cyl_near_min
            # Force: largest plane face at opposite end
            planes_far = [f for f in planes if f["centroid"][axis_name] > threshold_high]
        else:
            fix_faces = cyl_near_max
            planes_far = [f for f in planes if f["centroid"][axis_name] < threshold]

        # Sort planes by area (descending), pick the largest
        planes_far.sort(key=lambda f: float(f.get("area", "0")), reverse=True)
        force_faces = planes_far[:1] if planes_far else []

    if not fix_faces:
        # Fallback: fix plane faces at one end, force at the other
        planes_near_min = [f for f in planes if f["centroid"][axis_name] < threshold]
        planes_near_max = [f for f in planes if f["centroid"][axis_name] > threshold_high]
        fix_faces = planes_near_min[:4] if planes_near_min else planes[:2]
        force_faces = planes_near_max[:1] if planes_near_max else planes[-1:]

    if not force_faces and planes:
        # Last resort: pick the largest plane not in fix_faces
        remaining = [f for f in planes if f["id"] not in {g["id"] for g in fix_faces}]
        remaining.sort(key=lambda f: float(f.get("area", "0")), reverse=True)
        force_faces = remaining[:1]

    fix_ids = [f["id"] for f in fix_faces]
    force_ids = [f["id"] for f in force_faces]

    print(f"  Auto-selected Fix faces: {fix_ids}")
    print(f"  Auto-selected Force faces: {force_ids}")

    return {
        "fix_ids": fix_ids,
        "force_ids": force_ids,
        "force_direction": force_direction,
        "force_magnitude_N": force_magnitude,
    }


def run_fea(step_path, selection, material, job_id):
    """Run the FEA with the given face selection, export contour images."""
    fix_ids = selection["fix_ids"]
    force_ids = selection["force_ids"]
    force_dir = selection["force_direction"]
    force_N = selection["force_magnitude_N"]

    # Build force component assignments
    force_components = {"X": 0, "Y": 0, "Z": 0}
    force_components[force_dir.lstrip("+-")] = force_N
    if force_dir.startswith("-"):
        force_components[force_dir.lstrip("+-")] = -force_N

    img_dir = os.path.join(RESULTS_DIR, job_id)
    os.makedirs(img_dir, exist_ok=True)

    fea_code = rf'''
from __future__ import print_function
import os, time

stepfile = r"{step_path}"
img_dir = r"{img_dir}"
fix_ids = {fix_ids}
force_ids = {force_ids}
fx = {force_components["X"]}
fy = {force_components["Y"]}
fz = {force_components["Z"]}
material_name = "{material}"
material_lib = r"{MATERIAL_LIB}"

log = []
ok = True
_m = None

try:
    ExtAPI.DataModel.Project.New()
except:
    pass
try:
    _m = ExtAPI.DataModel.Project.Model
    log.append("project=new")
except Exception as e:
    log.append("project=fail:" + str(e)[:200])
    ok = False

if ok:
    try:
        a = _m.AddStaticStructuralAnalysis()
        log.append("analysis=ok")
    except Exception as e:
        log.append("analysis=fail:" + str(e)[:200])
        ok = False

if ok:
    try:
        gi = _m.GeometryImportGroup.AddGeometryImport()
        gi.Import(stepfile)
        log.append("import=ok")
    except Exception as e:
        log.append("import=fail:" + str(e)[:200])
        ok = False

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
        log.append("mesh=fail:" + str(e)[:200])
        ok = False

if ok:
    try:
        body = list(_m.Geometry.GetBodies())[0]
        try:
            mats = _m.Materials
            mats.Import(material_lib)
            body.Material = material_name
            log.append("mat=" + material_name)
        except:
            try:
                body.Material = "Structural Steel"
                log.append("mat=steel_fallback")
            except:
                log.append("mat=bypass")
    except Exception as e:
        log.append("body_err=" + str(e)[:200])
        ok = False

if ok and fix_ids:
    try:
        fs = a.AddFixedSupport()
        sel = ExtAPI.SelectionManager.CreateSelectionInfo(0)
        sel.Ids = fix_ids
        fs.Location = sel
        log.append("FS=ok:" + str(fix_ids))
    except Exception as e:
        log.append("FS_fail=" + str(e)[:200])
        ok = False

if ok and force_ids:
    try:
        f = a.AddForce()
        f.DefineBy = 0
        if fx != 0:
            f.XComponent.Output.SetDiscreteValue(0, Quantity(float(fx), "N"))
        if fy != 0:
            f.YComponent.Output.SetDiscreteValue(0, Quantity(float(fy), "N"))
        if fz != 0:
            f.ZComponent.Output.SetDiscreteValue(0, Quantity(float(fz), "N"))
        sel = ExtAPI.SelectionManager.CreateSelectionInfo(0)
        sel.Ids = force_ids
        f.Location = sel
        log.append("Force=ok:" + str(force_ids))
    except Exception as e:
        log.append("Force_fail=" + str(e)[:200])
        ok = False

if ok:
    try:
        sol = a.Solution
        sol.Solve()
        log.append("solve=ok")
    except Exception as e:
        log.append("solve=fail:" + str(e)[:200])
        ok = False

# ── Results & Image Export ──
if ok:
    # Stress
    try:
        es = sol.AddEquivalentStress()
        es.EvaluateAllResults()
        # Activate and export
        es.Activate()
        ExtAPI.Graphics.ExportImage(os.path.join(img_dir, "stress.png"), 0)
        stress_min = float(str(es.Minimum).split()[0])
        stress_max = float(str(es.Maximum).split()[0])
        log.append("stress_min=" + str(stress_min))
        log.append("stress_max=" + str(stress_max))
    except Exception as e:
        log.append("stress_fail=" + str(e)[:200])

    # Strain
    try:
        est = sol.AddEquivalentElasticStrain()
        est.EvaluateAllResults()
        est.Activate()
        ExtAPI.Graphics.ExportImage(os.path.join(img_dir, "strain.png"), 0)
        strain_min = float(str(est.Minimum).split()[0])
        strain_max = float(str(est.Maximum).split()[0])
        log.append("strain_min=" + str(strain_min))
        log.append("strain_max=" + str(strain_max))
    except Exception as e:
        log.append("strain_fail=" + str(e)[:200])

    # Deformation
    try:
        deform = sol.AddTotalDeformation()
        deform.EvaluateAllResults()
        deform.Activate()
        ExtAPI.Graphics.ExportImage(os.path.join(img_dir, "deform.png"), 0)
        def_min = float(str(deform.Minimum).split()[0])
        def_max = float(str(deform.Maximum).split()[0])
        log.append("deform_min=" + str(def_min))
        log.append("deform_max=" + str(def_max))
    except Exception as e:
        log.append("deform_fail=" + str(e)[:200])

    # Mesh image
    try:
        msh = _m.Mesh
        # Just export current view
        ExtAPI.Graphics.ExportImage(os.path.join(img_dir, "mesh.png"), 0)
        log.append("mesh_img=ok")
    except:
        log.append("mesh_img=skip")

log.append("status=completed" if ok else "status=failed")
print("FEA_DONE")
for item in log:
    print("LOG:" + item)
'''

    print(f"\n=== Running FEA: {job_id} ===")
    resp = queue_req(fea_code, f"fea_{job_id}", timeout=600)

    status = "unknown"
    results = {
        "job_id": job_id,
        "part_name": os.path.splitext(os.path.basename(step_path))[0],
        "material": material,
        "fix_face_ids": fix_ids,
        "force_face_ids": force_ids,
        "force_direction": force_dir,
        "force_magnitude_N": force_N,
        "images": {},
    }

    if resp.get("ok"):
        stdout = resp.get("stdout", "")
        for line in stdout.splitlines():
            line = line.strip()
            if line.startswith("LOG:stress_min="):
                results["stress_min_Pa"] = float(line.split("=")[1])
            elif line.startswith("LOG:stress_max="):
                results["stress_max_Pa"] = float(line.split("=")[1])
            elif line.startswith("LOG:strain_min="):
                results["strain_min"] = float(line.split("=")[1])
            elif line.startswith("LOG:strain_max="):
                results["strain_max"] = float(line.split("=")[1])
            elif line.startswith("LOG:deform_min="):
                results["deform_min_m"] = float(line.split("=")[1])
            elif line.startswith("LOG:deform_max="):
                results["deform_max_m"] = float(line.split("=")[1])
            elif line.startswith("LOG:status="):
                status = line.split("=", 1)[1]

        results["status"] = status

        # Check for image files
        for img_name in ["stress.png", "strain.png", "deform.png", "mesh.png"]:
            img_path = os.path.join(img_dir, img_name)
            if os.path.exists(img_path):
                results["images"][img_name.replace(".png", "")] = img_path

        # Compute derived values
        if "stress_max_Pa" in results:
            smax_mpa = results["stress_max_Pa"] / 1e6
            results["stress_max_MPa"] = round(smax_mpa, 2)

            # Safety factor based on material
            yield_strengths = {
                "Structural Steel": 250e6,
                "Aluminum Alloy": 276e6,
                "6061 Aluminum": 276e6,
                "Stainless Steel": 205e6,
            }
            ys = yield_strengths.get(material, 250e6)
            results["yield_strength_MPa"] = ys / 1e6
            results["safety_factor"] = round(ys / results["stress_max_Pa"], 2)

        if "deform_max_m" in results:
            results["deform_max_mm"] = round(results["deform_max_m"] * 1000, 4)

        print(stdout[:2000])
    else:
        results["status"] = "failed"
        results["error"] = resp.get("error", "unknown")
        if resp.get("traceback"):
            print(resp["traceback"][:500])

    # Save results JSON
    result_file = os.path.join(RESULTS_DIR, f"{job_id}_results.json")
    with open(result_file, "w") as f:
        json.dump(results, f, indent=2, default=str)

    print(f"\nResults saved to: {result_file}")
    return results


def print_summary(results):
    print("\n" + "=" * 50)
    print(f"  FEA Results: {results.get('part_name', 'unknown')}")
    print("=" * 50)
    if results.get("status") == "completed":
        if "stress_max_MPa" in results:
            print(f"  Max Stress:    {results['stress_max_MPa']} MPa")
        if "stress_min_Pa" in results:
            print(f"  Min Stress:    {results['stress_min_Pa']:.2e} Pa")
        if "deform_max_mm" in results:
            print(f"  Max Deform:    {results['deform_max_mm']} mm")
        print(f"  Material:      {results.get('material', 'unknown')}")
        if "yield_strength_MPa" in results:
            print(f"  Yield Strength: {results['yield_strength_MPa']} MPa")
        if "safety_factor" in results:
            sf = results["safety_factor"]
            flag = " [LOW!]" if sf < 1.5 else " [OK]"
            print(f"  Safety Factor: {sf}{flag}")
    else:
        print(f"  Status: {results.get('status', 'unknown')}")
        if "error" in results:
            print(f"  Error: {results['error']}")
    print("=" * 50)


def main():
    parser = argparse.ArgumentParser(description="Generic FEA runner for any STEP file")
    parser.add_argument("step_file", help="Path to STEP file")
    parser.add_argument("--material", default="Structural Steel", help="Material name")
    parser.add_argument("--force-direction", default="+Z", help="Force direction: +X, -X, +Y, -Y, +Z, -Z")
    parser.add_argument("--force-magnitude", type=float, default=5000, help="Force in Newtons")
    parser.add_argument("--faces", help='JSON with explicit face selection: {"fix": [ids], "force": [ids]}')
    parser.add_argument("--job-id", default=None, help="Custom job ID")
    args = parser.parse_args()

    step_path = os.path.abspath(args.step_file)
    if not os.path.exists(step_path):
        print(f"ERROR: STEP file not found: {step_path}")
        sys.exit(1)

    job_id = args.job_id or Path(step_path).stem + "_" + time.strftime("%Y%m%d_%H%M%S")

    if not launch_mechanical():
        sys.exit(1)

    # 1. Geometry audit
    audit = run_geometry_audit(step_path)
    if not audit:
        print("ERROR: Geometry audit failed")
        sys.exit(1)

    # 2. Face selection
    if args.faces:
        selection = json.loads(args.faces)
        selection.setdefault("force_direction", args.force_direction)
        selection.setdefault("force_magnitude_N", args.force_magnitude)
    else:
        selection = auto_select_faces(audit, args.force_direction, args.force_magnitude)

    if not selection.get("fix_ids") or not selection.get("force_ids"):
        print("ERROR: Could not auto-determine faces for constraints/loads")
        print("  Use --faces '{\"fix\": [id1, id2], \"force\": [id3]}' to specify manually")
        # Save audit for manual review
        audit_file = os.path.join(RESULTS_DIR, f"{job_id}_audit.json")
        with open(audit_file, "w") as f:
            json.dump(audit, f, indent=2)
        print(f"  Geometry audit saved to: {audit_file}")
        sys.exit(1)

    # 3. Run FEA
    results = run_fea(step_path, selection, args.material, job_id)

    # 4. Summary
    print_summary(results)

    # Output JSON to stdout for programmatic use
    print("\n__JSON_RESULT__")
    print(json.dumps(results, indent=2, default=str))


if __name__ == "__main__":
    main()
