# ANSYS Mechanical FEA Automation

## Project Purpose

Automated static structural FEA for mechanical parts via ANSYS Mechanical (v252). Uses a file queue mechanism + ACT plugin inside Mechanical — NOT the MCP server directly.

## Architecture (What Actually Works)

```
run_*.py  →  JSON request file  →  ACT Plugin (Mechanical)  →  JSON response file  →  results/
```

- **ACT Plugin** installed at `%APPDATA%\Ansys\v252\ACT\extensions\WorkbenchMCP\` — auto-loaded by Mechanical, polls `workbench_queue/requests/` every 1500ms
- **File Queue** at `ansys-workbench-mcp/workbench_queue/requests/` and `.../responses/`
- **MCP Server** (`server.py`) — exists but never used; the pipeline bypasses it entirely
- **Socket Timer** — exists but never used

## Current State (as of last session)

| Part | Load | Max Stress | Max Deform | Safety Factor | Material |
|------|------|-----------|------------|---------------|----------|
| Shaft (轴) | 500N at vertex (-Z) | 88.23 MPa | — | ~3.1 | Structural Steel |
| Lianjiejian (连接件) | 5000N on bottom face (+Z) | 125.24 MPa | 1.25 mm | 2.20 | 6061 Aluminum |

**Mechanical process:** NOT running (will be launched on next FEA run, ~90s startup).

## Key Files

| File | Purpose |
|------|---------|
| `run_lianjiejian_fea.py` | Connector FEA: import STEP, mesh, fixed support (4 holes), force (bottom face 5000N), solve, report |
| `run_mech_and_fea.py` | Shaft FEA: import STEP, mesh, fixed support, force at vertex, solve, report |
| `geometry_audit.py` | One-shot geometry explorer: imports STEP, meshes, dumps all face/vertex/edge IDs with types, centroids, radii |
| `setup_template.py` | One-time template project creation (archival, not used for active runs) |
| `geometry_audit.json` | Face/vertex map for lianjiejian (most recent audit) |
| `results/lianjiejian_geometry_audit.json` | Face/vertex map for lianjiejian (same data, archived) |
| `results/lianjiejian_results.json` | Latest lianjiejian FEA results |
| `results/analysis_results.json` | Shaft FEA results |
| `work_pieces/lianjiejian.STEP` | Connector CAD model |
| `work_pieces/轴.STEP` (or similar) | Shaft CAD model |
| `.claude/settings.local.json` | Permission config + MCP server definition |
| `ansys-workbench-mcp/` | ACT plugin, file queue processor, server code |

## Standard FEA Workflow

### 1. Geometry Audit (first time for a new part)
```bash
py geometry_audit.py
```
Modify the script to point `STEP_PATH` to the new `.STEP` file, then run. This outputs a JSON file with all face IDs, types (plane/cylinder), centroids, and areas — essential for identifying which faces to apply loads/constraints to.

### 2. Run FEA
```bash
py run_lianjiejian_fea.py
```
Or for shaft:
```bash
py run_mech_and_fea.py
```

The script handles: launching Mechanical if needed → cleaning stale queue files → submitting IronPython code → waiting for results → parsing output → writing JSON.

### 3. Results
Output: `results/<part>_results.json` and terminal summary with max/min stress/strain/deformation plus safety factor.

## FEA IronPython API Patterns (Discovered & Verified)

### Selection
```python
sel = ExtAPI.SelectionManager.CreateSelectionInfo(0)  # 0 = GeometryType
sel.Ids = [64, 65, 79, 80]  # face IDs from geometry audit
fs.Location = sel
```

### Fixed Support
```python
fs = analysis.AddFixedSupport()
fs.Location = sel
```

### Force (Component Definition)
```python
f = analysis.AddForce()
f.DefineBy = 0  # 0 = Components (only mode that works)
f.ZComponent.Output.SetDiscreteValue(0, Quantity(5000.0, "N"))
sel = ExtAPI.SelectionManager.CreateSelectionInfo(0)
sel.Ids = [face_id]
f.Location = sel
```

### Mesh
```python
msh = model.Mesh
msh.ElementSize = Quantity(3.0, "mm")
msh.Resolution = 5
msh.GenerateMesh()
```

### Material
```python
mats = model.Materials
mats.Import(r"F:/WORKS/Ansys/ANSYS Inc/v252/Addins/EngineeringData/Samples/General_Materials.xml")
body.Material = "Aluminum Alloy"  # or "Structural Steel"
```

### Results
```python
sol = analysis.Solution
es = sol.AddEquivalentStress()
es.EvaluateAllResults()
print("STRESS_MIN:" + str(es.Minimum))
print("STRESS_MAX:" + str(es.Maximum))
# Same pattern for AddEquivalentElasticStrain() and AddTotalDeformation()
```

### Project Management
```python
ExtAPI.DataModel.Project.New()
ExtAPI.DataModel.Project.Save(path)
```

### Body Access
```python
bodies = list(model.Geometry.GetBodies())
body = bodies[0]
```

### Face Centroid Access
```python
centroid_x = face.Centroid[0]  # tuple index, NOT .X
centroid_y = face.Centroid[1]
centroid_z = face.Centroid[2]
```

## Lianjiejian Geometry Map

```
Face 64: cylinder R=8.54, hole1 top    (x=5,   y=104.6, z=-20)
Face 65: cylinder R=8.54, hole1 bottom (x=5,   y=104.6, z=-80)
Face 72: plane area=2900mm², bottom face (z=-100) ← Force here (+Z)
Face 79: cylinder R=8.54, hole2 bottom (x=5,   y=115.4, z=-80)
Face 80: cylinder R=8.54, hole2 top    (x=5,   y=115.4, z=-20)

