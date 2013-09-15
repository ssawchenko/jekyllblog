---
title: "How to indent code in Markdown (.md) files"
layout: post
categories:
- jekyll
tags:
- markdown
---

Seems simple, but it took me some digging to find this. 

To indent code blocks in markdown files, simply add 4 blank spaces in front of the code block from within the list. 

<!-- more -->

<div class="alert alert-info">
<b>Watch:</b> White spaces matter! There must be a linebreak after the list item, but before the code block
</div>

Exact .md: 

<pre>
* This is a list item   
 
    ```javascript 
var i = "this is my code block!";
var j = "i added indentation before the ``` ";
```
</pre>

becomes:

* This is a list item
   
    ```javascript 
var i = "this is my code block!";
var j = "i added indentation before the  ``` ";
```

And that's it! Huzzah!
