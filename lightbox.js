(function () {
  var lightbox = document.querySelector('.lightbox');
  if (!lightbox) return;

  var lightboxImg = lightbox.querySelector('img');
  var closeBtn = lightbox.querySelector('.lightbox-close');
  var prevBtn = lightbox.querySelector('.lightbox-prev');
  var nextBtn = lightbox.querySelector('.lightbox-next');

  var currentIndex = -1;

  // Query fresh each time so items rendered dynamically by gallery.js
  // (after this script runs) are always included.
  function getItems() {
    return Array.prototype.slice.call(
      document.querySelectorAll('.gallery-item, .collage-item')
    );
  }

  function show(index) {
    var items = getItems();
    if (!items.length) return;
    // Wrap around at both ends so the arrows never dead-end.
    if (index < 0) index = items.length - 1;
    if (index >= items.length) index = 0;
    currentIndex = index;
    var item = items[index];
    var img = item.querySelector('img');
    lightboxImg.src = item.getAttribute('href');
    lightboxImg.alt = img ? img.alt : '';
  }

  function openLightbox(index) {
    show(index);
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    lightboxImg.src = '';
    document.body.style.overflow = '';
    currentIndex = -1;
  }

  // Delegated click: works for current and future gallery items.
  document.addEventListener('click', function (e) {
    var item = e.target.closest && e.target.closest('.gallery-item, .collage-item');
    if (!item) return;
    e.preventDefault();
    var index = getItems().indexOf(item);
    if (index !== -1) openLightbox(index);
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      show(currentIndex - 1);
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      show(currentIndex + 1);
    });
  }

  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });

  closeBtn.addEventListener('click', closeLightbox);

  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeLightbox();
    else if (e.key === 'ArrowLeft') show(currentIndex - 1);
    else if (e.key === 'ArrowRight') show(currentIndex + 1);
  });
})();
