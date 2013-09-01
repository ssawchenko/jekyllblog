---
title: How I setup my Jekyll Blog
layout: post
categories:
- jekyll
---
A few years back I had a Wordpress blog, and while it made it easy to setup and post, it required a lot of maintenance, was harder to control specific page formats, and was really bloated for what I needed. After a little research, I decided to go with Jekyll as a blogging platform. It is a ruby application that generates a static web site, but it is flexible enough to allow for a lot of customization. 

There is quite a bit of documentation out there for setting up a blog with Jekyll, but below are all the steps I took to get my blog 'up and a runnin':

<!-- more -->

1. [Followed Jekyll setup tutorial](http://www.andrewmunsell.com/tutorials/jekyll-by-example/index.html) ([Jekyll](http://jekyllrb.com/))
1. [Installed rvm and updated ruby (for redcarpet support)](http://stackoverflow.com/questions/3696564/how-to-update-ruby-to-1-9-x-on-mac)
1. [Installed and used redcarpet for markdown parsing of ''' (code snippets)](https://github.com/vmg/redcarpet)
1. [Added redcarpet extensions to _Config.yml get .md strikethrough working](http://stackoverflow.com/questions/13464590/github-flavored-markdown-and-pygments-highlighting-in-jekyll)
1. [Added Highlight.js for code formatting](http://softwaremaniacs.org/soft/highlight/en/)
1. [Looked into Liquid formatting](https://github.com/Shopify/liquid/wiki/Liquid-for-Designers) and [Liquid filters](http://liquid.rubyforge.org/classes/Liquid/StandardFilters.html#M000012)
1. [Looked into .md formatting for posts](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) 
1. [Setup Git repo to house this awesome project](https://github.com/ssawchenko/jekyllblog)