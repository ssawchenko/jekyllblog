---
title: "How to stop Soft keyboard from popping up automatically"
layout: post
categories:
- android
tags:
- java
- ui
- layout
---

#### Problem: The softkeyboard is automatically popping up when your activity or fragment is loaded.
When an input is given focus, the default behaviour is for the soft keyboard to pop up.
In the example below, `listFilterText` is getting default focus (as it is the 'first' input in the layout) and forcing the soft keyboard to pop up.

```java
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent">
     
    <RelativeLayout
        android:id="@+id/listSearchView" 
	    android:layout_height="50dp"
	    android:layout_width="match_parent"
	    android:background="@color/DarkGoldenrod"> 
  		<EditText 
    	    android:id="@+id/listFilterText"
    		android:layout_width="match_parent"
    		android:layout_height="match_parent"    
    		android:hint="SEARCH" />
    </RelativeLayout>
   
	<ListView android:id="@+id/listView" 
	    android:layout_below="@id/listSearchView"
	    android:layout_height="match_parent"
	    android:layout_width="match_parent" /> 
	
</RelativeLayout>
```

### One solution
The most strightfoward solution I have found is to manually give focus to a non-input object. We do this by 
1. Enabling focus on the desired object via `android:focusable` and `android:focusableInTouchMode="true"`
1. Requesting focus on the desired object with `<requestFocus />`

```java
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent">
     
    <RelativeLayout
        android:id="@+id/statSearchView" 
	    android:layout_height="50dp"
	    android:layout_width="match_parent"
	    android:background="@color/DarkGoldenrod"
	    android:focusable="true"
        android:focusableInTouchMode="true"> 
        <requestFocus />
	    
  		<EditText 
    	    android:id="@+id/statListFilterText"
    		android:layout_width="match_parent"
    		android:layout_height="match_parent"    
    		android:hint="SEARCH" />
        
    </RelativeLayout>
   
	<ListView android:id="@+id/statListView" 
	    android:layout_below="@id/statSearchView"
	    android:layout_height="match_parent"
	    android:layout_width="match_parent" /> 
	
</RelativeLayout>
```

Now when the activity/fragment loads, the focus is given to the `RelativeLayout` and the keyboard will not pop up until the user activates focus on the `EditText` object.


### References
For more on focus order see: http://mobile.tutsplus.com/tutorials/android/android-user-interface-design-the-basics-of-control-focus-order/
http://developer.android.com/guide/topics/ui/accessibility/apps.html

