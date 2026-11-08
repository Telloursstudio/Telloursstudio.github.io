# Tell Ours Studio — telloursstudio.com

A static site with no build step, framework or monthly platform fee. Every file is plain HTML, CSS
and JavaScript, so any static host can serve it.

```
index.html        Home: screening-room hero, reel, capabilities, academy, studio, closing
work.html         Filterable archive (grid + index view)
film.html?f=slug  One page per film: background preview, synopsis, credits, player, stills
services.html  about.html  studio.html  academy.html  contact.html  journal.html  404.html
js/data.js        ← ALL content lives here: films, Vimeo IDs, team, clients, curriculum
js/site.js        Shared behaviour (header, cursor, grain, theater player, page modules)
css/site.css      Design system: ink / bone / ember · Anton · Instrument Serif · Inter Tight
assets/img        Every photo carried over from the Lovable site (resized for web)
work/videos/*     Redirects so old links like /work/videos/black-man-run keep working
```

## Add a new film
Copy one entry in `js/data.js → films`, change `slug`, `title`, `vimeo.id`, `synopsis` and
`credits`, and drop stills into `assets/img/`. The film then appears on the home reel, the Work
archive and its own film page automatically. Make sure embedding is allowed in Vimeo's privacy
settings.

## Preview locally
```bash
python3 -m http.server 4173
```
Then open http://localhost:4173.

## Hosting & domain (switched 27 Oct 2026)
- **Hosting:** GitHub Pages, from the `Telloursstudio/Telloursstudio.github.io` repo (`main` branch).
  Every push to `main` goes live within about a minute. `CNAME` holds the custom domain, so don't delete it.
- **Domain:** telloursstudio.com was bought through Lovable, so its registration and DNS are managed
  in Lovable → Settings → *Workspace domains* → telloursstudio.com (renews Jul 19, 2028).
  Website records: four `A @` → 185.199.108–111.153 and `CNAME www` → telloursstudio.github.io.
  Email records (Google Workspace MX, SPF, DKIM, DMARC) were left untouched.
- **Leaving Lovable completely:** use *Transfer out* on that page to move the domain to a registrar
  you own (Cloudflare, Namecheap…), and re-create the records above there. Until then, keep the
  Lovable workspace so the domain stays manageable and auto-renews.
- `DNS-BACKUP-before-switch.txt` has the original records, in case you ever need to roll back.

## Contact form
Static hosting has no server, so the form currently opens the visitor's email app pre-filled to
alpha@telloursstudio.com. To receive submissions directly instead, create a free form endpoint
(e.g. Formspree), then in `contact.html` add `action="https://formspree.io/f/XXXX" method="POST"`
to the `<form>`. The script already posts to it when an action is set.

## Motion layer
The home page plays **silent loops cut from our own films**, the way filmlaab.com does: a
full-screen hero loop per film, work cards that play while on screen, and a capabilities stage
where hovering a service swaps the whole screen to its footage.

- **Recipe:** `tools/loops.json` lists every loop: its master file, crop, and the shots.
- **Build:** `python3 tools/build-loops.py [slug]` writes 2160p / 1080p / 720p MP4s to `_media/loops/`
  (0.5 s keyframes, native frame rate, Rec.709 tags) and the first-frame stills to `assets/loops/`.
- **Host:** the videos are NOT in this repo. They are served from https://media.telloursstudio.com by the Cloudflare Worker
  `telloursstudio-media` (`_media/worker.js`: byte ranges for Safari, one-year cache, CORS).
  To publish new loops: copy `_media/loops/*.mp4` into `_media/site/loops/v1/` (bump to `v2/` if you
  re-cut an existing loop, and update `TO.mediaBase`), regenerate `_media/sizes.js`, then from
  `TELL-OURS-LIVE-Claude-Code/source` run
  `../tools/with-local-node.sh ./node_modules/.bin/wrangler deploy --config ~/Desktop/telloursstudio-website/_media/wrangler.jsonc`.
- **Turn on:** add `'<slug>': 2160` (or `1080`) to `TO.loops` in `js/data.js`.
- **Player:** cards stream 720p/1080p; the hero and stage start on 1080p, then load the best
  size for the screen into memory and switch at the next replay, so replays never hit the network.
  Data Saver / slow connections get 720p.
- Keep shots steady, with no burned-in subtitles or titles.

See also `RUNWAY.md` for the three generated loops that slot into `TO.motion` in `js/data.js`.
