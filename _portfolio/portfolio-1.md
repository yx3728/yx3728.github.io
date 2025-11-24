---
title: "Intelligent Course Scheduler"
excerpt: "Java · SQL · REST API — Evaluates 100K+ schedule combinations per request and cuts planning time by ~60% for students.<br/><img src='/images/500x300.png' alt='Course scheduler preview'>"
collection: portfolio
---

Built a Java-based combinatorial search engine that assembles conflict-free academic timetables and filters them using live campus constraints.

- Tuned SQL indexing, prepared statements, and caching layers to keep latency predictable even with 100K+ candidate schedules per request.
- Integrated Dijkstra-inspired routing of campus paths to weed out infeasible back-to-back classes.
- Result: ~60% reduction in planning time during beta and a noticeably smoother registration experience.
