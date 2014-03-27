---
title: "Mobile Web (JavaScript) Performance - Y U So Slow?"
layout: post
categories:
- javascript
tags:
- javascript
- performance
---
Awhile ago I read an extremely detailed [article on mobile web application performance](http://sealedabstract.com/rants/why-mobile-web-apps-are-slow/) that attempted to quantify some of the issues faced by deploying a web app instead of a native app; one of the main conclusions that came out of the article was:
> "Javascript is too slow for mobile app use in 2013"

Not actually having to deal with mobile web applications I put this article out of mind; I was, however, very interested to see a recent rebuttal to the above article written by [Brandon Paddock](http://brandonlive.com/2013/07/10/stop-saying-mobile-web-apps-are-slow/) which looks into some the issues a little further, discussing exactly how and where JavaScript can effect mobile performance - discussing the issues regarding the time required to download app assets and the threading model mobile apps are subject to that effect perceived rendering performance etc... 

<!-- more -->

In this rebuttal article, I was most interested in the [cited presentation made by Gaurav Seth](http://channel9.msdn.com/Events/Build/2013/4-313) (sides [here](http://view.officeapps.live.com/op/view.aspx?src=http%3a%2f%2fvideo.ch9.ms%2fsessions%2fbuild%2f2013%2f4-313.pptx)) given at the 2013 San Francisco Build conference; this talk actually gets into some interesting details regarding **how** to write JavaScript with app performance in mind.

Main my focus in this post is to sum up some of the suggestions made which will help increase JavaScript performance across the board. Please do see their articles for all the details. 

## Things you can do in day-to-day JavaScript to help improve performance 
**Disclaimer:** The items I list below may only provide a miniscule performance increase (given the situation in which they are used), but there is no harm in keeping these in mind as best practices. Also, the focus of the talks were regarding JavaScript code performance, and does not cover more general performance issues such as deferred or async script loading. The suggestions are not restricted to mobile usage, however, the performance gains may be greater on the mobile stage.

#### Web workers
JavaScript runs on the UI thread, unless you use HTML5 Web Workers. According to the articles, Web Workers give you a lot of control - each web worker gets its own script context and heap, thus its own garbage collector. So if you allocate a lot of objects on a background thread, then only pass small output data to the UI thread, you can help minimize the impact of garbage collection on your UI thread. 

I actually know very little (approaching zero) on web workers, but I have now added them to my mental "to-do-research" list. I'll hopefully write a little something up with my findings.

It also appears that web workers "don't exist" in an Android WebView (* I need to confirm this), so this may not be as useful if developing for the mobile market.

#### Break up intense work
If you don't use web workers to do complex JavaScript work, you may want to break that work into chunks that allow the UI thread some time to appear responsive.

#### Choose your JavaScript libraries carefully
Some JS libraries are very heavy for mobile uses; data binding libraries (such as WinJS) may have a large performance overhead can start to be noticeable on mobile platforms. If designing FOR mobile you may be able to avoid these, but if you are attempting to move your application from the desktop to mobile this is something to keep in mind for sure.

#### Reuse JavaScript objects where possible
Every call to the new operator (or implicit memory allocation) reserves Garbage Collection (CG) space. Every allocation will "bring you closer to a GC pause" (where the application appears to pause while the Garbage Collector runs).

Therefore we should be careful with our object allocation patterns:

* Avoid unnecessary object allocations
* Use object pools or reuse objects when possible

#### Avoid floats unless they are needed
Floats are boxed objects in JavaScipt and as such will require a heap lookup to get the value. If you do not require a float, consider using integer math to force an unboxed integer object which does not require a heap lookup. 

 Using `|0` will force integer math to occur:
 
```javascript
 var i = ((a + b)/2) |0;
```

Again I learned something new - I haven't seen this used before; add one more item added to my mental "to-do-research" list.

#### Use arrays efficiently
For smaller arrays these concepts may not be as important, but if your application does heavy computing over large arrays, keep these tips in mind.

*  Pre-allocate arrays when you can; this avoids reallocation of memory with each addition to the array.

    ```javascript
var a = new Array(1000);
``` 
* Cache array lengths to avoid excessive property access:
  * There is a lot of [debate](http://stackoverflow.com/questions/6261953/do-modern-javascript-jiters-need-array-length-caching-in-loops) as to whether this actually increases performance, however, according [these](http://jsperf.com/caching-array-length/15) [tests] (http://www.erichynds.com/blog/javascript-length-property-is-a-stored-value) while modern browsers do not benefit to the same degree as older browsers (< IE9) gains can be seen on cases with large array iterations. 
    
    ```javascript 
for (int i=0; len=myArr.length; i < len; i++) { .. }
```
* Use typed arrays when possible; according to Gaurav, this avoids integer tagging and float heap space allocations.

    ```javascript 
var a = new Float64Array(100);
var a = new Int32Array(100);
```
* Limit DOM queries; cache DOM elements to prevent multiple lookups.

    ```javascript
// Simple case, but you get the idea.
var elStyle = document.getElementById("elID").style;
elStyle.color = "#ff0000";
elStyle.background = "#00ff00";
```
* Explicitly convert DOM values if possible (use `parseInt` for example); they are strings by default and explicit casting means that the values will not be converted to a string first. 

    ```html
<input type="text" id="lastValue" value="22" />
<script>
var i = parseInt(document.getElementById("lastValue").value);
alert(i);    
</script>
``` 

## Benchmarking JavaScript Performance
While writing up this post I bumped into a site called [JsPerf](http://jsperf.com/) which acts as a framework to help create and share test cases by using `benchmark.js` as a foundation.  

I think this may be a handy tool to keep in my back pocket for later.
  
  