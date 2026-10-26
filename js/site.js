/* ==========================================================================
   Tell Ours Studio — site.js
   Shared chrome (header, menu, footer, cursor, grain, theater) + page modules.
   ========================================================================== */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const html = document.documentElement;
  const page = document.body.dataset.page;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const hasGsap = !!window.gsap;
  const pad = (n, l = 2) => String(n).padStart(l, '0');
  const esc = (s = '') => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  html.classList.add('js');
  if (hasGsap && window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  /* ------------------------------------------------------------ Vimeo */
  const Vimeo = {
    src(v, { bg = false, autoplay = false, start } = {}) {
      const p = new URLSearchParams({ dnt: 1, title: 0, byline: 0, portrait: 0, playsinline: 1, autopause: 0 });
      if (v.hash) p.set('h', v.hash);
      if (bg) { p.set('autoplay', 1); p.set('muted', 1); p.set('loop', 1); p.set('controls', 0); p.set('quality', '540p'); }
      else { p.set('color', 'ff4f1a'); if (autoplay) p.set('autoplay', 1); }
      const t = start ?? (bg ? (v.previewStart ?? v.start) : v.start);
      return `https://player.vimeo.com/video/${v.id}?${p}${t ? `#t=${t}s` : ''}`;
    },
    /* Mount a muted looping background film into `.vframe`; it fades in only once frames are playing. */
    mountBg(frame, v, ratio) {
      if (!frame || frame.dataset.mounted || reduced) return;
      frame.dataset.mounted = '1';
      if (ratio) frame.style.setProperty('--r', ratio);
      const ifr = document.createElement('iframe');
      ifr.src = Vimeo.src(v, { bg: true });
      ifr.allow = 'autoplay; fullscreen; picture-in-picture';
      ifr.tabIndex = -1;
      ifr.setAttribute('aria-hidden', 'true');
      ifr.title = '';
      frame.appendChild(ifr);
      if (window.Vimeo && window.Vimeo.Player) {
        try {
          const pl = new window.Vimeo.Player(ifr);
          pl.on('playing', () => frame.classList.add('is-live'));
          frame._player = pl;
        } catch (e) { setTimeout(() => frame.classList.add('is-live'), 1500); }
      } else ifr.addEventListener('load', () => setTimeout(() => frame.classList.add('is-live'), 900));
    },
    unmount(frame) {
      if (!frame || !frame.dataset.mounted) return;
      frame.classList.remove('is-live');
      setTimeout(() => {
        if (frame.classList.contains('is-live')) return;
        try { frame._player && frame._player.destroy(); } catch (e) { /* noop */ }
        frame.innerHTML = '';
        delete frame.dataset.mounted;
      }, 700);
    },
  };
  const ratioOf = (f) => { const [w, h] = (f.aspect || '16 / 9').split('/').map(Number); return w / h; }; // '4 / 3' → 1.333

  /* ------------------------------------------------------------ chrome */
  const NAV = [
    ['work.html', 'Work'], ['services.html', 'Services'], ['academy.html', 'Academy'],
    ['about.html', 'About'], ['studio.html', 'Studio'], ['journal.html', 'Journal'],
  ];
  const here = (h) => (location.pathname.split('/').pop() || 'index.html') === h || (page === 'film' && h === 'work.html');
  const mark = `<svg class="brand__mark" viewBox="0 0 40 40" aria-hidden="true"><circle cx="24" cy="23" r="13" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M5 7h22M16 7v28" stroke="currentColor" stroke-width="2.4" fill="none"/><path d="M15 33l2-6 2 3 2-7 2 5 2-9 2 6 2-2 2 4 1 6z" fill="currentColor" opacity=".9"/></svg>`;

  function chrome() {
    const S = TO.studio;
    document.body.insertAdjacentHTML('afterbegin', `
      <a class="skip" href="#main">Skip to content</a>
      <header class="hdr" id="hdr">
        <a class="brand" href="index.html" aria-label="Tell Ours Studio — home">${mark}<span class="brand__word">Tell Ours<small>Studio</small></span></a>
        <nav class="nav" aria-label="Primary">${NAV.map(([h, l]) => `<a href="${h}"${here(h) ? ' aria-current="page"' : ''}>${l}</a>`).join('')}</nav>
        <a class="hdr__cta" href="contact.html"><i></i>Start a project</a>
        <button class="burger" id="burger" aria-label="Open menu" aria-expanded="false"><span></span><span></span></button>
      </header>
      <div class="menu" id="menu" aria-hidden="true">
        <nav aria-label="Menu">${[['index.html', 'Home'], ...NAV, ['contact.html', 'Contact']].map(([h, l], i) => `<a href="${h}"><small>0${i}</small>${l}</a>`).join('')}</nav>
        <div class="menu__foot"><a href="mailto:${S.email}">${S.email}</a><a href="${S.instagram}" target="_blank" rel="noopener">Instagram ↗</a></div>
      </div>
      <div class="grain" aria-hidden="true"></div>
      <div class="cursor" aria-hidden="true"><div class="cursor__ring"><span class="cursor__label"></span></div><div class="cursor__dot"></div></div>
      <div class="copied" role="status" aria-live="polite">Email copied</div>`);

    document.body.insertAdjacentHTML('beforeend', `
      <footer class="ftr">
        <div class="ftr__grid">
          <div>
            <p class="ftr__say">Where stories become impact.</p>
            <p style="max-width:40ch;margin:0">A film and media production studio based in West Haven, Connecticut. Films, campaigns, photography, and original stories made with precision, curiosity, and care.</p>
          </div>
          <div><h4>Studio</h4><ul><li><a href="about.html">About</a></li><li><a href="studio.html">The Space</a></li><li><a href="academy.html">Academy</a></li><li><a href="journal.html">Journal</a></li><li><a href="contact.html">Contact</a></li></ul></div>
          <div><h4>Work</h4><ul><li><a href="work.html">All films</a></li><li><a href="work.html#nonprofit">Nonprofit &amp; community</a></li><li><a href="services.html">Services</a></li><li><a href="contact.html">Start a project</a></li></ul></div>
          <div><h4>Reach us</h4><ul><li>${S.address.join('<br>')}</li><li><a href="mailto:${S.email}">${S.email}</a></li><li><a href="${S.phoneHref}">${S.phone}</a></li><li><a href="${S.instagram}" target="_blank" rel="noopener">${S.handle} ↗</a></li></ul></div>
        </div>
        <div class="ftr__word" aria-hidden="true">Tell Ours<span>.</span></div>
        <div class="ftr__base mono"><span>© ${new Date().getFullYear()} Tell Ours Studio</span><span>West Haven, CT · Available worldwide</span><a href="#main" data-top>Back to top ↑</a></div>
      </footer>
      <div class="theater" id="theater" role="dialog" aria-modal="true" aria-label="Film player">
        <div class="theater__glow"></div>
        <button class="theater__close" aria-label="Close player">✕</button>
        <div class="theater__screen"><div class="theater__slate mono"><span class="dot rec"></span><span data-t-slate></span></div><div class="theater__player"></div></div>
        <aside class="theater__side"></aside>
      </div>`);

    // menu
    const burger = $('#burger');
    burger.addEventListener('click', () => {
      const open = !html.classList.contains('menu-open');
      html.classList.toggle('menu-open', open);
      burger.setAttribute('aria-expanded', open);
      $('#menu').setAttribute('aria-hidden', !open);
      open ? lenis?.stop() : lenis?.start();
    });

    // header hide on scroll down, solid after hero
    let lastY = 0;
    const hdr = $('#hdr');
    addEventListener('scroll', () => {
      const y = scrollY;
      hdr.classList.toggle('is-solid', y > 80);
      hdr.classList.toggle('is-hidden', y > lastY && y > 400 && !html.classList.contains('menu-open'));
      lastY = y;
    }, { passive: true });

    $$('[data-top]').forEach((a) => a.addEventListener('click', (e) => { e.preventDefault(); lenis ? lenis.scrollTo(0) : scrollTo({ top: 0, behavior: 'smooth' }); }));
  }

  /* ------------------------------------------------------------ grain (animated, pre-rendered tiles) */
  function grain() {
    const el = $('.grain');
    if (!el || reduced) return;
    const tiles = Array.from({ length: 5 }, () => {
      const c = document.createElement('canvas');
      c.width = c.height = 180;
      const x = c.getContext('2d');
      const d = x.createImageData(180, 180);
      for (let i = 0; i < d.data.length; i += 4) { const v = Math.random() * 255; d.data[i] = d.data[i + 1] = d.data[i + 2] = v; d.data[i + 3] = 255; }
      x.putImageData(d, 0, 0);
      return `url(${c.toDataURL('image/png')})`;
    });
    let i = 0;
    setInterval(() => { el.style.backgroundImage = tiles[i++ % tiles.length]; el.style.transform = `translate(${(Math.random() * 10) | 0}%, ${(Math.random() * 10) | 0}%)`; }, 90);
  }

  /* ------------------------------------------------------------ cursor */
  function cursor() {
    if (!fine) return;
    const c = $('.cursor'), ring = $('.cursor__ring', c), dot = $('.cursor__dot', c), label = $('.cursor__label', c);
    let x = innerWidth / 2, y = innerHeight / 2, rx = x, ry = y;
    addEventListener('pointermove', (e) => { x = e.clientX; y = e.clientY; }, { passive: true });
    (function loop() {
      rx += (x - rx) * 0.18; ry += (y - ry) * 0.18;
      dot.style.transform = `translate(${x}px, ${y}px)`;
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
      requestAnimationFrame(loop);
    })();
    document.addEventListener('pointerover', (e) => {
      const t = e.target.closest('[data-cursor], a, button, label, select');
      c.classList.remove('is-label', 'is-link');
      if (!t) return;
      if (t.dataset.cursor) { label.textContent = t.dataset.cursor; c.classList.add('is-label'); }
      else c.classList.add('is-link');
    });
  }

  /* ------------------------------------------------------------ smooth scroll */
  let lenis = null;
  function smooth() {
    if (reduced || !window.Lenis) return;
    lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    if (hasGsap && window.ScrollTrigger) {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((t) => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    } else (function raf(t) { lenis.raf(t); requestAnimationFrame(raf); })();
    $$('a[href^="#"]').forEach((a) => a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length > 1 && $(id)) { e.preventDefault(); lenis.scrollTo(id, { offset: -20 }); }
    }));
  }

  /* ------------------------------------------------------------ reveals */
  function reveals(root = document) {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } }), { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    $$('[data-reveal]', root).forEach((el) => io.observe(el));
    // A fully clipped element never intersects, so [data-clip] is revealed when its top edge enters the viewport.
    const clips = $$('[data-clip]', root);
    const check = () => clips.forEach((el) => { if (!el.classList.contains('is-in') && el.getBoundingClientRect().top < innerHeight * 0.88) el.classList.add('is-in'); });
    addEventListener('scroll', check, { passive: true });
    check();
    // masked line headings
    if (!hasGsap) return;
    $$('[data-lines]', root).forEach((el) => {
      const inner = $$('.line-mask > span', el);
      gsap.from(inner, { yPercent: 110, duration: 1.2, ease: 'expo.out', stagger: 0.09, scrollTrigger: { trigger: el, start: 'top 85%' } });
    });
  }

  const splitChars = (el) => {
    const t = el.textContent;
    el.setAttribute('aria-label', t);
    el.innerHTML = t.split(' ').map((w) => `<span style="display:inline-block;white-space:nowrap" aria-hidden="true">${[...w].map((ch) => `<span class="ch">${esc(ch)}</span>`).join('')}</span>`).join(' ');
    return $$('.ch', el);
  };

  /* ------------------------------------------------------------ film card + hover preview */
  function card(f, cls = '', i = f.index) {
    const meta = [f.production.client, f.runtime, f.production.location].filter(Boolean).slice(0, 2);
    return `<a class="card ${cls}" href="film.html?f=${f.slug}" data-film="${f.slug}" data-cursor="Watch">
      <div class="media"><img src="${f.poster}" alt="Still from ${esc(f.title)}" loading="lazy"><div class="vframe vframe--cover"></div></div>
      <div class="card__shade"></div>
      <div class="card__top"><span class="chip chip--bone">${pad(i + 1)} / ${esc(f.format)}</span><span class="chip">${f.year}</span></div>
      <span class="card__live chip chip--ember"><i class="dot rec" style="background:var(--ink)"></i>Preview</span>
      <div class="card__body"><h3 class="card__title">${esc(f.short || f.title)}</h3><div class="card__meta mono">${meta.map((m) => `<span>${esc(m)}</span>`).join('') || '<span>Tell Ours Studio</span>'}</div></div>
    </a>`;
  }
  function previews(root = document) {
    if (!fine) return;
    $$('.card[data-film]', root).forEach((el) => {
      const f = TO.film(el.dataset.film);
      let t;
      el.addEventListener('mouseenter', () => { t = setTimeout(() => { Vimeo.mountBg($('.vframe', el), f.vimeo, ratioOf(f)); el.classList.add('is-previewing'); }, 280); });
      el.addEventListener('mouseleave', () => { clearTimeout(t); el.classList.remove('is-previewing'); Vimeo.unmount($('.vframe', el)); });
    });
  }

  /* ------------------------------------------------------------ theater */
  let tList = [], tIndex = 0, lastFocus = null;
  const theater = {
    open(item, list) {
      tList = list || [item];
      tIndex = Math.max(0, tList.indexOf(item));
      lastFocus = document.activeElement;
      this.render();
      $('#theater').classList.add('is-open');
      lenis?.stop();
      document.body.style.overflow = 'hidden';
      $('#theater .theater__close').focus();
    },
    render() {
      const it = tList[tIndex];
      const th = $('#theater');
      $('.theater__glow', th).style.backgroundImage = `url(${it.poster})`;
      const pl = $('.theater__player', th);
      pl.style.aspectRatio = it.aspect || '16 / 9';
      pl.style.maxWidth = it.vertical ? 'calc((100svh - 140px) * 9 / 16)' : '';
      pl.innerHTML = `<iframe src="${Vimeo.src(it.vimeo, { autoplay: true })}" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen title="${esc(it.title)}"></iframe>`;
      $('[data-t-slate]', th).textContent = `${pad(tIndex + 1)} / ${pad(tList.length)} · Now screening`;
      const credits = (it.credits || []).map(([r, n]) => `<dt>${esc(r)}</dt><dd>${esc(n)}</dd>`).join('');
      const prod = it.production ? Object.entries(it.production).map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join('') : '';
      $('.theater__side', th).innerHTML = `
        <span class="chip chip--ember">${esc(it.format || 'Behind the scenes')}${it.year ? ' · ' + it.year : ''}</span>
        <h2>${esc(it.title)}</h2>
        ${it.synopsis ? `<p style="margin:0;color:rgba(239,235,227,.8)">${esc(it.synopsis)}</p>` : ''}
        ${prod || credits ? `<dl>${prod}${credits}</dl>` : ''}
        ${it.slug ? `<a class="tlink" href="film.html?f=${it.slug}">Film page &amp; stills <span class="arrow">→</span></a>` : ''}
        ${tList.length > 1 ? `<div class="theater__nav"><button data-t="-1">← Previous</button><button data-t="1">Next →</button></div>` : ''}`;
      $$('[data-t]', th).forEach((b) => b.addEventListener('click', () => { tIndex = (tIndex + +b.dataset.t + tList.length) % tList.length; this.render(); }));
    },
    close() {
      const th = $('#theater');
      th.classList.remove('is-open');
      setTimeout(() => { $('.theater__player', th).innerHTML = ''; }, 400);
      lenis?.start();
      document.body.style.overflow = '';
      lastFocus && lastFocus.focus();
    },
  };
  function theaterBind() {
    const th = $('#theater');
    $('.theater__close', th).addEventListener('click', () => theater.close());
    addEventListener('keydown', (e) => {
      if (!th.classList.contains('is-open')) return;
      if (e.key === 'Escape') theater.close();
      if (e.key === 'ArrowRight' && tList.length > 1) { tIndex = (tIndex + 1) % tList.length; theater.render(); }
      if (e.key === 'ArrowLeft' && tList.length > 1) { tIndex = (tIndex - 1 + tList.length) % tList.length; theater.render(); }
    });
    document.addEventListener('click', (e) => {
      const b = e.target.closest('[data-play]');
      if (!b) return;
      e.preventDefault();
      if (b.dataset.play === 'bts') {
        const list = TO.bts.map((c) => ({ title: c.caption.replace(/\.$/, ''), vimeo: { id: c.id }, poster: c.poster, aspect: '9 / 16', vertical: true, format: 'Behind the scenes' }));
        theater.open(list[+b.dataset.i], list);
      } else theater.open(TO.film(b.dataset.play), TO.films);
    });
  }

  /* ------------------------------------------------------------ copy email */
  function copyEmail() {
    $$('[data-copy]').forEach((el) => el.addEventListener('click', async (e) => {
      if (e.metaKey || e.ctrlKey) return;
      try {
        await navigator.clipboard.writeText(el.dataset.copy);
        e.preventDefault();
        const t = $('.copied'); t.classList.add('is-on'); setTimeout(() => t.classList.remove('is-on'), 1800);
      } catch (err) { /* fall through to mailto */ }
    }));
  }

  /* ------------------------------------------------------------ film leader (preloader) */
  function leader(done) {
    let seen = false;
    try { seen = sessionStorage.getItem('to-leader') === '1'; sessionStorage.setItem('to-leader', '1'); } catch (e) { /* private mode */ }
    if (seen || reduced || page !== 'home') return done();
    document.body.insertAdjacentHTML('afterbegin', `<div class="leader" id="leader"><button class="leader__skip mono">Skip ↵</button><canvas width="1120" height="1120" aria-hidden="true"></canvas><div class="leader__slate mono"><span>Tell Ours Studio · Reel 2026</span><span>West Haven, CT</span></div></div>`);
    const L = $('#leader'), cv = $('canvas', L), x = cv.getContext('2d');
    const W = cv.width, C = W / 2, R = W * 0.42;
    const start = performance.now(), per = 620, count = 3;
    let stopped = false;
    function frame(now) {
      if (stopped) return;
      const t = now - start, n = count - Math.floor(t / per), p = (t % per) / per;
      x.clearRect(0, 0, W, W);
      x.fillStyle = '#1a1a1a'; x.fillRect(0, 0, W, W);
      // sweep
      x.beginPath(); x.moveTo(C, C); x.arc(C, C, W, -Math.PI / 2, -Math.PI / 2 + p * Math.PI * 2); x.closePath();
      x.fillStyle = '#2b2b2b'; x.fill();
      // crosshair + rings
      x.strokeStyle = '#efebe3'; x.lineWidth = 3;
      x.beginPath(); x.moveTo(0, C); x.lineTo(W, C); x.moveTo(C, 0); x.lineTo(C, W); x.stroke();
      x.beginPath(); x.arc(C, C, R, 0, Math.PI * 2); x.stroke();
      x.beginPath(); x.arc(C, C, R * 0.82, 0, Math.PI * 2); x.stroke();
      // ember tick on the sweep edge
      const a = -Math.PI / 2 + p * Math.PI * 2;
      x.strokeStyle = '#ff4f1a'; x.lineWidth = 8;
      x.beginPath(); x.moveTo(C, C); x.lineTo(C + Math.cos(a) * W, C + Math.sin(a) * W); x.stroke();
      // number
      x.fillStyle = '#efebe3'; x.font = `${W * 0.5}px Anton, Impact, sans-serif`; x.textAlign = 'center'; x.textBaseline = 'middle';
      x.fillText(String(Math.max(n, 1)), C, C + W * 0.03);
      // flicker
      if (Math.random() < 0.12) { x.fillStyle = 'rgba(239,235,227,.05)'; x.fillRect(0, 0, W, W); }
      if (t < per * count) requestAnimationFrame(frame); else finish();
    }
    function finish() {
      if (stopped) return;
      stopped = true;
      L.classList.add('is-done');
      if (hasGsap) gsap.to(L, { clipPath: 'inset(0 0 100% 0)', duration: 1, ease: 'expo.inOut', onComplete: () => L.remove() });
      else L.remove();
      done();
    }
    $('.leader__skip', L).addEventListener('click', finish);
    addEventListener('keydown', (e) => e.key === 'Enter' && finish(), { once: true });
    (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => requestAnimationFrame(frame));
  }

  /* =========================================================== PAGES */

  /* ---------------- HOME */
  function home() {
    const featured = ['still-arriving', 'inside-coastal', 'black-man-run', 'as-they-count-us', 'heba'].map(TO.film);
    const hero = $('#hero');
    const stage = $('.hero__stage', hero), rail = $('.hero__rail', hero);
    rail.style.setProperty('--n', featured.length);
    stage.innerHTML = featured.map((f, i) => `<div class="hero__slide${i === 0 ? ' is-active' : ''}"><img src="${f.poster}" alt="" ${i ? 'loading="lazy"' : 'fetchpriority="high"'}><div class="vframe vframe--cover"></div></div>`).join('');
    if (TO.motion.heroOverlay) stage.insertAdjacentHTML('beforeend', `<video class="hero__overlay-motion" src="${TO.motion.heroOverlay}" autoplay muted loop playsinline></video>`);
    rail.innerHTML = featured.map((f, i) => `<button class="hero__pick${i === 0 ? ' is-active' : ''}" data-i="${i}" aria-label="Show ${esc(f.title)}"><span class="bar"><i></i></span><span class="mono"><b>${pad(i + 1)}</b><span>${esc(f.short || f.title)}</span></span></button>`).join('');
    const titleEl = $('.hero__title', hero), metaEl = $('.hero__meta', hero), nowEl = $('[data-now]', hero), orb = $('.play-orb', hero);
    const slides = $$('.hero__slide', stage), picks = $$('.hero__pick', rail);
    let cur = 0, timer = null, inView = true;
    const DUR = 9;

    function show(i) {
      const prev = cur;
      cur = (i + featured.length) % featured.length;
      const f = featured[cur];
      slides.forEach((s, k) => s.classList.toggle('is-active', k === cur));
      picks.forEach((p, k) => p.classList.toggle('is-active', k === cur));
      if (prev !== cur) Vimeo.unmount($('.vframe', slides[prev]));
      if (!reduced) Vimeo.mountBg($('.vframe', slides[cur]), f.vimeo, ratioOf(f));
      titleEl.textContent = f.title;
      nowEl.textContent = pad(cur + 1);
      metaEl.innerHTML = `<span>${esc(f.format)}</span><span>—</span><span>${f.year}</span>${f.runtime ? `<span>—</span><span>${f.runtime}</span>` : ''}`;
      orb.dataset.play = f.slug;
      orb.setAttribute('aria-label', `Watch ${f.title}`);
      if (hasGsap) {
        const chs = splitChars(titleEl);
        gsap.fromTo(chs, { yPercent: 110, rotate: 8, opacity: 0 }, { yPercent: 0, rotate: 0, opacity: 1, duration: 1, ease: 'expo.out', stagger: 0.022 });
        gsap.fromTo(metaEl, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.25 });
        picks.forEach((p) => gsap.set($('i', p), { scaleX: 0 }));
        gsap.killTweensOf('.hero__pick i');
        if (!reduced) gsap.to($('i', picks[cur]), { scaleX: 1, duration: DUR, ease: 'none', onComplete: () => inView && show(cur + 1) });
      } else {
        clearTimeout(timer);
        timer = setTimeout(() => show(cur + 1), DUR * 1000);
      }
    }
    picks.forEach((p) => p.addEventListener('click', () => show(+p.dataset.i)));
    new IntersectionObserver(([e]) => {
      inView = e.isIntersecting;
      const fr = $('.vframe', slides[cur]);
      if (fr && fr._player) inView ? fr._player.play().catch(() => {}) : fr._player.pause().catch(() => {});
      if (hasGsap) gsap.getTweensOf('.hero__pick i').forEach((t) => (inView ? t.resume() : t.pause()));
    }, { threshold: 0.15 }).observe(hero);

    // running timecode @ 24fps
    const tc = $('.hero__tc', hero);
    const t0 = performance.now();
    (function tick() { const f = Math.floor((performance.now() - t0) / (1000 / 24)); tc.textContent = `TC ${pad(Math.floor(f / 86400))}:${pad(Math.floor(f / 1440) % 60)}:${pad(Math.floor(f / 24) % 60)}:${pad(f % 24)}`; requestAnimationFrame(tick); })();

    // wordmark
    const word = $('.hero__word', hero);
    const chs = splitChars(word);
    chs[chs.length - 1].classList.add('ch--dot');

    const intro = () => {
      show(0);
      if (!hasGsap) return;
      gsap.from(chs, { yPercent: 105, duration: 1.4, ease: 'expo.out', stagger: 0.05, delay: 0.1 });
      gsap.from('.hero__top, .hero__rail, .play-orb', { opacity: 0, y: 20, duration: 1, delay: 0.6, stagger: 0.1 });
      if (!reduced && window.ScrollTrigger) {
        chs.forEach((c, i) => gsap.to(c, { yPercent: -40 - (i % 3) * 30, rotate: (i % 2 ? 1 : -1) * (4 + i), ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } }));
        gsap.to(stage, { scale: 1.08, yPercent: 12, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });
        ScrollTrigger.create({ trigger: hero, start: 'top+=40 top', onEnter: () => hero.classList.add('is-letterbox'), onLeaveBack: () => hero.classList.remove('is-letterbox') });
      }
      if (fine && !reduced) hero.addEventListener('pointermove', (e) => {
        const dx = e.clientX / innerWidth - 0.5;
        chs.forEach((c, i) => gsap.to(c, { x: dx * (i - chs.length / 2) * 6, duration: 1.2, ease: 'power3.out', overwrite: 'auto' }));
      });
    };
    leader(intro);

    bands();
    manifesto();
    if (TO.motion.manifesto) $('.manifesto__media').insertAdjacentHTML('beforeend', `<video src="${TO.motion.manifesto}" autoplay muted loop playsinline></video>`);

    // selected work bento
    const sel = ['as-they-count-us', 'black-man-run', 'yale-kente-stoling-2026', 'the-city-is-watching', 'freedom-pack', 'still-arriving'].map(TO.film);
    $('#bento').innerHTML =
      card(sel[0], 'card--xl', 0) + card(sel[1], 'card--tall', 1) + card(sel[2], 'card--tall', 2) +
      card(sel[3], 'card--half', 3) + card(sel[4], 'card--half', 4) +
      `<a class="tile-note" href="work.html" data-cursor="Archive"><span class="mono">The full archive</span><span class="big">${TO.films.length}<br>films<br><span class="serif">&amp; counting</span></span><span class="tlink">Keep watching <span class="arrow">→</span></span></a>` +
      card(sel[5], 'card--tall', 5) +
      `<a class="card card--tall" href="services.html#nonprofit" data-cursor="Explore" style="background:var(--bone);color:var(--ink)"><div class="card__body" style="inset:22px"><span class="mono">Collection</span><h3 class="card__title" style="margin-top:12px">Nonprofit &amp; community</h3><p style="margin:0">Films that share a mission through the voices closest to the work.</p></div></a>`;
    $$('#bento > *').forEach((c, i) => { c.setAttribute('data-reveal', ''); c.style.transitionDelay = `${(i % 3) * 80}ms`; });
    previews($('#bento'));

    reel();
    caps();
    counters();
    phones();
    studioPan();
  }

  /* ---------------- shared: marquee bands + read-along manifesto */
  function bands() {
    // marquee bands, velocity-skewed
    $$('.band').forEach((band) => {
      const track = $('.band__track', band);
      const dir = band.dataset.dir === 'right' ? 1 : -1;
      const spark = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z" fill="currentColor"/></svg>`;
      const items = (band.dataset.items ? band.dataset.items.split('|') : TO.clients).map((n) => `<span class="band__item">${esc(n)}${spark}</span>`).join('');
      track.innerHTML = `<div style="display:flex">${items}</div><div style="display:flex" aria-hidden="true">${items}</div>`;
      if (reduced) return;
      let x = 0, skew = 0;
      const w = () => track.firstElementChild.offsetWidth;
      (function loop() {
        const v = lenis ? lenis.velocity : 0;
        x += (0.6 + Math.min(Math.abs(v) * 0.25, 8)) * dir;
        const W = w();
        if (x <= -W) x += W; if (x > 0) x -= W;
        skew += ((v * -0.25) - skew) * 0.1;
        track.style.transform = `translate3d(${x}px,0,0) skewX(${Math.max(-12, Math.min(12, skew))}deg)`;
        requestAnimationFrame(loop);
      })();
    });

  }
  function manifesto() {
    // manifesto — words light up as you read
    const mt = $('.manifesto__text');
    if (mt) {
      const walk = (node) => [...node.childNodes].forEach((n) => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach((p) => { if (!p) return; if (/^\s+$/.test(p)) frag.append(p); else { const s = document.createElement('span'); s.className = 'w'; s.textContent = p; frag.append(s); } });
          n.replaceWith(frag);
        } else if (n.nodeType === 1 && n.tagName !== 'BR') walk(n);
      });
      walk(mt);
      const ws = $$('.w', mt);
      if (hasGsap && window.ScrollTrigger && !reduced) {
        ScrollTrigger.create({ trigger: mt, start: 'top 80%', end: 'bottom 45%', scrub: true, onUpdate: (s) => { const k = s.progress * ws.length; ws.forEach((w, i) => { w.style.opacity = i < k ? 1 : 0.12; }); } });
      } else ws.forEach((w) => (w.style.opacity = 1));
    }
  }

  /* ---------------- The Reel: pinned horizontal film strip */
  function reel() {
    const sec = $('#reel');
    if (!sec) return;
    const strip = $('.strip', sec);
    strip.innerHTML = TO.films.map((f, i) => `<button class="frame" data-play="${f.slug}" data-cursor="Play" aria-label="Play ${esc(f.title)}"><img src="${f.poster}" alt="" loading="lazy"><span class="frame__no">${pad(i + 1)}A ▸ KODAK 5219</span><span class="frame__cap"><b>${esc(f.short || f.title)}</b><span class="mono">${f.year}</span></span></button>`).join('');
    const tc = $('.reel__tc', sec), bar = $('.reel__progress i', sec), cnt = $('[data-count]', sec);
    const frames = $$('.frame', strip);
    const setP = (p) => {
      const idx = Math.min(frames.length - 1, Math.round(p * (frames.length - 1)));
      frames.forEach((f, i) => f.classList.toggle('is-center', i === idx));
      cnt.textContent = `${pad(idx + 1)} / ${pad(frames.length)}`;
      const fr = Math.floor(p * 24 * 60 * 3);
      tc.textContent = `${pad(Math.floor(fr / 1440))}:${pad(Math.floor(fr / 24) % 60)}:${pad(fr % 24)}`;
      bar.style.transform = `scaleX(${p})`;
    };
    setP(0);
    if (!hasGsap || !window.ScrollTrigger || reduced || innerWidth < 760) {
      const wrap = strip.parentElement;
      wrap.style.overflowX = 'auto';
      wrap.addEventListener('scroll', () => setP(wrap.scrollLeft / (wrap.scrollWidth - wrap.clientWidth || 1)), { passive: true });
      return;
    }
    const dist = () => strip.scrollWidth - strip.parentElement.clientWidth + parseFloat(getComputedStyle(strip.parentElement).paddingLeft) * 2;
    gsap.to(strip, {
      x: () => -dist(), ease: 'none',
      scrollTrigger: { trigger: sec, start: 'top top', end: () => '+=' + dist(), pin: $('.reel__pin', sec), scrub: 0.6, invalidateOnRefresh: true, onUpdate: (s) => setP(s.progress) },
    });
  }

  /* ---------------- capabilities accordion with cursor-follow image */
  const CAPS = [
    { key: 'film', name: 'Film & documentary', body: 'Character-led documentaries, short films, portraits, and original stories built with patience and point of view.', list: ['Documentaries & short films', 'Documentary portraits', 'Interview-led stories', 'Original work'], films: ['as-they-count-us', 'still-arriving', 'heba'] },
    { key: 'nonprofit', name: 'Nonprofit & community', body: 'Films that share a mission through the voices of the people closest to the work — for websites, social media, donor rooms, and grant conversations.', list: ['Mini documentaries & mission films', 'Testimonials & interviews', 'Event & milestone films', 'Fundraising & awareness campaigns'], films: ['freedom-pack', 'citywide-youth-coalition-50', 'still-worth-reading'] },
    { key: 'brands', name: 'Brands, institutions & events', body: 'Brand films, institutional films, and cinematic coverage of the gatherings, ceremonies, and cultural moments that define a community.', list: ['Brand & campaign films', 'Institutional films', 'Event & live coverage', 'Multi-camera production'], films: ['yale-kente-stoling-2026', 'freddy-fixer-parade', 'blossoming-beyond-bars'] },
    { key: 'post', name: 'Photography & post', body: 'Editorial portraits and stills with the same care as a film frame — and the edit, color, sound, and motion that finish the story.', list: ['Portraits & campaign stills', 'Editing', 'Color & sound', 'Motion & delivery'], films: ['broken-wings', 'inside-coastal', 'the-city-is-watching'] },
  ];
  function caps() {
    const box = $('#caps');
    if (!box) return;
    box.innerHTML = CAPS.map((c, i) => `
      <div class="cap" id="${c.key}" data-img="${TO.film(c.films[0]).poster}">
        <button class="cap__row" aria-expanded="false"><span class="mono">0${i + 1}</span><span class="cap__name">${c.name}</span><span class="cap__plus" aria-hidden="true"></span></button>
        <div class="cap__panel"><div class="cap__inner"><div class="cap__grid">
          <span></span><p>${c.body}</p>
          <ul>${c.list.map((l) => `<li>${l}</li>`).join('')}</ul>
          <div class="cap__films"><span class="mono" style="color:var(--ash)">See it in</span>${c.films.map(TO.film).map((f) => `<a href="film.html?f=${f.slug}"><img src="${f.poster}" alt="" loading="lazy"><span>${esc(f.short || f.title)}</span></a>`).join('')}</div>
        </div></div></div>
      </div>`).join('');
    $$('.cap', box).forEach((c) => $('.cap__row', c).addEventListener('click', () => {
      const open = !c.classList.contains('is-open');
      $$('.cap', box).forEach((o) => { o.classList.remove('is-open'); $('.cap__row', o).setAttribute('aria-expanded', 'false'); });
      c.classList.toggle('is-open', open);
      $('.cap__row', c).setAttribute('aria-expanded', open);
      setTimeout(() => window.ScrollTrigger && ScrollTrigger.refresh(), 750);
    }));
    if (location.hash && $(location.hash, box)) $('.cap__row', $(location.hash, box)).click();
    floatImage($$('.cap', box), (el) => el.dataset.img, '.cap__row');
  }

  function floatImage(items, getSrc, hoverSel) {
    if (!fine) return;
    const fl = document.createElement('div');
    fl.className = 'float-img';
    fl.innerHTML = '<img alt="">';
    document.body.appendChild(fl);
    const img = $('img', fl);
    let x = 0, y = 0, fx = 0, fy = 0;
    addEventListener('pointermove', (e) => { x = e.clientX; y = e.clientY; }, { passive: true });
    (function loop() { fx += (x - fx) * 0.12; fy += (y - fy) * 0.12; fl.style.left = fx + 60 + 'px'; fl.style.top = fy + 'px'; requestAnimationFrame(loop); })();
    items.forEach((el) => {
      const h = hoverSel ? $(hoverSel, el) : el;
      h.addEventListener('mouseenter', () => { img.src = getSrc(el); fl.classList.add('is-on'); });
      h.addEventListener('mouseleave', () => fl.classList.remove('is-on'));
    });
  }

  function counters() {
    $$('[data-count-to]').forEach((el) => {
      const to = +el.dataset.countTo;
      new IntersectionObserver(([e], o) => {
        if (!e.isIntersecting) return;
        o.disconnect();
        if (!hasGsap || reduced) { el.textContent = pad(to); return; }
        const s = { v: 0 };
        gsap.to(s, { v: to, duration: 1.8, ease: 'expo.out', onUpdate: () => (el.textContent = pad(Math.round(s.v))) });
      }, { threshold: 0.5 }).observe(el);
    });
  }

  function phones() {
    const box = $('#phones');
    if (!box) return;
    box.innerHTML = TO.bts.map((c, i) => `<button class="phone media" data-play="bts" data-i="${i}" data-cursor="Play" aria-label="Play: ${esc(c.caption)}"><img src="${c.poster}" alt="" loading="lazy"><div class="vframe vframe--cover" style="--r:.5625"></div><span class="mono chip">${pad(i + 1)}</span></button>`).join('');
    if (fine) $$('.phone', box).forEach((p, i) => {
      p.addEventListener('mouseenter', () => Vimeo.mountBg($('.vframe', p), { id: TO.bts[i].id }, 0.5625));
      p.addEventListener('mouseleave', () => Vimeo.unmount($('.vframe', p)));
    });
    if (hasGsap && window.ScrollTrigger && !reduced) $$('.phone', box).forEach((p, i) => gsap.to(p, { yPercent: i % 2 ? -10 : 8, ease: 'none', scrollTrigger: { trigger: box, start: 'top bottom', end: 'bottom top', scrub: true } }));
  }

  function studioPan() {
    $$('[data-parallax]').forEach((img) => {
      if (!hasGsap || !window.ScrollTrigger || reduced) return;
      gsap.fromTo(img, { yPercent: -8 }, { yPercent: 8, ease: 'none', scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
  }

  function closing() {
    const sec = $('#closing');
    if (!sec) return;
    const fr = $('.vframe', sec);
    if (TO.motion.closing) $('.media', sec).insertAdjacentHTML('beforeend', `<video class="hero__overlay-motion" style="mix-blend-mode:normal;opacity:1" src="${TO.motion.closing}" autoplay muted loop playsinline></video>`);
    else new IntersectionObserver(([e]) => { if (e.isIntersecting) Vimeo.mountBg(fr, TO.onSet, 0.5625); }, { rootMargin: '200px' }).observe(sec);
    const w = $('.closing__word', sec);
    const chs = splitChars(w);
    if (hasGsap && window.ScrollTrigger && !reduced) {
      gsap.from(chs, { yPercent: 100, opacity: 0, rotate: 6, stagger: 0.04, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: w, start: 'top 80%' } });
      if (fine) sec.addEventListener('pointermove', (e) => chs.forEach((c) => {
        const r = c.getBoundingClientRect(), d = Math.hypot(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2));
        gsap.to(c, { y: Math.max(0, 1 - d / 400) * -40, duration: 0.6, ease: 'power3.out', overwrite: 'auto' });
      }));
    }
  }

  /* ---------------- WORK archive */
  function work() {
    const grid = $('#archive'), rows = $('#rows');
    const groups = {
      all: () => true,
      documentary: (f) => /document/i.test(f.category + f.format),
      short: (f) => /short film/i.test(f.category + f.format),
      event: (f) => /event/i.test(f.category + f.format),
      portrait: (f) => /portrait/i.test(f.category + f.format),
      nonprofit: (f) => (f.collections || []).includes('nonprofit-community'),
    };
    const labels = { all: 'All', documentary: 'Documentary', short: 'Short film', event: 'Event', portrait: 'Portrait', nonprofit: 'Nonprofit & community' };
    $('#filters').innerHTML = Object.keys(groups).map((k) => `<button data-g="${k}" aria-pressed="${k === 'all'}">${labels[k]}<sup>${TO.films.filter(groups[k]).length}</sup></button>`).join('');
    grid.innerHTML = TO.films.map((f, i) => card(f, '', i)).join('');
    rows.innerHTML = TO.films.map((f, i) => `<a class="row" href="film.html?f=${f.slug}" data-film="${f.slug}" data-img="${f.poster}"><span class="mono">${pad(i + 1)}</span><b>${esc(f.title)}</b><span class="mono hide-sm">${esc(f.format)}</span><span class="mono hide-sm">${esc(f.production.client || f.production.location || '—')}</span><span class="mono">${f.year}</span></a>`).join('');
    previews(grid);
    floatImage($$('.row', rows), (el) => el.dataset.img);
    const apply = (g) => {
      $$('#filters button').forEach((b) => b.setAttribute('aria-pressed', b.dataset.g === g));
      $$('[data-film]', grid).concat($$('[data-film]', rows)).forEach((el) => el.classList.toggle('is-hidden', !groups[g](TO.film(el.dataset.film))));
      $('#count').textContent = pad(TO.films.filter(groups[g]).length);
      if (hasGsap) gsap.fromTo($$('.card:not(.is-hidden)', grid), { opacity: 0, y: 30 }, { opacity: 1, y: 0, stagger: 0.04, duration: 0.7, ease: 'expo.out' });
      window.ScrollTrigger && ScrollTrigger.refresh();
    };
    $('#filters').addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) apply(b.dataset.g); });
    $$('[data-view]').forEach((b) => b.addEventListener('click', () => {
      const list = b.dataset.view === 'list';
      grid.classList.toggle('is-list', list);
      rows.classList.toggle('is-on', list);
      $$('[data-view]').forEach((o) => o.setAttribute('aria-pressed', o === b));
    }));
    if (location.hash === '#nonprofit') apply('nonprofit');
  }

  /* ---------------- FILM detail */
  function film() {
    const slug = new URLSearchParams(location.search).get('f') || location.hash.slice(1);
    const f = TO.film(slug) || TO.films[0];
    document.title = `${f.title} — Tell Ours Studio`;
    const next = TO.films[(f.index + 1) % TO.films.length];
    const meta = { Format: f.format, Year: f.year, Runtime: f.runtime, Client: f.production.client, Location: f.production.location };
    $('#main').innerHTML = `
      <section class="fhero" id="fhero">
        <div class="media"><img src="${f.poster}" alt="Still from ${esc(f.title)}" fetchpriority="high"><div class="vframe vframe--cover"></div></div>
        <div class="fhero__shade"></div>
        <div class="hero__top mono"><span><a href="work.html" class="tlink">← All films</a></span><span>${pad(f.index + 1)} / ${pad(TO.films.length)}</span></div>
        <div class="fhero__body">
          <div><span class="chip chip--ember">${esc(f.format)} · ${f.year}</span><h1 class="fhero__title" data-split>${esc(f.title)}</h1></div>
          <button class="play-orb" data-play="${f.slug}" data-cursor="Play" aria-label="Watch ${esc(f.title)}">
            <svg class="ring" viewBox="0 0 200 200" aria-hidden="true"><defs><path id="c2" d="M100,100 m-82,0 a82,82 0 1,1 164,0 a82,82 0 1,1 -164,0"/></defs><text><textPath href="#c2">Watch the film · Watch the film · Watch the film ·</textPath></text></svg>
            <span class="tri"></span>
          </button>
        </div>
      </section>
      <section class="sec sec--bone"><div class="wrap fbody">
        <div><div class="kicker mono"><span class="num">01</span><span>Synopsis</span><hr></div><p class="fbody__syn" data-reveal>${esc(f.synopsis)}</p></div>
        <div data-reveal><div class="kicker mono"><span class="num">02</span><span>Credits</span><hr></div>
          <dl class="creds">${Object.entries(meta).filter(([, v]) => v).map(([k, v]) => `<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join('')}${f.credits.map(([r, n]) => `<div><dt>${esc(r)}</dt><dd>${esc(n)}</dd></div>`).join('')}</dl>
        </div>
      </div></section>
      <section class="sec" style="padding-top:clamp(64px,8vw,120px)"><div class="wrap">
        <div class="kicker mono"><span class="num">03</span><span>The film</span><hr><span>Sound on</span></div>
        <div class="fplayer" id="fplayer" style="--ar:${f.aspect || '16 / 9'}" data-clip>
          <img src="${f.stills[1] && !/\.svg$/.test(f.stills[1]) ? f.stills[1] : f.poster}" alt="">
          <button class="play-orb" data-cursor="Play" aria-label="Play ${esc(f.title)} here"><span class="tri"></span></button>
        </div>
        ${f.stills.filter((s) => !/\.svg$/.test(s)).length > 1 ? `
        <div class="kicker mono" style="margin-top:96px"><span class="num">04</span><span>Selected frames</span><hr></div>
        <div class="stills">${f.stills.filter((s) => !/\.svg$/.test(s)).map((s) => `<div class="media" data-clip><img src="${s}" alt="Frame from ${esc(f.title)}" loading="lazy"></div>`).join('')}</div>` : ''}
      </div></section>
      <a class="next" href="film.html?f=${next.slug}" data-cursor="Next">
        <div class="media"><img src="${next.poster}" alt="" loading="lazy"></div>
        <div class="next__body"><span class="mono">Next film · ${pad(next.index + 1)}</span><span class="big" style="margin-top:16px">${esc(next.short || next.title)}</span><span class="tlink" style="margin-top:24px">Keep watching <span class="arrow">→</span></span></div>
      </a>`;
    Vimeo.mountBg($('#fhero .vframe'), f.vimeo, ratioOf(f));
    $('#fplayer .play-orb').addEventListener('click', () => {
      $('#fplayer').innerHTML = `<iframe src="${Vimeo.src(f.vimeo, { autoplay: true })}" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen title="${esc(f.title)}"></iframe>`;
      const bg = $('#fhero .vframe'); bg._player && bg._player.pause().catch(() => {});
    });
    const t = $('[data-split]');
    if (hasGsap) gsap.from(splitChars(t), { yPercent: 100, opacity: 0, stagger: 0.025, duration: 1.1, ease: 'expo.out', delay: 0.2 });
  }

  /* ---------------- ABOUT bios */
  function about() {
    const box = $('#team');
    if (!box || !TO.team) return;
    box.innerHTML = TO.team.map((p, i) => `<button class="person" data-i="${i}" data-cursor="Read" data-reveal><div class="media"><img src="${p.img}" alt="${esc(p.name)}" loading="lazy"></div><span class="mono">${pad(i + 1)} · ${esc(p.role)}</span><h3>${esc(p.name)}</h3><p>${esc(p.blurb)}</p></button>`).join('');
    document.body.insertAdjacentHTML('beforeend', `<div class="bio" id="bio" role="dialog" aria-modal="true" aria-label="Team bio"><div class="media"><img alt=""></div><div class="bio__body"></div><button class="theater__close" aria-label="Close bio">✕</button></div>`);
    const bio = $('#bio');
    const close = () => { bio.classList.remove('is-open'); lenis?.start(); document.body.style.overflow = ''; };
    box.addEventListener('click', (e) => {
      const b = e.target.closest('.person'); if (!b) return;
      const p = TO.team[+b.dataset.i];
      $('img', bio).src = p.img; $('img', bio).alt = p.name;
      $('.bio__body', bio).innerHTML = `<span class="mono" style="color:var(--ember-deep)">${esc(p.role)}</span><h2>${esc(p.name)}</h2>${p.bio.map((t) => `<p>${esc(t)}</p>`).join('')}`;
      bio.classList.add('is-open'); lenis?.stop(); document.body.style.overflow = 'hidden';
      $('.theater__close', bio).focus();
    });
    $('.theater__close', bio).addEventListener('click', close);
    addEventListener('keydown', (e) => e.key === 'Escape' && bio.classList.contains('is-open') && close());
  }

  /* ---------------- ACADEMY week bar */
  function academy() {
    phones();
    const A = TO.academy, st = $('#stations'), wk = $('#weeks'), bar = $('#weekbar');
    if (!st) return;
    const col = { story: 'var(--ember)', camera: 'var(--volt)', lighting: 'var(--bone)', editing: '#c7bfb0' };
    st.innerHTML = A.stations.map((s, i) => `<button class="station${i === 0 ? ' is-on' : ''}" role="tab" aria-selected="${i === 0}" data-s="${s.id}"><div><span class="mono">Station · Weeks ${s.number}</span><div class="weeks">${s.number}</div></div><div><b>${esc(s.label)}</b><p style="margin:10px 0 0">${esc(s.summary)}</p><p class="mono" style="margin:14px 0 0;text-transform:none;letter-spacing:0;opacity:.75">Outcome — ${esc(s.outcome)}</p></div></button>`).join('');
    bar.innerHTML = A.weeks.map((w) => `<span style="background:${col[w.station]}" data-s="${w.station}">${w.week}</span>`).join('');
    const show = (id) => {
      $$('.station', st).forEach((b) => { const on = b.dataset.s === id; b.classList.toggle('is-on', on); b.setAttribute('aria-selected', on); });
      $$('span', bar).forEach((s) => (s.style.opacity = s.dataset.s === id ? 1 : 0.28));
      wk.innerHTML = A.weeks.filter((w) => w.station === id).map((w) => `<div class="week"><span class="mono ember">Week ${w.week}</span><b>${esc(w.title)}</b><div><span class="mono">Learn</span><p>${esc(w.learn)}</p></div><div><span class="mono">Make</span><p>${esc(w.make)}</p></div></div>`).join('');
      if (hasGsap) gsap.from($$('.week', wk), { opacity: 0, y: 24, stagger: 0.07, duration: 0.7, ease: 'expo.out' });
    };
    st.addEventListener('click', (e) => { const b = e.target.closest('.station'); if (b) show(b.dataset.s); });
    show('story');
    if (hasGsap && window.ScrollTrigger) gsap.from($$('span', bar), { scaleY: 0, transformOrigin: 'bottom', stagger: 0.05, duration: 0.6, ease: 'back.out(2)', scrollTrigger: { trigger: bar, start: 'top 90%' } });
  }

  /* ---------------- CONTACT: compose an email (static hosting has no form backend) */
  function contact() {
    const form = $('#project-form');
    if (!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const d = new FormData(form);
      const body = `Name: ${d.get('name')}\nOrganization: ${d.get('org') || '—'}\nEmail: ${d.get('email')}\nBudget: ${d.get('budget') || 'Not sure yet'}\n\n${d.get('message')}`;
      const action = form.getAttribute('action');
      if (action && action.startsWith('http')) { form.submit(); return; }
      location.href = `mailto:${TO.studio.email}?subject=${encodeURIComponent('New project — ' + (d.get('org') || d.get('name')))}&body=${encodeURIComponent(body)}`;
      $('#form-note').textContent = 'Your email app should open with the details filled in. If it doesn’t, write to ' + TO.studio.email + '.';
    });
  }

  /* ------------------------------------------------------------ boot */
  chrome();
  grain();
  cursor();
  smooth();
  theaterBind();
  ({ home, work, film, about, academy, contact, services: caps }[page] || (() => {}))();
  if (page !== 'home') { bands(); manifesto(); }
  reveals();
  copyEmail();
  closing();
  if (page !== 'home') studioPan();
  addEventListener('load', () => window.ScrollTrigger && ScrollTrigger.refresh());
})();
