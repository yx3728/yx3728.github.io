---
layout: archive
title: "Sitemap"
permalink: /sitemap/
author_profile: false
---

{% include base_path %}

For crawlers there is an XML sitemap at <a href="{{ base_path }}/sitemap.xml">/sitemap.xml</a>. This page is a simplified, human-friendly sitemap.

<h2>Pages</h2>
{% assign pages_sorted = site.pages | sort: 'title' %}
{% for p in pages_sorted %}
  {% assign url = p.url | default: p.permalink %}
  {% if p.title and p.sitemap != false and p.robots != 'noindex' and url != '/404.html' and url != '/sitemap/' and url contains '/diary/' == false and url contains '/tags/' == false and url contains '/categories/' == false %}
    {% include archive-single.html post=p %}
  {% endif %}
{% endfor %}

<h2>Posts</h2>
{% for post in site.posts %}
  {% if post.sitemap != false and post.robots != 'noindex' %}
    {% include archive-single.html %}
  {% endif %}
{% endfor %}

{% assign wanted = 'publications|talks|teaching|portfolio' | split: '|' %}
{% for label in wanted %}
  {% assign collection = site[label] %}
  {% if collection and collection.size > 0 %}
    <h2>{{ label }}</h2>
    {% for doc in collection %}
      {% if doc.sitemap != false and doc.robots != 'noindex' %}
        {% include archive-single.html post=doc %}
      {% endif %}
    {% endfor %}
  {% endif %}
{% endfor %}
