They don't exist in Android WebView though, so to me they're a dead topic wrt HTML5 on-device apps.

* HTML5's JavaScript multithreading; until HTML5 all JavaScript execution occurred on a single, UI thread. Heavy load on the garbage collector etc could cause application pauses since the GC execution was ALSO being done in the UI thread.
* They allow scripts to be run in the background, off the main UI thread
* Each web worker gets its own script (global) context and heap, thus its own garbage collector. 
* In other words, WW work within a global context different from the current window
    * therefore cannot use global `window` context, must use `self` context.
    * Using `window` will throw an error.
    * So if you allocate a lot of objects on a background thread, then only pass small output data to the UI thread, you can help minimize the impact of garbage collection on your UI thread.    
* Communication between worker and the spawning task is done by posting messages from the worker to an event handler specified by the creator.
* Can perform I/O using XMLHttpRequest (although the responseXML  and channel attributes are always null).

* The URI passed as parameter of the Worker constructor must obey the same-origin policy 
* Data passed between the main page and workers are copied, not shared. Objects are serialized as they're handed to the worker, and subsequently, de-serialized on the other end. - The page and worker do not share the same instance
* As usual, background threads – including workers – cannot manipulate the DOM.
* As Web Workers will be executed on separated threads, you need to host their code into separated files from the main page.


http://caniuse.com/#search=worker

https://developer.mozilla.org/en-US/docs/Web/Guide/Performance/Using_web_workers