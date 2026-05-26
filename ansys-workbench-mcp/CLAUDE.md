# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Ansys Workbench MCP is a bidirectional bridge between LLM agents (via MCP) and Ansys Mechanical. It consists of:

- **MCP Server** (`server.py`) — FastMCP-based server exposing tools for Mechanical script execution, Workbench journal launches, file queue bridging, and socket timer communication.
- **ACT Plugin** (`workbench_plugin/`) — IronPython-based ACT extension that runs inside Ansys Mechanical, providing queue processing and socket timer bridge capabilities.
- **Mechanical CLI** — uses `ansys-mechanical` (PyMechanical CLI) for batch script execution.

## Architecture

```
MCP Client (e.g. Claude)  <->  MCP Server (server.py)
                                    |
                    ┌───────────────┴───────────────┐
                    |                               |
           Mechanical Script              Workbench Journal
           (ansys-mechanical CLI)        (RunWB2.exe -B -R)
                    |                               |
           Mechanical ACT Plugin          Workbench UI
           (workbench_plugin/)           (via .wbex/.xml)
                    |
        ┌───────────┴───────────┐
   File Queue Bridge      Socket Timer Bridge
   (JSON files on disk)   (TCP socket localhost:9885)
```

### Transport Layers

1. **Direct CLI** — Launch `.py` scripts via `ansys-mechanical -r 252 -i script.py --exit` or Workbench journals via `RunWB2.exe -B -R journal.wbjn`.
2. **File Queue** — JSON request/response files on disk. The ACT plugin polls the queue directory and processes requests inside Mechanical.
3. **Socket Timer** — A TCP socket bridge on `127.0.0.1:9885`. The ACT plugin runs a timer that checks for new requests and executes them inside Mechanical.

## Key Files

| File | Purpose |
|------|---------|
| `server.py` | MCP server entry point. Registers all tools with FastMCP. |
| `tools/workbench_bridge.py` | Core bridge: finds RunWB2.exe and ansys-mechanical CLI, launches jobs, tracks PIDs. |
| `tools/workbench_file_queue.py` | File queue bridge: submits requests, reads responses, triggers processing. |
| `tools/workbench_socket_timer.py` | Socket client for communicating with the Mechanical-side socket timer. |
| `workbench_plugin/WorkbenchMCP.xml` | ACT extension manifest. Declares toolbar, callbacks, and script entry points. |
| `workbench_plugin/main.py` | ACT extension entry points (IronPython). Auto-starts socket and queue timers. |
| `workbench_plugin/mechanical_queue_processor.py` | Queue processing logic that runs inside Mechanical. |
| `workbench_plugin/mechanical_socket_timer_v7.py` | Socket timer bridge that runs inside Mechanical. |
| `.env` | Local configuration (ANSYS paths, ports). Not committed. |

## Setup

### Prerequisites

- Ansys Workbench 2025 R2 (v252) installed at `F:\WORKS\Ansys\ANSYS Inc\v252`
- Python >= 3.10 with `.venv` in project root

### Environment Variables

| Variable | Purpose | Default |
|----------|---------|---------|
| `ANSYS_ROOT` | Path to ANSYS installation | auto-detected |
| `ANSYS_WB_EXE` | Full path to RunWB2.exe | auto-detected |
| `ANSYS_MECHANICAL_CLI` | Override ansys-mechanical CLI path | `.venv/Scripts/ansys-mechanical.exe` |
| `WORKBENCH_MCP_ROOT` | Project root path | current directory |
| `WORKBENCH_MCP_QUEUE_ROOT` | File queue directory | `./workbench_queue` |
| `WORKBENCH_MCP_HOST` | Socket bridge host | `127.0.0.1` |
| `WORKBENCH_MCP_PORT` | Socket bridge port | `9885` |
| `WORKBENCH_MCP_AUTO_START_SOCKET` | Auto-start socket timer in Mechanical | `1` |
| `WORKBENCH_MCP_AUTO_START_QUEUE` | Auto-start queue timer in Mechanical | `1` |

### ACT Extension Installation

The WorkbenchMCP ACT extension must be installed in the user ACT extensions folder:

```
%APPDATA%\Ansys\v252\ACT\extensions\
  WorkbenchMCP.xml         # Extension manifest
  WorkbenchMCP/            # Scripts folder
    main.py
    mechanical_queue_processor.py
    mechanical_socket_timer_v7.py
```

The XML filename must match the folder name exactly. The extension is auto-detected by Mechanical when placed in either:
- User folder: `%APPDATA%\Ansys\v252\ACT\extensions\`
- Global folder: `{ANSYS_ROOT}\Addins\ACT\extensions\`

## Common Commands

```bash
# Activate virtual environment
source .venv/Scripts/activate

# Run the MCP server (for testing/debugging)
python server.py

# Detect Workbench environment
python -c "from tools.workbench_bridge import detect_workbench_environment; import json; print(json.dumps(detect_workbench_environment(), indent=2))"

# Launch a Mechanical script (batch mode)
python -c "
from tools.workbench_bridge import launch_mechanical_script
result = launch_mechanical_script(script_path='path/to/script.py', revision=252, graphical=False)
print(result)
"
```

## Notes

- Mechanical scripts run inside IronPython 2.7, not CPython. Code must be compatible with IronPython.
- The ACT plugin uses `__file__` for path resolution and falls back to `WORKBENCH_MCP_ROOT` env var when installed outside the project directory.
- Job tracking uses PID-based monitoring; completed jobs are auto-detected when the PID is no longer running.
- Logs and job metadata are stored in `jobs/workbench/` (gitignored).
