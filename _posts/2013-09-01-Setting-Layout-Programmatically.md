---
title: "Setting Layout Weight Programmatically"
layout: post
categories:
- android
tags:
- java
- ui
- layout
---

### What is layout_weight?
Layout weights are a very useful layout mechanism to help create UIs that scale more easily. [The Android Developer Guide says the following:](http://developer.android.com/training/notepad/notepad-ex2.html)
> layout_weight is used in LinearLayouts to assign **importance** to Views within the layout.
> <br/> <br />All Views have a default layout_weight of zero, meaning they take up only as much room on the screen as they need to be displayed.
> <br/> <br />Assigning a value higher than zero will split up the rest of the available space in the parent View, according to the value of each View's layout_weight and its ratio to the overall layout_weight specified in the current layout for this and other View elements.
This means you can easily have items in your linear layouts take up the same ratio of space as the layout width or height scales.

<!-- more -->

### Setting layout_weight in XML 
Setting layout weight in XML is simple: set the android:layout_weight proeprty to the desired ratio, and depending on if you want to scale width/height, set the layout_width/layout_height property to ```0dip```  

```xml
<LinearLayout
    android:layout_width="fill_parent"
    android:layout_height="fill_parent"
    android:orientation="vertical">

    <!-- android:layout_weight indicates the relative ratio -->
    <!-- 0dip forces scaling to match the weighted value -->
    
    <!-- 1st RelativeLayout will take up 2/3 of the parent's height -->
	<RelativeLayout
	    android:layout_width="fill_parent"
	    android:layout_weight="2"     
	    android:layout_height="0dip"> 
	    ...
	</RelativeLayout>
	<!-- 2nd RelativeLayout will take up 1/3 of the parent's height -->
    <RelativeLayout
	    android:layout_width="fill_parent"
	    android:layout_weight="1"     
	    android:layout_height="0dip"> 
	    ...
	</RelativeLayout>
	...
</LinearLayout>
```

### Setting layout_weight in code (programmatically)
While still easy to do, setting layout weight in code catch you (as it did me) up in a few places.

```java
// Main linear layout; will contain the slider and and value
LinearLayout mainLayout = new LinearLayout(ctx);
mainLayout.setOrientation(LinearLayout.VERTICAL);
	
// Create first inner layout
RelativeLayout innerLayout1 = new RelativeLayout(ctx);
LinearLayout.LayoutParams layoutParams1 = new LinearLayout.LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT, 2f);  
innerLayout1.setLayoutParams(layoutParams1);	

// Create first inner layout
RelativeLayout innerLayout2 = new RelativeLayout(ctx);
LinearLayout.LayoutParams layoutParams2 = new LinearLayout.LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT, 1f);  
innerLayout2.setLayoutParams(layoutParams2);

// Add new layouts to main, linear layout
mainLayout.addView(innerLayout1);  
mainLayout.addView(innerLayout2);
```

A few things to note:

1. We use ```LinearLayout.LayoutParams``` even though we are setting up the parameters on a ```RelativeLayout```. LayoutParams are in relation to the parent layout, which in our case is a LinearLayout.
1. ```0dip``` not used in the LayoutParam object; the orientation of the layout will indicate our scaling ratio; in our example we have a VERTICAL orientation, so the height will be the weighted property.
1. Make sure to cast the weighted value to a float (1f).

<div class="alert alert-info">
<b>Watch:</b> Any class that extends LinearLayout may have weighted children. When setting in code, be sure to use the extended parent class, not LinearLayout. Failing to do so will cause extremely confusing run time errors (I know from experience!)
</div>

For example, if you have a RadioGroup and you are setting your RadioButton weight use:
 
```java
RadioGroup.LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.WRAP_CONTENT, 1.0f));
```