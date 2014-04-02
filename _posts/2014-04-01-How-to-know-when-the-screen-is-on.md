---
title: "How to: Know when the screen is turned off/on"
layout: post
categories:
- android
- java
---

While attempting to put some power management features in place, I came upon the need to know if and when the screen on the 
device was turned off and turned back on again. Turns out there is are two handy intent broadcasts that you can listen for that suited 
my needs perfectly: [Intent.ACTION_SCREEN_OFF](http://developer.android.com/reference/android/content/Intent.html#ACTION_SCREEN_OFF) 
and [Intent.ACTION_SCREEN_ON](http://developer.android.com/reference/android/content/Intent.html#ACTION_SCREEN_ON).

<!-- more -->

### Yeah yeah, show me the code...

In my Service I created a private BroadcastReceiver, however, feel free to extract this out to a separate class.

``` java

// 1. Create the BroadcastReceiver (within my Service class)
private class ScreenBroadcastReciever extends BroadcastReceiver {
	// If extracted to a separate class, useful to query for screen state, 
	// Note: Since I am using this class privately within my Service, I never call this.	
	private boolean mIsScreenOn; 
  	public boolean isScreenOn() {
    	return mIsScreenOn;
  	}
		
	@Override
	public void onReceive(Context context, Intent intent) {
		if (intent.getAction().equals(Intent.ACTION_SCREEN_OFF)) {
			mIsScreenOn = false;
			// Do stuff here when screen goes off 
			// In my case, stop my service from repeating
		} 
		else if (intent.getAction().equals(Intent.ACTION_SCREEN_ON)) {
			mIsScreenOn = true;
			// Do stuff here when screen goes on
			// In my case, start my service repeating
		}
	}
}

// 2. Define an instance of the BroadcastReceiver
private ScreenBroadcastReciever mScreenReceiver;

// 3. Instantiate and register the BroadcastReceiver in onCreate
@Override
public void onCreate() {
	// Setup and register receiver filtering on our two Intents
	mScreenReceiver = new ScreenBroadcastReciever();
	IntentFilter filter = new IntentFilter(Intent.ACTION_SCREEN_ON);
	filter.addAction(Intent.ACTION_SCREEN_OFF);
	registerReceiver(mScreenReceiver, filter);
}
	
// 4. Unregister the BroadcastReceiver in onDestroy	
@Override
public void onDestroy() {
  super.onDestroy();
  unregisterReceiver(mScreenReceiver);
}
```