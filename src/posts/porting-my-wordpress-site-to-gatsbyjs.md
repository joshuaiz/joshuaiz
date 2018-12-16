---
path: "/words/porting-my-wordpress-site-to-gatsbyjs"
date: "2018-12-14"
title: "Porting my WordPress site to GatsbyJS"
image: "../images/joshuaiz_tracks_03@2x.png"
postExcerpt: "I ported joshuaiz.com from WordPress to GatsbyJs. Here's why."
withAudio: false
---
<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Don’t mean to overhype it, and note it has its warts. But <a href="https://twitter.com/gatsbyjs?ref_src=twsrc%5Etfw">@gatsbyjs</a> blog authoring experience is incredible. Hot reloading feels instant. I write posts and tweak styles or layout, and see my changes reflected in real time. This was my dream.</p>&mdash; Dan Abramov (@dan_abramov) <a href="https://twitter.com/dan_abramov/status/1068884262273933312?ref_src=twsrc%5Etfw">December 1, 2018</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

I've been working a lot with React lately and in the React ecosystem there has been a considerable amount of buzz about [GatsbyJS](https://www.gatsbyjs.org) — a really cool static (or not-so-static) site generator which uses all of the latest JavaScript stuffs: React, Webpack, GraphQL, code-splitting, prefetching that can load data from just about anywhere: local markdown files, a CMS like WordPress or Drupal, json, and more. While Gatsby has been around for a couple years, it seems to be really picking up steam as of late.

**joshuaiz.com** (this site) has been around since 2002: first as a static HTML site, then it moved to WordPress where it has been since 2006...until now. ***This* site is built with GatsbyJS.** 

Gatsby is not only fun to develop with, it makes it fun to *create content*. Working and developing with Gatsby feels a lot like when I first got into WordPress: exciting and full of possibilities. That's a great feeling and anything that gets me or any developer to *write* more is a very good thing.

My first foray of experimenting with GatsbyJS and WordPress resulted in a port of [Plate](https://github.com/joshuaiz/plate), a WordPress starter theme created by my development company, [studio.bio](https://studio.bio), into a complete Gatsby starter called [Plate for Gatsby](https://github.com/joshuaiz/plate-for-gatsby).

So when thinking about rebuilding joshuaiz.com with Gatsby, I could use Gatsby for the front end and the data could be sourced from the existing WordPress posts on joshuaiz.com. However, in doing that I would still have to maintain a working WordPress install, keep it updated, and pay for hosting. Don't get me wrong — I love WordPress and work with it every day with both client and personal sites. But, it got me thinking...

**...why not just serve markdown files directly with Gatsby?** 

> Could _I_ live the dream? Or at least live [Dan Abramov's](https://twitter.com/dan_abramov/) dream?

It turns out, you *can* live the dream. I can write my posts in markdown and any edits to the content *or* the site design is updated _in real time_ using the hot reloading in Gatsby. 

While real time updates may not seem like much, **it feels really amazing to do this** in practice. This is what blogging should be.

In a future post, I'll go in to more detail on *how* to make to move from WordPress to GatsbyJS.

