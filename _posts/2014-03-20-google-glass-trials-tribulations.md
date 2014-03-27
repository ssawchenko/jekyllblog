---
title: "Google Glass: Trials and Tribulations"
layout: post
categories:
- googleglass
tags:
- java
---

_"So I have a pair of google glass here if you want to play with it for the week, see what you can do"._ 

This is how our weekly team meeting started on Monday. Needless to say I jumped at the chance, cleared my schedule and got 
my hot little hands on them the very next morning. I spent the next 3 days hacking together some little proof of concept 
applications to show at work. Glass development is easy to get into if you have previous Android development experience. 
It sits on top of the existing Eclipse tools and extends them via the 
[Glass Development Kit (GDK)](https://developers.google.com/glass/develop/gdk/). 

There are plenty of resources out there to 
help get you started, so instead of duplicating those I figured I would share things that I had troubles with when I was starting out:

* [VPN Connection Issues](#VPNConnectionIssues)
* [No contextual voice commands](#Nocontextual)
* [Device to glass data transfer is not simple](#datatransfer)
* [Authentication is tricky](#Authentication)
* [(GDK) Static cards cannot have a PendingIntent attached to them](#Staticcards)
* [Live cards must always include a PendingIntent](#Livecards)

<!-- more -->

<div class="alert alert-info">
<b>Disclaimer:</b> At the time of writing the GDK is still relatively new; in the future these problems may be addressed and may no longer be an issue.
</div>

## Getting down to it:
<a name="VPNConnectionIssues"></a>
#### VPN Connection Issues
After hours (and hours) of investigation, it appears that a glass device connected to a device with a VPN connection 
**cannot** access addresses that reside on the VPN network. I connect through a VPN to gain access to machines in the office, 
including my development web server. I can make requests to my server through my tablet with no problem. The same request made 
via glass simply timed out.

My setup: [ Local network / VPN ] <== Wifi == [ Nexus 7 ] <== Bluetooth == [ Glass ]

* Wireshark snooping on the packets showed that all requests made from the glass to IPs outside of the VPN routing ranges went out 
successfully. All requests made to IP ranges that would need to route through the VPN never went out on the wire - thus causing the 
timeouts.
* Both wifi and bluetooth connection exhibit the same behaviour.
* I connected via the Cisco AnyConnect client, although it is unclear if that matters or not - I have not tested this out via other VPNs. 

<a name="Nocontextual"></a>
#### No contextual voice commands
The "ok glass" menu system is awesome. How cool would it be to have something similar in your app? Really awesome! But we don't get
it (for free) yet. The current voice recognition functionality will return the text string as spoken and it is up to you to determine matches or 
close matches.

* [StackOverflow Post](http://stackoverflow.com/questions/20133577/adding-the-ok-glass-contextual-voice-menu-within-an-immersion-activity)

<a name="datatransfer"></a>
#### Device to glass data transfer is not simple
I was hoping to be able to share data between an Android device and the glass itself. Ideally I wanted to push shared stored settings
and notifications from a service running on the device (in the form of live or static cards), but there appears to be no functionality 
in the GDK to do this. A little digging has found that an ambitious developer has written up a bluetooth host/client to do this very 
thing; I have not had the time to try this out yet, but thought it worthy of note.

* [StackOverflow Post: including github repo with temp solution](http://stackoverflow.com/questions/20336968/google-glass-gdk-how-to-communicate-with-android-device)

<a name="Authentication"></a>
#### Authentication is tricky
Let me preface by stating that I haven't looked into authentication all that much, but by looking at currently supported glassware, they 
all use OAuth or OAuth2. 

* [OAuth Wiki](http://en.wikipedia.org/wiki/OAuth)

Authentication
- Looks like most glassware apps use oauth/oauth2 to provide authentication (unfamiliar with this)
- If we get device <--> glass communication we could share eWEB settings (security?)

<a name="Staticcards"></a>
#### (GDK) Static cards cannot have a PendingIntent attached to them
There is no way to attach a menu (Intent action) to a static card put into the timeline through the GDK. It is only possible
to do so using the Mirror API. To do this currently you have to create a live card. 

* [Google Glass API Issue](https://code.google.com/p/google-glass-api/issues/detail?id=320)
* [StackOverflow Post](http://stackoverflow.com/questions/20719578/how-to-assign-menu-items-to-card-inserted-using-timelinemanager)
* [StackOverflow Post 2](http://stackoverflow.com/questions/20697656/static-card-with-pending-intent-in-timelinemanager)

<a name="Livecards"></a>
#### Live cards must always include a PendingIntent
Nothing too crazy here. It states in the developer docs that a live card **must** including a PendingIntent, however if you forget to 
include this you will get no error, but the card will simply not appear when the application is run.

* [Developer Docs](https://developers.google.com/glass/develop/gdk/ui/live-cards)

## Success!
My demos proved worthy and our little mobile team is allowed to continue development with Glass.

<img class="img-responsive" src="/img/blog/2014-03-Glass.jpg" width="500" height="358">
<sub>Couldn't resist a Glass selfie or two</sub>
