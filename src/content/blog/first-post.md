---
title: "Modernizing Portfolio Architecture with Astro"
pubDate: 2026-06-05
description: "A deep dive into migrating a personal portfolio website from Vite to Astro, focusing on layout performance, dynamic static generation, and blog content collections."
author: "Isaac Gitonga"
tags: ["Astro", "Web Performance", "Migration"]
---

Welcome to my first blog post! In this post, I want to discuss why and how I migrated this portfolio website from a client-side Vite project to Astro.

## Why Astro?

Personal portfolios benefit heavily from static site optimization. Traditional Single Page Applications (SPAs) load a blank HTML file and construct the DOM using client-side JavaScript. This leads to several issues:
1. **First Paint Delay:** Users see a blank screen while the JS bundle is loaded and executed.
2. **SEO Penalties:** Search engine web crawlers struggle to index content that isn't present in the initial server response.
3. **Bloated Bundles:** Including entire runtime libraries just to display static text and lists.

Astro addresses these problems directly by shipping **zero client-side JavaScript by default**. It renders components to pure HTML at build-time. 

## Architectural Shifts

During the migration, we made several deliberate architectural decisions:
- **SSG Dynamic Routing:** Migrated dynamic URL parameter lookups (`/project?id=ikopurrty`) to clean, statically generated pathways (`/projects/ikopurrty`).
- **Semantic Design Tokens:** Set up a unified styling structure built on Tailwind CSS v4 variables.
- **Content Collections:** Implemented standard Markdown-based collections for blog articles.

In the next post, I will write about how we integrated GSAP animations back into the layout safely without regression! Stay tuned.
