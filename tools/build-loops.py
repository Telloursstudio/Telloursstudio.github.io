#!/usr/bin/env python3
"""Build every motion loop from tools/loops.json into a size ladder.

  python3 tools/build-loops.py              # all loops
  python3 tools/build-loops.py tell-ours    # just one

Writes  _media/loops/<slug>-2160.mp4 / -1080.mp4 / -720.mp4   (uploaded to the media CDN)
and     assets/loops/<slug>-0.jpg                              (first frame, sits under the video)

Why these settings (measured against filmlaab.com, Nov 2026):
- keyframe every 0.5 s, fixed GOP: fast start, clean replay at the loop point
- the master's own frame rate (23.976 stays 23.976, no judder from conversion)
- Rec.709 tags, so Safari and Chrome show the same grade
- +faststart, no audio
- 4K only when the master really is 4K after cropping
"""
import json, os, subprocess, sys
from concurrent.futures import ThreadPoolExecutor
from fractions import Fraction

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FF = os.environ.get('FFMPEG') or next((p for p in ['/opt/homebrew/bin/ffmpeg', '/usr/local/bin/ffmpeg', os.path.expanduser('~/AlabamaResearchTools/bin/ffmpeg')] if os.path.exists(p)), 'ffmpeg')
FP = FF[:-6] + 'ffprobe' if FF.endswith('ffmpeg') else 'ffprobe'
TIERS = {  # height: (crf, maxrate, bufsize)
    2160: (20, '12M', '24M'),
    1080: (20, '6M', '12M'),
    720: (21, '3M', '6M'),
}
OUT = os.path.join(ROOT, '_media', 'loops')
POSTERS = os.path.join(ROOT, 'assets', 'loops')


def src_path(spec, sources):
    if spec.startswith('vimeo:'):
        return os.path.join(ROOT, sources['vimeo'].format(name=spec[6:]))
    return os.path.expanduser(sources[spec])


def probe(path):
    out = subprocess.check_output([FP, '-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height,r_frame_rate', '-of', 'csv=p=0', path], text=True).strip().splitlines()[0].split(',')
    return int(out[0]), int(out[1]), Fraction(out[2])


def build(loop, sources):
    slug, src = loop['slug'], src_path(loop['src'], sources)
    w, h, fps = probe(src)
    crop = loop['crop']
    if crop == 'none':
        cf, cw = '', w
    elif crop == 'sub':
        cw = int(w * 0.88) // 2 * 2
        cf = f'crop={cw}:{int(h * 0.88) // 2 * 2}:{int(w * 0.06) // 2 * 2}:{int(h * 0.03) // 2 * 2},'
    else:
        cw = int(crop.split(':')[0])
        cf = f'crop={crop},'
    tiers = [t for t in TIERS if t != 2160 or cw >= 3300]
    gop = max(1, round(float(fps) / 2))
    args = [FF, '-hide_banner', '-loglevel', 'error', '-y']
    for start, length in loop['shots']:
        args += ['-ss', str(start), '-t', str(length), '-i', src]
    n = len(loop['shots'])
    fc = ''.join(f'[{i}:v]{cf}setsar=1[s{i}];' for i in range(n))
    fc += ''.join(f'[s{i}]' for i in range(n)) + f'concat=n={n}:v=1:a=0,format=yuv420p,split={len(tiers)}' + ''.join(f'[t{t}]' for t in tiers) + ';'
    fc += ';'.join(f'[t{t}]scale=-2:{t}:flags=lanczos[o{t}]' for t in tiers)
    args += ['-filter_complex', fc]
    os.makedirs(OUT, exist_ok=True)
    for t in tiers:
        crf, maxrate, buf = TIERS[t]
        args += ['-map', f'[o{t}]', '-an', '-c:v', 'libx264', '-preset', 'slow', '-profile:v', 'high', '-crf', str(crf),
                 '-maxrate', maxrate, '-bufsize', buf, '-g', str(gop), '-keyint_min', str(gop), '-sc_threshold', '0',
                 '-color_primaries', 'bt709', '-color_trc', 'bt709', '-colorspace', 'bt709',
                 '-movflags', '+faststart', os.path.join(OUT, f'{slug}-{t}.mp4')]
    subprocess.check_call(args)
    subprocess.check_call([FF, '-hide_banner', '-loglevel', 'error', '-y', '-i', os.path.join(OUT, f'{slug}-1080.mp4'),
                           '-frames:v', '1', '-q:v', '3', os.path.join(POSTERS, f'{slug}-0.jpg')])
    sizes = {t: round(os.path.getsize(os.path.join(OUT, f'{slug}-{t}.mp4')) / 1e6, 1) for t in tiers}
    print(f'{slug:30s} {float(fps):6.3f} fps  gop {gop}  ' + '  '.join(f'{t}p {s}MB' for t, s in sizes.items()), flush=True)
    return slug, max(tiers)


def main():
    cfg = json.load(open(os.path.join(ROOT, 'tools', 'loops.json')))
    loops = [l for l in cfg['loops'] if len(sys.argv) < 2 or l['slug'] in sys.argv[1:]]
    with ThreadPoolExecutor(3) as ex:
        results = dict(ex.map(lambda l: build(l, cfg['sources']), loops))
    print(json.dumps(results))


if __name__ == '__main__':
    main()
