#!/bin/sh
# Regenerate the optimised gallery images from your original photos.
#
# Usage (run from anywhere):
#   tools/optimize-images.sh PATH/TO/ORIGINALS [name ...]
#
# PATH/TO/ORIGINALS is a folder of original .jpg/.jpeg photos kept OUTSIDE
# images/ (so quality is never lost by re-compressing an already-compressed
# file). With no names, every photo in the folder is processed; or list base
# names, e.g.:  tools/optimize-images.sh ~/photos 05 06 fundraiser
# For each photo NAME it writes:
#   images/fulls/NAME.jpg   longest side at most 1600px, progressive, metadata
#                           stripped, quality 82. If that is over 300 KB it
#                           tries quality 78, 74, then repeats at 1400px and
#                           1200px until the file is under 300 KB.
#   images/thumbs/NAME.jpg  720px wide, progressive, metadata stripped, q82
# Requires ImageMagick 7 (`magick`). Existing files with the same name are
# overwritten.

set -eu

[ $# -ge 1 ] || { sed -n '2,19p' "$0" | sed 's/^# \{0,1\}//'; exit 1; }
src=$1; shift
root=$(cd "$(dirname "$0")/.." && pwd)
mkdir -p "$root/images/fulls" "$root/images/thumbs"

if [ $# -eq 0 ]; then
	for f in "$src"/*.jpg "$src"/*.jpeg "$src"/*.JPG "$src"/*.JPEG; do
		[ -f "$f" ] || continue
		n=${f##*/}; set -- "$@" "${n%.*}"
	done
fi

for name in "$@"; do
	in=
	for ext in jpg jpeg JPG JPEG; do
		[ -f "$src/$name.$ext" ] && in="$src/$name.$ext" && break
	done
	[ -n "$in" ] || { echo "skip: no $name.jpg in $src" >&2; continue; }

	out="$root/images/fulls/$name.jpg"
	for px in 1600 1400 1200; do
		for q in 82 78 74; do
			magick "$in" -auto-orient -resize "${px}x${px}>" -strip \
				-interlace Plane -sampling-factor 4:2:0 -quality $q "$out"
			[ "$(wc -c < "$out")" -lt 300000 ] && break 2
		done
	done
	magick "$in" -auto-orient -resize '720x>' -strip \
		-interlace Plane -sampling-factor 4:2:0 -quality 82 \
		"$root/images/thumbs/$name.jpg"
	echo "$name: full $(wc -c < "$out") bytes (${px}px, q$q), thumb $(wc -c < "$root/images/thumbs/$name.jpg") bytes"
done
