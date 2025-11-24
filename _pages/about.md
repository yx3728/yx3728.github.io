---
permalink: /
title: "Joey's Personal page"
excerpt: "About me"
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---
<section class="home-hero">
  <p class="text-muted">Hi, I’m Joey.</p>
  <h1>M.S. Computer Science @ NYU · Software Engineer</h1>
  <p>I build reliable backend systems and large-scale data pipelines with a focus on distributed systems, performance tuning, and developer-friendly tooling.</p>
  <p>Currently pursuing my M.S. at NYU (GPA 4.0) after graduating from NC State (GPA 3.8), and refining my craft through hands-on infrastructure and platform work.</p>
</section>

<section class="home-experience">
  <h2>Experience</h2>
  <article class="experience-card">
    <h3>Oracle · Software Engineer, Cloud Infrastructure & Platform</h3>
    <p class="text-muted">May 2024 – Dec 2024 · Redwood City, CA</p>
    <ul>
      <li>Optimized Oracle SaaS platform scalability, increasing application delivery speeds by roughly 20% across large enterprise workloads.</li>
      <li>Helped operate OCI services for 100K+ users with 99.9% uptime through reliability engineering, resilient migrations, and tighter monitoring.</li>
      <li>Designed CI/CD automation and incident runbooks that cut deployment time ~30% and reduced service downtime by about 8% during critical fixes.</li>
    </ul>
  </article>
</section>

<section class="home-education">
  <h2>Education</h2>
  <p><strong>New York University</strong> — M.S. Computer Science, Brooklyn, NY (Aug 2024 – May 2026), GPA 4.0/4.0</p>
  <p><strong>North Carolina State University</strong> — B.S. Computer Science, Raleigh, NC (Aug 2019 – May 2024), GPA 3.8/4.0</p>
</section>

<section class="home-portfolio">
  <h2>Featured Projects</h2>
  <p>Highlights from my recent work in scheduling, systems programming, and data engineering.</p>
  <div class="project-grid">
    {% assign featured_projects = site.portfolio | sort: "title" %}
    {% for project in featured_projects limit:3 %}
    <article class="project-card">
      <h3><a href="{{ project.url | relative_url }}">{{ project.title }}</a></h3>
      <p class="project-card__subtitle">{{ project.excerpt | strip_html }}</p>
      <p>{{ project.content | markdownify | strip_html | truncate: 220 }}</p>
      <a class="btn" href="{{ project.url | relative_url }}">Read more</a>
    </article>
    {% endfor %}
  </div>
  <p><a href="{{ '/portfolio/' | relative_url }}">View the full portfolio →</a></p>
</section>

<section class="home-skills">
  <h2>Core Skills</h2>
  <p><strong>Languages:</strong> Java, SQL, Python, C, C++</p>
  <p><strong>Core Competencies:</strong> Distributed systems, REST API design, CI/CD pipelines, multithreading, rigorous testing</p>
  <p><strong>Tools:</strong> AWS (EMR, EC2), Spark, Docker, Oracle DB, Jenkins, Linux</p>
</section>

<!-- Brief personal note so the page still feels welcoming -->
<section class="home-closing">
  <p>Outside of work you’ll usually find me exploring new game mechanics, playing piano, or sharing build logs with friends. Thanks for visiting—reach out if you’d like to collaborate or chat.</p>
</section>