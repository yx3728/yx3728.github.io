(function(){
  // 从配置获取验证有效期
  function getVerificationDuration(){
    var cfg = window.SECRET_GATE || {};
    var duration = cfg.verification_duration || 24; // 默认24小时
    if(duration === 0) return 0; // 0表示永久有效
    return duration * 60 * 60 * 1000; // 转换为毫秒
  }
  
  const VERIFICATION_DURATION = getVerificationDuration();
  
  function normalizeAnswer(text){
    return (text || "").toString().trim().toLowerCase();
  }

  function askQuestions(questions){
    for(var i=0;i<questions.length;i++){
      var item = questions[i];
      var reply = window.prompt(item.q + "\n(提示: 不区分大小写)");
      if(reply === null){
        return null; // User cancelled
      }
      if(normalizeAnswer(reply) !== normalizeAnswer(item.a)){
        return false;
      }
    }
    return true;
  }

  function setVerificationPass(){
    try {
      console.log('🔐 设置验证通过状态...');
      console.log('VERIFICATION_DURATION:', VERIFICATION_DURATION);
      
      sessionStorage.setItem('secret_gate_pass', '1');
      localStorage.setItem('secret_gate_pass', '1');
      console.log('✅ 已设置 secret_gate_pass = 1');
      
      // 如果不是永久有效，设置过期时间
      if(VERIFICATION_DURATION > 0) {
        const now = new Date().getTime();
        const expiryTime = now + VERIFICATION_DURATION;
        sessionStorage.setItem('secret_gate_pass', '1');
        sessionStorage.setItem('secret_gate_expiry', expiryTime.toString());
        localStorage.setItem('secret_gate_pass', '1');
        localStorage.setItem('secret_gate_expiry', expiryTime.toString());
        console.log('⏰ 设置过期时间:', new Date(expiryTime).toLocaleString());
      } else {
        console.log('♾️ 设置为永久有效');
      }
    } catch(e) {
      console.warn('Failed to set verification pass:', e);
    }
  }

  function isVerificationValid(){
    try {
      console.log('🔍 检查验证状态...');
      console.log('VERIFICATION_DURATION:', VERIFICATION_DURATION);
      
      // 检查sessionStorage（当前会话）
      const sessionPass = sessionStorage.getItem('secret_gate_pass');
      console.log('sessionStorage secret_gate_pass:', sessionPass);
      if(sessionPass === '1') {
        console.log('✅ sessionStorage验证通过');
        return true;
      }
      
      // 检查localStorage（跨会话）
      const localPass = localStorage.getItem('secret_gate_pass');
      const localExpiry = localStorage.getItem('secret_gate_expiry');
      console.log('localStorage secret_gate_pass:', localPass);
      console.log('localStorage secret_gate_expiry:', localExpiry);
      
      if(localPass === '1') {
        // 如果是永久有效（VERIFICATION_DURATION为0）
        if(VERIFICATION_DURATION === 0) {
          console.log('✅ 永久有效验证通过');
          // 同步到sessionStorage
          sessionStorage.setItem('secret_gate_pass', '1');
          return true;
        }
        
        // 检查是否过期
        if(localExpiry) {
          const now = new Date().getTime();
          const expiry = parseInt(localExpiry);
          console.log('当前时间:', now, '过期时间:', expiry);
          
          if(now < expiry) {
            console.log('✅ localStorage验证通过，未过期');
            // 验证仍然有效，同步到sessionStorage
            sessionStorage.setItem('secret_gate_pass', '1');
            sessionStorage.setItem('secret_gate_expiry', expiry.toString());
            return true;
          } else {
            console.log('❌ 验证已过期，清除状态');
            // 验证已过期，清除
            localStorage.removeItem('secret_gate_pass');
            localStorage.removeItem('secret_gate_expiry');
          }
        }
      }
      
      console.log('❌ 验证未通过');
      return false;
    } catch(e) {
      console.warn('Failed to check verification:', e);
      return false;
    }
  }

  function goToDiary(){
    var cfg = window.SECRET_GATE || {redirect: '/diary/'};
    setVerificationPass();
    window.location.href = cfg.redirect || '/diary/';
  }

  function ensureNavEntry(){
    var cfg = window.SECRET_GATE || {};
    var label = cfg.title || '🔒';
    var nav = document.querySelector('#site-nav .visible-links');
    if(!nav) return;
    
    // 检查是否已存在验证入口
    var existingEntry = nav.querySelector('[data-secret-gate]');
    if(existingEntry) {
      // 如果已存在，更新显示状态
      updateNavEntryStatus(existingEntry);
      return;
    }
    
    // 创建新的验证入口
    var li = document.createElement('li');
    li.className = 'masthead__menu-item';
    var a = document.createElement('a');
    a.href = 'javascript:void(0)';
    a.setAttribute('data-secret-gate','1');
    a.textContent = label + ' Secret';
    a.setAttribute('role','button');
    a.setAttribute('aria-label','Open secret gate');
    
    // 添加验证状态指示器
    var statusIndicator = document.createElement('span');
    statusIndicator.className = 'verification-status-indicator';
    statusIndicator.style.cssText = 'margin-left: 5px; font-size: 0.8em;';
    a.appendChild(statusIndicator);
    
    a.addEventListener('click', function(){
      var qs = (cfg.questions || []);
      if(qs.length === 0){
        goToDiary();
        return;
      }
      var result = askQuestions(qs);
      if(result === true){
        goToDiary();
      } else if(result === false){
        alert('回答不正确，再试一次!');
      }
      // If result is null, user cancelled, do nothing
    });
    a.addEventListener('keydown', function(e){
      if(e.key === 'Enter' || e.key === ' '){
        e.preventDefault();
        a.click();
      }
    });
    li.appendChild(a);
    nav.appendChild(li);
    
    // 初始化状态显示
    updateNavEntryStatus(a);
  }
  
  function updateNavEntryStatus(navEntry){
    var statusIndicator = navEntry.querySelector('.verification-status-indicator');
    if(!statusIndicator) return;
    
    if(isVerificationValid()) {
      navEntry.style.color = '#28a745';
      navEntry.style.fontWeight = '600';
      statusIndicator.textContent = '✓';
      statusIndicator.style.color = '#28a745';
      navEntry.title = '验证已通过，点击进入日记';
    } else {
      navEntry.style.color = '';
      navEntry.style.fontWeight = '';
      statusIndicator.textContent = '🔒';
      statusIndicator.style.color = '#dc3545';
      navEntry.title = '点击验证进入日记';
    }
  }

  function protectDiary(){
    var isDiaryPath = /^\/diary(\/|$)/.test(window.location.pathname);
    
    // 如果验证通过，允许访问diary页面
    if(isVerificationValid()) {
      return;
    }
    
    // 如果验证未通过且试图访问diary页面，重定向到首页
    if(isDiaryPath) {
      window.location.href = '/';
    }
  }

  function showVerificationStatus(){
    // 更新导航栏状态
    var navEntry = document.querySelector('[data-secret-gate]');
    if(navEntry) {
      updateNavEntryStatus(navEntry);
    }
    
    // 在diary页面显示验证状态
    var verificationStatus = document.getElementById('diary-verification-status');
    if(verificationStatus) {
      if(isVerificationValid()) {
        verificationStatus.style.display = 'block';
        
        // 动态更新验证状态文本
        var durationText = document.getElementById('verification-duration-text');
        if(durationText) {
          var cfg = window.SECRET_GATE || {};
          var duration = cfg.verification_duration || 24;
          if(duration === 0) {
            durationText.textContent = '永久有效，无需重复验证';
          } else {
            durationText.textContent = duration + '小时内无需重复验证';
          }
        }
      } else {
        verificationStatus.style.display = 'none';
      }
    }
    
    // 兼容旧的diary-gate元素
    var diaryGate = document.getElementById('diary-gate');
    if(diaryGate) {
      diaryGate.style.display = 'none';
    }
  }

  // 清除验证状态
  window.clearVerification = function(){
    try {
      sessionStorage.removeItem('secret_gate_pass');
      sessionStorage.removeItem('secret_gate_expiry');
      localStorage.removeItem('secret_gate_pass');
      localStorage.removeItem('secret_gate_expiry');
      window.location.reload();
    } catch(e) {
      console.warn('Failed to clear verification:', e);
    }
  };

  // 页面加载完成后执行
  if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function(){
      ensureNavEntry();
      protectDiary();
      showVerificationStatus();
    });
  } else {
    ensureNavEntry();
    protectDiary();
    showVerificationStatus();
  }
  
  // 监听页面变化（适用于单页应用）
  if(typeof window.history !== 'undefined' && typeof window.history.pushState !== 'undefined') {
    var originalPushState = window.history.pushState;
    var originalReplaceState = window.history.replaceState;
    
    window.history.pushState = function() {
      originalPushState.apply(this, arguments);
      setTimeout(function() {
        showVerificationStatus();
      }, 100);
    };
    
    window.history.replaceState = function() {
      originalReplaceState.apply(this, arguments);
      setTimeout(function() {
        showVerificationStatus();
      }, 100);
    };
    
    window.addEventListener('popstate', function() {
      setTimeout(function() {
        showVerificationStatus();
      }, 100);
    });
  }
})();

