---
title: "response.getEntity().getContent() throwing IllegalStateException?"
layout: post
categories:
- android
tags:
- java
- httpresponse
- exception
---

While debugging my HttpResponse object in my Android application I kept coming across an the error:

```java
IllegalStateException: Content has been consumed
```

I puzzled and puzzled until my puzzler was sore, and then I realized that I had put ```result.response.getEntity().getContent()``` in my **watch window** in an effort to debug the result. 
Turns out this is a bad idea!

<div class="alert alert-info">
<b>Watch:</b> Never call getContent() from your watch/expression window! Always write to a variable and watch the variable.
</div>

Calling ```.getContent()``` in the watch window causes the content to be consumed **in the watch window**, thus causing the above exception to be thrown when the application attempts to retrieve it. 
 
### References
http://stackoverflow.com/questions/16104884/illegalstateexception-content-has-been-consumed-on-first-getcontent


 
