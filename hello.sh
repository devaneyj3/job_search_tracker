#!/bin/bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
echo "Hello $(/bin/date '+%Y-%m-%d %H:%M:%S')" >> "$SCRIPT_DIR/hello.log"
