---
title: "I committed my fragment transaction, but onCreateView is not being called?"
layout: post
categories:
- android
permalink: /blog/2013/08/29/FragmentManager-ExecutePendingTransactions.html
---

In my application I have two fragments that are related. One fragment contains 'tabs' which when pressed will load content into the second fragment. 
Originally, I had a chunk of code that loaded in the tab fragment, committed, and then attempted to call the loadView function (which is implemented in the SingleStatControlTabs fragment.

First attempt:

```java
tabFragment = new SingleStatControlTabs();
ft.replace(R.id.fragment_switcher, tabFragment);
ft.commit();
tabFragment.loadView(SingleStatControlTabs.DEFAULT_TAB); // Nope! Null pointer exception found here...
```
This code looked fine, but my loadView was tossing me a null pointer exception. When I debugged it, the tab's onCreateView method was not being called, so some variables I depended on were not being set. But I had committed, so what was going on? Thankfully StackOverflow once again saved the day. It turns out that calling commit does not actually force the update. To force the update manually we can call `FragmentManager.executePendingTransactions();`.

Second, now working attempt:

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