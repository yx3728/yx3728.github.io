---
permalink: /
# title: "Joey's Personal page"
excerpt: "About me"
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---
<section class="home-hero">
  <div class="lang lang-en">
    <h1>Hi, I’m Joey</h1>
    <p>This home base captures snapshots of my work, studies, and hobbies—from distributed backends and data pipelines to weekend game prototypes and piano riffs.</p>
    <p>It started as a tiny corner during my NC State days and still serves as a place to document, reflect, and share whatever I am building or learning.</p>
    <p>If you enjoy technology, curiosity, and creative expression, I hope these stories spark ideas. Feel free to say hi about engineering, music, or anything fun.</p>
  </div>
  <div class="lang lang-zh">
    <h1>嗨，我是 Joey</h1>
    <p>这里记录了我在分布式后端、数据管线、周末小游戏以及音乐灵感之间的点滴，既是学习笔记也是生活随记。</p>
    <p>这个站点诞生于我在 NC State 的一个小角落，如今依旧承担着“记录、思考、分享”的使命，也欢迎你随时留言交流。</p>
    <p>如果你也热爱技术与创意，希望这些故事和项目能带来灵感；想聊音乐、游戏或工程实践，随时欢迎。</p>
  </div>
</section>

<section class="home-experience">
  <h2>
    <span class="lang-inline lang-en">Experience</span>
    <span class="lang-inline lang-zh">经历</span>
  </h2>
  <article class="experience-card lang lang-en">
    <h3>Oracle · Software Engineer, Cloud Infrastructure & Platform</h3>
    <p class="text-muted">May 2024 – Dec 2024 · Redwood City, CA</p>
    <ul>
      <li>Optimized Oracle SaaS platform scalability, increasing application delivery speeds by roughly 20% across large enterprise workloads.</li>
      <li>Helped operate OCI services for 100K+ users with 99.9% uptime through reliability engineering, resilient migrations, and tighter monitoring.</li>
      <li>Designed CI/CD automation and incident runbooks that cut deployment time ~30% and reduced service downtime by about 8% during critical fixes.</li>
    </ul>
  </article>
  <article class="experience-card lang lang-zh">
    <h3>Oracle · 软件工程师（云基础设施与平台）</h3>
    <p class="text-muted">2024 年 5 月 – 2024 年 12 月 · 加州红木城</p>
    <ul>
      <li>调优 Oracle SaaS 平台的可扩展性，让大型客户的应用交付速度提升约 20%。</li>
      <li>与团队一起运维 10 万+ 用户的 OCI 服务，在迁移与上线期间保持 99.9% 可用性，并完善监控与演练流程。</li>
      <li>设计 CI/CD 自动化流程与事件响应手册，将部署时间缩短约 30%，关键事故的停机时间下降约 8%。</li>
    </ul>
  </article>
</section>

<section class="home-education">
  <h2>
    <span class="lang-inline lang-en">Education</span>
    <span class="lang-inline lang-zh">教育背景</span>
  </h2>
  <div class="lang lang-en">
    <p><strong>New York University</strong> — M.S. Computer Science, Brooklyn, NY (Aug 2024 – May 2026), GPA 4.0/4.0</p>
    <p><strong>North Carolina State University</strong> — B.S. Computer Science, Raleigh, NC (Aug 2019 – May 2024), GPA 3.8/4.0</p>
  </div>
  <div class="lang lang-zh">
    <p><strong>纽约大学（New York University）</strong> —— 计算机科学硕士，纽约布鲁克林（2024 年 8 月 – 2026 年 5 月），GPA 4.0/4.0</p>
    <p><strong>北卡罗来纳州立大学（NC State）</strong> —— 计算机科学学士，北卡罗来纳罗利（2019 年 8 月 – 2024 年 5 月），GPA 3.8/4.0</p>
  </div>
</section>

<section class="home-portfolio">
  <h2>
    <span class="lang-inline lang-en">Featured Projects</span>
    <span class="lang-inline lang-zh">精选项目</span>
  </h2>
  <p class="lang lang-en">Highlights from my recent work in scheduling, systems programming, and data engineering.</p>
  <p class="lang lang-zh">这里挑选了我在排课算法、系统编程与数据工程方面的近期开源实践，方便快速浏览。</p>
  <div class="project-grid">
    {% assign featured_projects = site.portfolio | sort: "title" %}
    {% for project in featured_projects limit:3 %}
    <article class="project-card">
      <h3><a href="{{ project.url | relative_url }}">{{ project.title }}</a></h3>
      <p class="project-card__subtitle">{{ project.excerpt | strip_html }}</p>
      <p>{{ project.content | markdownify | strip_html | truncate: 220 }}</p>
      <a class="btn" href="{{ project.url | relative_url }}">
        <span class="lang-inline lang-en">Read more</span>
        <span class="lang-inline lang-zh">了解更多</span>
      </a>
    </article>
    {% endfor %}
  </div>
  <p class="lang lang-en"><a href="{{ '/portfolio/' | relative_url }}">View the full portfolio →</a></p>
  <p class="lang lang-zh"><a href="{{ '/portfolio/' | relative_url }}">查看全部项目 →</a></p>
</section>

<section class="home-skills">
  <h2>
    <span class="lang-inline lang-en">Core Skills</span>
    <span class="lang-inline lang-zh">技能标签</span>
  </h2>
  <div class="lang lang-en">
    <p><strong>Languages:</strong> Java, SQL, Python, C, C++</p>
    <p><strong>Core Competencies:</strong> Distributed systems, REST API design, CI/CD pipelines, multithreading, rigorous testing</p>
    <p><strong>Tools:</strong> AWS (EMR, EC2), Spark, Docker, Oracle DB, Jenkins, Linux</p>
  </div>
  <div class="lang lang-zh">
    <p><strong>编程语言：</strong> Java、SQL、Python、C、C++</p>
    <p><strong>核心方向：</strong> 分布式系统、REST API 设计、CI/CD 流水线、多线程、严格测试</p>
    <p><strong>工具与平台：</strong> AWS（EMR、EC2）、Spark、Docker、Oracle DB、Jenkins、Linux</p>
  </div>
</section>

<!-- Brief personal note so the page still feels welcoming -->
<section class="home-closing">
  <p class="lang lang-en">Outside of work you’ll usually find me exploring new game mechanics, playing piano, or sharing build logs with friends. Thanks for visiting—reach out if you’d like to collaborate or chat.</p>
  <p class="lang lang-zh">工作之外我会在钢琴与机械键盘之间切换、尝试 indie 游戏创意、或与朋友分享折腾心得。谢谢你的造访，想合作或聊天都欢迎随时来信。</p>
<p class="lang lang-en"><a href="{{ '/diary/' | relative_url }}">More about my life →</a></p>
  <p class="lang lang-zh"><a href="{{ '/diary/' | relative_url }}">或者你还想看更多关于我的生活吗 →</a></p>
</section>