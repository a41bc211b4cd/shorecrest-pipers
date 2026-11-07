#!/usr/bin/env python3
"""Regenerate the QR code in print/sign.html and print/table-tent.html.

Usage:  python3 tools/make-qr.py [URL]
        (or: sh tools/make-qr.sh [URL])

URL defaults to the fundraiser page on the current site. Run this again,
with the new URL, once the final domain is chosen. It rewrites the text
between the QR markers in each print page: the inline SVG and the short
URL printed under it. If the `segno` package is missing, a throwaway
virtualenv is created in the system temp directory (never in the repo).
"""
import os, re, subprocess, sys, tempfile

DEFAULT = "https://a41bc211b4cd.github.io/shorecrest-pipers/fundraiser.html"
HERE = os.path.dirname(os.path.abspath(__file__))
PAGES = ["sign.html", "table-tent.html"]

try:
    import segno
except ImportError:
    venv = os.path.join(tempfile.gettempdir(), "pipers-qr-venv")
    py = os.path.join(venv, "bin", "python3")
    if not os.path.exists(py):
        subprocess.check_call([sys.executable, "-m", "venv", venv])
        subprocess.check_call([py, "-m", "pip", "-q", "install", "segno"])
    os.execv(py, [py] + sys.argv)

url = sys.argv[1] if len(sys.argv) > 1 else DEFAULT
short = re.sub(r"^https?://", "", url)

qr = segno.make(url, error="m", micro=False)
svg = qr.svg_inline(scale=1, border=4, dark="#000", light="#fff",
                    omitsize=True,
                    title="QR code linking to " + short, desc=None)
svg = svg.replace(' class="segno"', "").replace(
    "<svg ", '<svg class="qr" role="img" shape-rendering="crispEdges" ', 1)

for name in PAGES:
    path = os.path.join(HERE, "..", "print", name)
    html = open(path, encoding="utf-8").read()
    html, n1 = re.subn(r"(<!-- QR:START -->).*?(<!-- QR:END -->)",
                       lambda m: m.group(1) + svg + m.group(2), html, flags=re.S)
    html, n2 = re.subn(r"(<!-- URL:START -->).*?(<!-- URL:END -->)",
                       lambda m: m.group(1) + short + m.group(2), html, flags=re.S)
    if n1 < 1 or n2 < 1:
        sys.exit("Markers missing in " + name)
    open(path, "w", encoding="utf-8").write(html)
    print("updated print/%s (%d QR block(s))" % (name, n1))
print("QR now points to", url)
