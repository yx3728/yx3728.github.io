(function () {
  function resetNav() {
    var nav = document.getElementById('site-nav');
    if (!nav) return;

    var btn = nav.querySelector('button');
    var visible = nav.querySelector('.visible-links');
    var hidden = nav.querySelector('.hidden-links');

    if (hidden && visible) {
      while (hidden.firstElementChild) {
        visible.appendChild(hidden.firstElementChild);
      }
      hidden.classList.add('hidden');
    }

    if (btn) {
      btn.classList.add('hidden');
      btn.classList.remove('close');
      btn.setAttribute('aria-hidden', 'true');
    }
  }

  function init() {
    resetNav();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.addEventListener('resize', resetNav);
})();

