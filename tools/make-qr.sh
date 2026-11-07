#!/bin/sh
# One-command QR regeneration. Usage: sh tools/make-qr.sh [URL]
exec python3 "$(dirname "$0")/make-qr.py" "$@"
