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
CNAME             Tells GitHub Pages to serve this on telloursstudio.com
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

## Moving off Lovable (keeping telloursstudio.com)
1. **GitHub.** Create a repo (e.g. `telloursstudio/site`) and push this folder.
2. **Hosting.** In the repo, go to *Settings → Pages → Deploy from branch → main / root*. GitHub
   Pages is free, and the `CNAME` file already claims the domain. (Netlify or Vercel also work:
   *Import from GitHub* with no build command.)
3. **DNS at Name.com** (where the domain is registered). Replace the records currently pointing at
   Lovable (`185.158.133.1`) with:
   - `A @ 185.199.108.153`, `A @ 185.199.109.153`, `A @ 185.199.110.153`, `A @ 185.199.111.153`
   - `CNAME www → <your-github-username>.github.io`
   Then tick *Enforce HTTPS* in GitHub Pages once the certificate is issued (minutes to a few hours).
4. **Lovable.** Remove the domain in Lovable *Domains* only *after* the new site is live. The
   `notify.telloursstudio.com` sender was Lovable's form email, which goes away with it. See below.

## Contact form
Static hosting has no server, so the form currently opens the visitor's email app pre-filled to
alpha@telloursstudio.com. To receive submissions directly instead, create a free form endpoint
(e.g. Formspree), then in `contact.html` add `action="https://formspree.io/f/XXXX" method="POST"`
to the `<form>`. The script already posts to it when an action is set.

## Motion layer
See `RUNWAY.md` for the three generated loops that slot into `TO.motion` in `js/data.js`.
