#!/bin/sh
# Regenerates the 1200x630 social share images in images/share/.
# Run from anywhere: sh tools/make-share-images.sh
# Both pictures are built from images/fulls/fundraiser.jpg, the current club
# at Shoreline Stadium; replace that photo and re-run. Requires ImageMagick (`magick`).
set -e
cd "$(dirname "$0")/.."
mkdir -p images/share
FONT="${SHARE_FONT:-/System/Library/Fonts/Supplemental/Georgia Bold.ttf}"  # any bold TTF path or font name works

make() { # source output title subtitle
  magick "$1" -resize 1200x630^ -gravity center -extent 1200x630 \
    \( -size 1200x630 gradient:'rgba(0,0,0,0)'-'rgba(0,0,0,0.82)' \) -compose over -composite \
    -font "$FONT" -fill white -pointsize 68 -gravity southwest -annotate +60+120 "$3" \
    -fill '#c9a227' -pointsize 36 -annotate +60+55 "$4" \
    -strip -interlace Plane -sampling-factor 4:2:0 -quality 82 "$2"
}

make images/fulls/fundraiser.jpg images/share/fundraiser.jpg \
  "Pipes for the Pipers" "Goal: \$6,000 for 3 new sets of Highland pipes"
make images/fulls/fundraiser.jpg images/share/site.jpg \
  "Shorecrest Pipers Club" "Highland bagpiping and drumming in Shoreline, WA"
