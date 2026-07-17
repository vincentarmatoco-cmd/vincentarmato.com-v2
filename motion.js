(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var supportsIO = 'IntersectionObserver' in window;

  /* ---------- Navbar: transparent at top, solid after scroll ---------- */

  var topbar = document.querySelector('.topbar-wrap');

  function updateNav() {
    if (topbar) topbar.classList.toggle('is-scrolled', window.scrollY > 24);
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  /* ---------- Scroll reveals ---------- */

  // Gallery pages: collage items opt in automatically with a light stagger.
  var collageItems = document.querySelectorAll('.collage-item');
  collageItems.forEach(function (el, i) {
    el.setAttribute('data-reveal', '');
    el.style.setProperty('--reveal-delay', (i % 4) * 80 + 'ms');
  });

  // Grouped reveals stagger their children.
  document.querySelectorAll('[data-reveal-group]').forEach(function (group) {
    var children = group.querySelectorAll('[data-reveal]');
    children.forEach(function (el, i) {
      el.style.setProperty('--reveal-delay', Math.min(i * 100, 500) + 'ms');
    });
  });

  var revealEls = document.querySelectorAll('[data-reveal]');

  if (supportsIO && !reduceMotion) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -5% 0px' });

    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- Hero video: play only while on screen ---------- */

  var heroVideo = document.querySelector('.hero-video');

  function playHero() {
    var playing = heroVideo.play();
    if (playing && playing.catch) playing.catch(function () {});
  }

  function heroInView() {
    var rect = heroVideo.getBoundingClientRect();
    var visible = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
    return visible / rect.height >= 0.3;
  }

  if (heroVideo) {
    if (supportsIO) {
      var videoObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.intersectionRatio >= 0.3) {
            playHero();
          } else if (!entry.isIntersecting) {
            heroVideo.pause();
          }
        });
      }, { threshold: [0, 0.3] });

      videoObserver.observe(heroVideo);
    }

    // Resume after tab switches; browsers pause background video.
    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'visible' && heroInView()) playHero();
    });
  }

  /* ---------- Scene-strip video tiles: play in view, pause off ---------- */
  // The autoplay attribute alone is unreliable for below-fold video (data
  // saver, low power mode); drive playback from visibility instead.

  var sceneVideos = document.querySelectorAll('.scene-photo video');

  if (sceneVideos.length && supportsIO) {
    var sceneVideoObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var vid = entry.target;
        if (entry.isIntersecting) {
          var p = vid.play();
          if (p && p.catch) p.catch(function () {});
        } else if (!vid.paused) {
          vid.pause();
        }
      });
    }, { threshold: 0.25 });

    sceneVideos.forEach(function (v) { sceneVideoObserver.observe(v); });
  }

  /* ---------- Gallery video pages: pause players that scroll away ---------- */

  var players = document.querySelectorAll('.video-featured video, .video-card video');

  if (players.length && supportsIO) {
    var playerObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting && !entry.target.paused) entry.target.pause();
      });
    }, { threshold: 0 });

    players.forEach(function (v) { playerObserver.observe(v); });
  }

  /* ---------- Subtle parallax (scene strips) ---------- */

  var parallaxItems = [];

  if (!reduceMotion) {
    document.querySelectorAll('[data-parallax]').forEach(function (el) {
      var target = el.tagName === 'IMG' ? el : el.querySelector('img');
      if (!target) return;
      parallaxItems.push({
        wrap: el,
        target: target,
        amount: parseFloat(el.getAttribute('data-parallax')) || -30
      });
    });
  }

  var parallaxScheduled = false;

  function updateParallax() {
    parallaxScheduled = false;
    var vh = window.innerHeight;
    parallaxItems.forEach(function (item) {
      var rect = item.wrap.getBoundingClientRect();
      if (rect.bottom < -100 || rect.top > vh + 100) return;
      // -0.5 .. 0.5 as the element travels through the viewport
      var ratio = (rect.top + rect.height / 2 - vh / 2) / (vh + rect.height);
      var y = (ratio * -2 * item.amount).toFixed(2);
      item.target.style.transform =
        'translate3d(0, ' + y + 'px, 0) scale(var(--parallax-scale, 1))';
    });
  }

  function requestParallax() {
    if (!parallaxScheduled && parallaxItems.length) {
      parallaxScheduled = true;
      requestAnimationFrame(updateParallax);
    }
  }

  if (parallaxItems.length) {
    window.addEventListener('scroll', requestParallax, { passive: true });
    window.addEventListener('resize', requestParallax);
    requestParallax();
  }

})();
