---
title: Day 1 - Sample Jekyll Blog
layout: post
---

Things I worked with today:

1. [Jekyll setup](http://www.andrewmunsell.com/tutorials/jekyll-by-example/index.html) ([Jekyll](http://jekyllrb.com/))
1. [Liquid formatting](https://github.com/Shopify/liquid/wiki/Liquid-for-Designers) and [Liquid filters](http://liquid.rubyforge.org/classes/Liquid/StandardFilters.html#M000012)
1. [.md formatting](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) 
1. Installed rvm and updated ruby for redcarpet support
1. [Using redcarpet markdown parsing](https://github.com/vmg/redcarpet)
1. [Highlight.js for code formatting](http://softwaremaniacs.org/soft/highlight/en/)

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