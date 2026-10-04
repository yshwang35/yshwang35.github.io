// Image slots: <img data-src="assets/papers/foo"> loads the first of foo.png, foo.jpg, ... that exists.
// If none exists yet, the <img> is removed and the text placeholder underneath stays visible,
// so adding a figure or logo only means dropping a file with the right name into the folder.
(function () {
  var EXTS = ['png', 'jpg', 'jpeg', 'webp', 'gif', 'svg'];

  document.querySelectorAll('img[data-src]').forEach(function (img) {
    var i = 0;

    function next() {
      if (i === EXTS.length) {
        img.remove();
        return;
      }
      img.src = img.getAttribute('data-src') + '.' + EXTS[i++];
    }

    img.addEventListener('error', next);
    img.addEventListener('load', function () {
      var slot = img.closest('.thumb, .logo');
      if (slot) slot.classList.add('loaded');

      // Paper figures open full size on click
      if (img.closest('.thumb') && !img.closest('a')) {
        var link = document.createElement('a');
        link.href = img.src;
        link.target = '_blank';
        link.rel = 'noopener';
        img.parentNode.insertBefore(link, img);
        link.appendChild(img);
      }
    }, { once: true });

    next();
  });
})();

// Theme toggle: flips light/dark and remembers the choice.
// Until the visitor picks one, the page keeps following the OS setting.
(function () {
  var root = document.documentElement;
  var button = document.getElementById('theme-toggle');
  var media = window.matchMedia('(prefers-color-scheme: dark)');

  function savedTheme() {
    try { return localStorage.getItem('theme'); } catch (e) { return null; }
  }

  function apply(theme) {
    root.setAttribute('data-theme', theme);
    var label = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
    button.setAttribute('aria-label', label);
    button.title = label;
  }

  apply(root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');
  button.hidden = false;

  button.addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    apply(next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  media.addEventListener('change', function (e) {
    if (!savedTheme()) apply(e.matches ? 'dark' : 'light');
  });
})();

// "Show all" lists: rows marked .extra stay hidden until the visitor expands the list.
(function () {
  document.querySelectorAll('[data-collapsible]').forEach(function (list) {
    var button = list.querySelector('.show-all');
    list.classList.add('collapsed');
    button.hidden = false;
    button.addEventListener('click', function () {
      var collapsed = list.classList.toggle('collapsed');
      button.textContent = collapsed ? 'Show all' : 'Show less';
      button.setAttribute('aria-expanded', String(!collapsed));
    });
  });
})();
