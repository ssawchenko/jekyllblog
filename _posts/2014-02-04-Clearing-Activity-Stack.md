---
title: Clearing the Activity Stack
layout: post
categories:
- android
tags:
- java
---

Like many applications, my current project required me to add the ability for a user to log out from a settings page. In my case,
I wanted to user to be sent to HomescreenActivity on logout. I did not want the user to be able to use the back button once they have logged out, because, well... 
they logged out. 

<!-- more -->

By default the activity stack looked like this:

``` java
Homescreen -> Main -> Settings (logout) -> Homescreen
// For note, HomescreenActivity is setup in the
// manifest file as android:noHistory="true"
```

So pressing back would send me back to my Settings activity. Boo urns. Not what I wanted.

### Setting Intent Flags to Clear Task Stack
A little digging found that they key to controlling the back stack is by setting the correct intent flags:

``` java
// Called from my SettingsActivity
Intent i = new Intent(this, HomescreenActivity.class);
i.setFlags(i.FLAG_ACTIVITY_NEW_TASK | i.FLAG_ACTIVITY_CLEAR_TASK);
startActivity(i); // Launch the HomescreenActivity
finish();         // Close down the SettingsActivity
```

So what do these flags actually do?

From the [Android Developer Docs](http://developer.android.com/reference/android/content/Intent.html):

**FLAG_ACTIVITY_NEW_TASK** 

* If set, this activity will become the start of a new task on this history stack. 
* When using this flag, if a task is already running for the activity you are now starting, 
then a new activity will not be started; instead, the current task will simply be brought to the front of the 
screen with the state it was last in.
* Note: a task (from the activity that started it to the next task activity) defines an atomic group of activities 
that the user can move to. 

**FLAG_ACTIVITY_CLEAR_TASK**

* If set in an Intent passed to Context.startActivity(), this flag will cause any existing task that would be associated 
with the activity to be cleared before the activity is started. That is, the activity becomes the new root of an otherwise 
empty task, and any old activities are finished. 
* This can only be used in conjunction with FLAG_ACTIVITY_NEW_TASK.

When used in conjunction, these two flags will launch the desired activity as the root task, clearing all previously 
existing tasks in the stack, as we desired.

``` java
HomeScreen -> Main -> Settings (logout)
HomeScreen // New Task! (no back stack)
```

	