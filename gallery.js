(function () {
  // Renders folder/manifest-driven galleries from photos.json.
  // A container opts in with:  <div class="js-gallery" data-gallery="game"></div>
  // It gets a Payday block (data.payday) pinned first, then the collage
  // (data.collage). Markup mirrors the original hand-authored collage so
  // styles.css and lightbox.js keep working unchanged.
  var mounts = Array.prototype.slice.call(
    document.querySelectorAll('.js-gallery[data-gallery]')
  );
  if (!mounts.length) return;

  function itemHTML(entry, opts) {
    var src = entry.src;
    var alt = (entry.alt || entry.caption || '').replace(/"/g, '&quot;');
    var cap = entry.caption || '';
    // Optional responsive support: manifest may supply `srcset` + `sizes`.
    var srcset = entry.srcset ? ' srcset="' + entry.srcset + '"' : '';
    var sizes = entry.sizes ? ' sizes="' + entry.sizes + '"' : '';
    // The first few tiles are above the fold; the rest lazy-load.
    var loadAttr = opts && opts.eager ? '' : ' loading="lazy"';
    // No target="_blank": the lightbox handles clicks; if JS ever fails the
    // link opens in the same tab (never a jarring new tab on mobile).
    return (
      '<a class="collage-item" href="' + src + '">' +
        '<img src="' + src + '"' + srcset + sizes + ' alt="' + alt + '"' +
          loadAttr + ' decoding="async" />' +
        '<span class="collage-caption">' + cap + '</span>' +
      '</a>'
    );
  }

  function render(mount, data) {
    if (!data) return;
    // The best-* folder picks (data.payday) sit across the TOP in a row-based
    // grid (top 8 = 4 columns x 2 rows on desktop); the rest render below as
    // the original masonry collage, unchanged.
    var top = data.payday || [];
    var rest = data.collage || [];
    var html = '';

    if (top.length) {
      html += '<div class="gallery-top">' +
                top.map(function (e, i) {
                  return itemHTML(e, { eager: i < 8 });
                }).join('') +
              '</div>';
    }

    html += '<div class="collage">' +
              rest.map(function (e) { return itemHTML(e); }).join('') +
            '</div>';

    mount.innerHTML = html;
  }

  fetch('photos.json', { cache: 'no-cache' })
    .then(function (r) {
      if (!r.ok) throw new Error('photos.json ' + r.status);
      return r.json();
    })
    .then(function (manifest) {
      mounts.forEach(function (mount) {
        render(mount, manifest[mount.getAttribute('data-gallery')]);
      });
    })
    .catch(function (err) {
      // On failure, leave the <noscript>/fallback markup already in the DOM.
      if (window.console) console.error('gallery.js:', err);
    });
})();
