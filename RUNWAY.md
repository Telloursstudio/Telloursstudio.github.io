# Runway shot list — Tell Ours site motion

The site already runs on your real Vimeo footage. These three Runway clips are the *extra layer*:
texture and transitions that make the site feel designed rather than assembled. Each one has a
slot waiting in `js/data.js → TO.motion`. Drop the exported `.mp4` into `assets/motion/`, set the
path, and the site picks it up. No other code changes are needed.

**General settings:** Gen-4.5 for finals, Gen-4 Turbo to test. 16:9 unless noted, 5–10s,
exported as H.264 MP4 under 6 MB (compress with HandBrake: CRF 26, no audio). Every clip must loop
seamlessly, so ask for "seamless loop, first and last frame identical", or trim to a clean loop in
Premiere/Resolve. Label it as AI-assisted wherever you'd normally disclose it.

---

## 1 · `heroOverlay` — light leak / film burn over the hero
Screen-blended on top of your Vimeo hero, so only the bright parts show. It needs a **pure black background**.

- **Mode:** Text → video
- **Prompt:** *Organic 16mm film light leak drifting slowly across a pure black frame, warm ember
  orange and amber flares, soft halation bloom, subtle film grain and dust, gentle flicker,
  seamless loop, no objects, no text, 24fps.*
- **Camera:** static
- **Path:** `assets/motion/hero-light-leak.mp4`

## 2 · `manifesto` — ink bloom over the "Some stories ask to be told" photo
Multiply-blended over the on-location photo (`assets/img/49b5ec0b-wtow-impact.jpg`), so it
should be **white with dark ink**.

- **Mode:** Text → video
- **Prompt:** *Black ink slowly blooming and feathering into wet white paper, macro, soft organic
  tendrils, high contrast, seamless loop, top-down, no text.*
- **Path:** `assets/motion/manifesto-ink.mp4`

## 3 · `closing` — the "Let's tell it." backdrop
This replaces the on-set Vimeo loop behind the closing headline. Use your own still as the
reference, so it stays your footage rather than generic stock.

- **Mode:** Image → video, reference: `assets/img/4743dc1e-wtoo-41-of-45.jpg`
- **Prompt:** *Slow cinematic push-in, the crew holds position, shallow depth of field, wind moves
  lightly through the frame, golden late-afternoon light, subtle anamorphic flare, documentary
  realism, seamless loop.*
- **Camera Control:** dolly in, intensity low
- **Path:** `assets/motion/closing-loop.mp4`

---

### Optional: Aleph restyles of your own footage (social + site)
Use **Aleph** (video → video) on 5–8s selects from your films to make title-card loops for each
film page. Example: take the opening of *Black Man Run* and prompt *"convert to high-contrast
black-and-white 16mm, heavy grain, crushed blacks."* Keep the real performance and the real
person. Restyle the look only. Never re-face or re-voice anyone (no deepfakes), and only use
footage of people who consented to the original film.

### HyperFrames (HTML → video)
The site's motion pieces (the film-leader countdown, the reel timecode, the kinetic wordmark) are
HTML/JS already, so HyperFrames can render them to MP4 for Instagram and Reels. It needs Node.js
installed on this Mac first (`brew install node`), and then they can be scripted as compositions.