Fixed support on: 64, 65, 79, 80 (two through-holes, 4 cylindrical faces)
Force on: 72 (bottom face, +Z direction, 5000N)
```

## Shaft Geometry Map (from memory notes)

```
Seg 1: Y=0-20,   R=8.5  → faces [51, 52]
Seg 2: Y=20-40,  R=9.5  → faces [50, 54]  ← FixedSupport
Seg 3: Y=40-80,  R=10.5 → faces [49, 56]
Seg 4: Y=80-100, R=9.5  → faces [48, 59]  ← Force at vertex (0,80,9.5)
Seg 5: Y=100-120,R=8.5  → faces [47, 61]
End caps: [53, 55, 57, 58, 60, 62]
```

## Configuration

- **Permission mode:** `auto` (in `.claude/settings.local.json`) — tool calls auto-approved with safety classifier
- **Mechanical executable:** `F:\WORKS\Ansys\ANSYS Inc\v252\aisol\bin\winx64\AnsysWBU.exe`
- **Mechanical launch args:** `-r 252 -AppModeMech -DSApplet -nosplash -notabctrl`
- **Material library:** `F:/WORKS/Ansys/ANSYS Inc/v252/Addins/EngineeringData/Samples/General_Materials.xml`
- **ACT plugin location:** `%APPDATA%\Ansys\v252\ACT\extensions\WorkbenchMCP\`

## Performance

- **Cold start** (Mechanical not running): ~3 min (90s launch + 90s import/mesh + 30s solve)
- **Warm** (Mechanical already running): ~90s (60s import/mesh + 30s solve)
- **Mechanical stays alive** between runs for fast iteration

## Key Requirements / Design Constraints

1. Always use `fresh project` approach (Project.New()) rather than loading templates — templates produce zero results
2. Always launch Mechanical subprocess with `creationflags=subprocess.CREATE_NO_WINDOW` + `WB1_STANDALONE=1`
3. Always clean stale queue files before launching Mechanical
4. The ACT plugin must already be installed in the user ACT extensions folder for queue processing to work
5. Force `DefineBy` must be `0` (Components) — other modes may silently fail
6. stdout markers (`STRESS_MIN:`, `STRESS_MAX:`, etc.) are parsed from the queue response, not from direct subprocess output
7. Use `Quantity(value, "unit")` for all unit-bearing values
8. Monitor Mechanical process via `tasklist | findstr AnsysWBU` to detect launch success

## Resume Command

To continue from this state after switching models:
```bash
# Navigate to project directory
cd "D:\Claude Works\IDEA works\ANSYS_SIMULATION_TEST1"

# Start Claude Code — CLAUDE.md auto-loads this context
claude
```

All context (workflow, geometry maps, API patterns, results, configuration) is in this file and the memory system at `C:\Users\admin\.claude\projects\D--Claude-Works-IDEA-works-ANSYS_SIMULATION_TEST1\memory\`.
