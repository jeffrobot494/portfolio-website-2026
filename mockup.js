/* Mockup behaviour. The backdrop switcher + starfield + grain at the
   bottom are scaffolding for step two and get deleted in the rewrite. */
document.addEventListener('DOMContentLoaded', function () {

  /* ── Solar Defense Force: click-to-play gameplay ──────────── */
  var sdfVideo = document.getElementById('sdfVideo');
  var sdfPlay = document.getElementById('sdfPlay');
  var sdfStatus = document.getElementById('sdfVideoStatus');
  sdfVideo.controls = false;
  sdfPlay.hidden = false;
  sdfVideo.addEventListener('ended', function () {
    var hadFocus = document.activeElement === sdfVideo;
    sdfVideo.controls = false;
    sdfVideo.load(); // Reset playback and show the title poster again.
    sdfPlay.hidden = false;
    sdfPlay.disabled = false;
    if (hadFocus) sdfPlay.focus();
  });
  sdfPlay.addEventListener('click', async function () {
    sdfPlay.disabled = true;
    sdfStatus.textContent = '';
    try {
      await sdfVideo.play();
      sdfPlay.hidden = true;
      sdfVideo.controls = true;
      sdfVideo.focus();
    } catch (error) {
      sdfStatus.textContent = 'The video could not start. Please try again.';
    } finally {
      sdfPlay.disabled = false;
    }
  });

  /* ── Epsilon IV: tabbed process panels ─────────────────────── */
  var tabs = document.querySelectorAll('.tab');
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) { t.setAttribute('aria-selected', 'false'); });
      tab.setAttribute('aria-selected', 'true');
      document.querySelectorAll('.panel').forEach(function (p) {
        p.setAttribute('data-active', p.id === tab.dataset.panel ? 'true' : 'false');
      });
    });
  });

  /* ── Interdimensional: picks drive the media swap ──────────── */
  var picks = document.querySelectorAll('#idPicks .pick');
  var swaps = document.querySelectorAll('#idSwap img');
  picks.forEach(function (pick) {
    pick.addEventListener('click', function () {
      var i = Number(pick.dataset.i);
      picks.forEach(function (p) { p.setAttribute('aria-selected', 'false'); });
      pick.setAttribute('aria-selected', 'true');
      swaps.forEach(function (img, j) {
        img.setAttribute('data-active', i === j ? 'true' : 'false');
      });
    });
  });

  /* ── War for the Stars: alien-glyph flicker ────────────────── */
  var flickerCount = 0;
  function toggleLanguage() {
    var en = document.querySelectorAll('.card-fan .english-text');
    var al = document.querySelectorAll('.card-fan .alien-text');
    if (!en.length) return;
    en.forEach(function (el) { el.style.display = 'none'; });
    al.forEach(function (el) { el.style.display = 'block'; });
    setTimeout(function () {
      en.forEach(function (el) { el.style.display = 'block'; });
      al.forEach(function (el) { el.style.display = 'none'; });
      decideNextFlicker();
    }, Math.random() * 400 + 100);
  }
  function decideNextFlicker() {
    flickerCount++;
    if (flickerCount === 1 && Math.random() < 0.5) {
      return setTimeout(toggleLanguage, Math.random() * 75 + 75);
    }
    if (flickerCount === 2 && Math.random() < 0.25) {
      return setTimeout(toggleLanguage, Math.random() * 50 + 50);
    }
    flickerCount = 0;
    setTimeout(toggleLanguage, Math.random() * 1500 + 1500);
  }
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    setTimeout(toggleLanguage, Math.random() * 1000 + 1000);
  }

  /* ══ SCAFFOLDING BELOW — delete once a backdrop is chosen ════ */

  var body = document.body;
  var sw = document.getElementById('switcher');

  document.getElementById('switcherToggle').addEventListener('click', function () {
    sw.dataset.open = sw.dataset.open === 'true' ? 'false' : 'true';
  });

  document.querySelectorAll('.switcher-body [data-bd]').forEach(function (b) {
    b.addEventListener('click', function () {
      body.dataset.bd = b.dataset.bd;
      document.querySelectorAll('.switcher-body [data-bd]').forEach(function (o) {
        o.setAttribute('aria-pressed', o === b ? 'true' : 'false');
      });
    });
  });

  var grainToggle = document.getElementById('grainToggle');
  grainToggle.addEventListener('click', function () {
    var on = body.dataset.grain === 'on';
    body.dataset.grain = on ? 'off' : 'on';
    grainToggle.setAttribute('aria-pressed', on ? 'false' : 'true');
  });

  /* film grain tile */
  (function () {
    var S = 128, c = document.createElement('canvas');
    c.width = c.height = S;
    var x = c.getContext('2d'), img = x.createImageData(S, S);
    for (var i = 0; i < img.data.length; i += 4) {
      var v = 110 + Math.random() * 90;
      img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
      img.data[i + 3] = 255;
    }
    x.putImageData(img, 0, 0);
    var L = document.getElementById('bdGrain');
    L.style.backgroundImage = 'url(' + c.toDataURL() + ')';
    L.style.backgroundRepeat = 'repeat';
  })();

  /* starfield */
  (function () {
    var cv = document.getElementById('bdStars'), ctx = cv.getContext('2d');
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var stars = [], w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
    function size() {
      w = window.innerWidth; h = window.innerHeight;
      cv.width = w * dpr; cv.height = h * dpr;
      cv.style.width = w + 'px'; cv.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var n = Math.round(w * h * 0.00012);
      stars = [];
      for (var i = 0; i < n; i++) stars.push({
        x: Math.random() * w, y: Math.random() * h, z: Math.random(),
        r: 0.35 + Math.random() * 0.85, a: 0.15 + Math.random() * 0.5
      });
      draw();
    }
    function draw() {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = '#cfe4f2';
      for (var i = 0; i < stars.length; i++) {
        var s = stars[i];
        ctx.globalAlpha = s.a;
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, 6.2832); ctx.fill();
      }
      ctx.globalAlpha = 1;
    }
    function tick() {
      for (var i = 0; i < stars.length; i++) {
        var s = stars[i];
        s.y -= 0.04 + s.z * 0.10;
        if (s.y < 0) { s.y = h; s.x = Math.random() * w; }
      }
      draw();
      requestAnimationFrame(tick);
    }
    size();
    window.addEventListener('resize', size);
    if (!reduce) requestAnimationFrame(tick);
  })();

  /* accent wash follows whichever project card is in view */
  (function () {
    var cards = document.querySelectorAll('.pcard[style*="--accent"]');
    if (!('IntersectionObserver' in window) || !cards.length) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var a = e.target.style.getPropertyValue('--accent').trim();
        if (a) document.documentElement.style.setProperty('--page-accent', a);
      });
    }, { rootMargin: '-45% 0px -45% 0px' });
    cards.forEach(function (c) { io.observe(c); });
  })();

});
