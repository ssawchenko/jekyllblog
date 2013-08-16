---
title: Day 1 - Sample Jekyll Blog
layout: post
categories:
- web
permalink: /blog/2013/08/11/Blog-Startup-With-Jekyll.html
---

Things I did to get this blog up and runnin'

1. [Followed Jekyll setup tutorial](http://www.andrewmunsell.com/tutorials/jekyll-by-example/index.html) ([Jekyll](http://jekyllrb.com/))
1. [Looked into Liquid formatting](https://github.com/Shopify/liquid/wiki/Liquid-for-Designers) and [Liquid filters](http://liquid.rubyforge.org/classes/Liquid/StandardFilters.html#M000012)
1. [Looked into .md formatting for posts](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) 
1. [Installed rvm and updated ruby (for redcarpet support)](http://stackoverflow.com/questions/3696564/how-to-update-ruby-to-1-9-x-on-mac)
1. [Installed and used redcarpet for markdown parsing of ''' (code snippets)](https://github.com/vmg/redcarpet)
1. [Added Highlight.js for code formatting](http://softwaremaniacs.org/soft/highlight/en/)
1. [Setup Git repo to house this awesome project](https://github.com/ssawchenko/jekyllblog)
1. [Added redcarpet extensions to _Config.yml get .md strikethrough working](http://stackoverflow.com/questions/13464590/github-flavored-markdown-and-pygments-highlighting-in-jekyll)

## Sample ``` code markdown 
```javascript
var now = new Date();

var days = new Array('Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday');

var months = new Array('January','February','March','April','May','June','July','August','September','October','November','December');

var date = ((now.getDate()<10) ? "0" : "")+ now.getDate();

function fourdigits(number)	{
	return (number < 1000) ? number + 1900 : number;
								}
today =  days[now.getDay()] + ", " +
         months[now.getMonth()] + " " +
         date + ", " +
         (fourdigits(now.getYear())) ;

document.write(today);
```