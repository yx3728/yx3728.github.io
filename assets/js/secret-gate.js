(function(){
  function normalizeAnswer(text){
    return (text || "").toString().trim().toLowerCase();
  }

  function askQuestions(questions){
    for(var i=0;i<questions.length;i++){
      var item = questions[i];
      var reply = window.prompt(item.q + "\n(提示: 不区分大小写)");
      if(normalizeAnswer(reply) !== normalizeAnswer(item.a)){
        return false;
      }
    }
    return true;
  }

  function goToDiary(){
    var cfg = window.SECRET_GATE || {redirect: '/diary/'};
    try {
      sessionStorage.setItem('secret_gate_pass', '1');
    } catch(e) {}
    window.location.href = cfg.redirect || '/diary/';
  }

  function ensureNavEntry(){
    var cfg = window.SECRET_GATE || {};
    var label = cfg.title || '🔒';
    var nav = document.querySelector('#site-nav .visible-links');
    if(!nav) return;
    if(nav.querySelector('[data-secret-gate]')) return;
    var li = document.createElement('li');
    li.className = 'masthead__menu-item';
    var a = document.createElement('a');
    a.href = 'javascript:void(0)';
    a.setAttribute('data-secret-gate','1');
    a.textContent = label + ' Secret';
    a.addEventListener('click', function(){
      var qs = (cfg.questions || []);
      if(qs.length === 0 || askQuestions(qs)){
        goToDiary();
      } else {
        alert('回答不正确，再试一次!');
      }
    });
    li.appendChild(a);
    nav.appendChild(li);
  }

  function protectDiary(){
    var isDiaryPath = /^\/diary(\/|$)/.test(window.location.pathname);
    if(!isDiaryPath) return;
    try {
      var ok = sessionStorage.getItem('secret_gate_pass') === '1';
      if(!ok){
        // If user hit the page directly, ask questions once
        var cfg = window.SECRET_GATE || {};
        if(cfg.questions && cfg.questions.length){
          if(askQuestions(cfg.questions)){
            sessionStorage.setItem('secret_gate_pass','1');
            return; // allow view
          }
        }
        window.location.replace('/');
      }
    } catch(e) {}
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', function(){
      ensureNavEntry();
      protectDiary();
    });
  } else {
    ensureNavEntry();
    protectDiary();
  }
})();

