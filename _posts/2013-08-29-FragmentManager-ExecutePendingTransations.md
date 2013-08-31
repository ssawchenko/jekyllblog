---
title: "Committed fragment transaction not being created"
layout: post
categories:
- android
---

In my Android application I have two fragments that are related to each other; one fragment contains 'tabs' which when pressed will load content into the second fragment. 
Originally, I had a piece of code that (1) loaded in the tab fragment, (2) committed the fragment transaction, and then (3) attempted to call a method implemented in the newly loaded fragment.

<!-- more -->


**First attempt:**

```java
tabFragment = new SingleStatControlTabs();
ft.replace(R.id.fragment_switcher, tabFragment);
ft.commit();
tabFragment.loadView(SingleStatControlTabs.DEFAULT_TAB); // Nope! Null pointer exception found here...
```

This code looked fine, but my loadView method was tossing me a null pointer exception. When I looked into it, the newly loaded fragment's onCreateView method was not being called after calling the commit function (this meant that some variables I depended on were null). But I had committed, so what was going on? Thankfully StackOverflow once again saved the day. It turns out that calling commit does not actually force the fragment to update immediately. To force the update manually we can call `FragmentManager.executePendingTransactions();`.


**Second (now working) attempt:**

```java
tabFragment = new SingleStatControlTabs();
ft.replace(R.id.fragment_switcher, tabFragment);
ft.commit();
fm.executePendingTransactions(); // Forces the replace to execute
tabFragment.loadView(SingleStatControlTabs.DEFAULT_TAB); // Nope! Null pointer exception found here...
```

### Side note: Issues in OnCreate
Calling executePendingTransactions from within an activity's `onCreate` method does not appear to function as expected and I am unclear as to why. Moving the executePendingTransactions code into the `onStart` function does work however and is my current workaround for the time being.

### References 
http://stackoverflow.com/questions/10864708/oncreateview-isnt-called-immediately-after-fragmenttransaction-commit

http://stackoverflow.com/questions/17229500/oncreateview-in-fragment-is-not-called-immediately-even-after-fragmentmanager/18521934#18521934