(function () {
  var STORAGE_KEY = 'preferred_language';
  var SUPPORTED = ['en', 'zh'];

  function normalizeLang(lang) {
    if (!lang) return 'en';
    var lower = lang.toLowerCase();
    if (lower.indexOf('zh') === 0) {
      return 'zh';
    }
    return 'en';
  }

  function detectDefaultLanguage() {
    var stored = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      stored = null;
    }
    if (stored && SUPPORTED.indexOf(stored) >= 0) {
      return stored;
    }

    var browserLang =
      (navigator && (navigator.language || navigator.userLanguage)) ||
      (Intl && Intl.DateTimeFormat().resolvedOptions().locale) ||
      'en';
    return normalizeLang(browserLang);
  }

  function persistLanguage(lang) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      // ignore storage errors
    }
  }

  function updateDocumentLanguage(lang) {
    var body = document.body;
    if (!body) return;
    if (SUPPORTED.indexOf(lang) === -1) {
      lang = 'en';
    }
    body.setAttribute('data-lang-active', lang);
    document.documentElement.setAttribute('lang', lang === 'zh' ? 'zh-Hans' : 'en');
    updateToggleLabel(lang);
  }

  function updateToggleLabel(activeLang) {
    var toggle = document.getElementById('language-toggle');
    if (!toggle) return;
    if (activeLang === 'zh') {
      toggle.textContent = '中文 / EN';
    } else {
      toggle.textContent = 'EN / 中文';
    }
  }

  function initToggle() {
    var activeLang = detectDefaultLanguage();
    updateDocumentLanguage(activeLang);

    var toggle = document.getElementById('language-toggle');
    if (!toggle) {
      return;
    }

    toggle.addEventListener('click', function () {
      activeLang = activeLang === 'en' ? 'zh' : 'en';
      persistLanguage(activeLang);
      updateDocumentLanguage(activeLang);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initToggle);
  } else {
    initToggle();
  }
})();

