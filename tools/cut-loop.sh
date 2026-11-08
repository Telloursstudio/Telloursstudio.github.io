#!/bin/bash
# Cut one silent web loop (and its poster) from a finished film.
#   tools/cut-loop.sh "<film file>" <slug> <start> <length> [<start> <length> ...]
# One start/length pair = a single shot; several pairs = hard-cut montage, in order.
# Writes assets/loops/<slug>.mp4 (1920w H.264, no audio, ~5 Mbps, fast start) and <slug>.jpg.
# Then add  '<slug>': true  to TO.loops in js/data.js.
set -e
FF=${FFMPEG:-$(command -v ffmpeg || echo ~/AlabamaResearchTools/bin/ffmpeg)}
SRC="$1"; SLUG="$2"; shift 2
OUT="$(cd "$(dirname "$0")/.." && pwd)/assets/loops"; mkdir -p "$OUT"
ins=(); f=""; n=0
while [ $# -ge 2 ]; do
  ins+=(-ss "$1" -t "$2" -i "$SRC")
  f+="[$n:v]scale=1920:-2:flags=lanczos,setsar=1,fps=24[v$n];"; n=$((n+1)); shift 2
done
cat=""; for i in $(seq 0 $((n-1))); do cat+="[v$i]"; done
"$FF" -hide_banner -loglevel error "${ins[@]}" -filter_complex "${f}${cat}concat=n=$n:v=1:a=0,format=yuv420p[v]" \
  -map "[v]" -an -c:v libx264 -preset slow -crf 22 -maxrate 5M -bufsize 10M -profile:v high -movflags +faststart -y "$OUT/$SLUG.mp4"
"$FF" -hide_banner -loglevel error -i "$OUT/$SLUG.mp4" -frames:v 1 -q:v 3 -y "$OUT/$SLUG.jpg"
echo "$OUT/$SLUG.mp4  $(du -h "$OUT/$SLUG.mp4" | cut -f1)"
