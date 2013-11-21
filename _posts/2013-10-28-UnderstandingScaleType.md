---
title: "Understanding ScaleType"
layout: post
categories:
- android
---

While attempting to correctly position an image into a container I came across the documentation for the android:scaleType attribute and realized
just how similar some of the types were. 

<!-- more -->

### Definitions
First let's have a look at the definitions of each as per the [Android Developer Documentation](http://developer.android.com/reference/android/widget/ImageView.ScaleType.html):

**Type** | **Definition**    
--- | ---
**CENTER** | *Center the image in the view, but perform no scaling*
**CENTER_CROP** | *Scale the image uniformly (maintain the image's aspect ratio) so that both dimensions (width and height) of the image will be equal to or larger than the corresponding dimension of the view (minus padding)*
**CENTER_INSIDE** | *Scale the image uniformly (maintain the image's aspect ratio) so that both dimensions (width and height) of the image will be equal to or less than the corresponding dimension of the view (minus padding)*
**FIT_CENTER** | *Scale the image using CENTER*
**FIT_END** | *Scale the image using END*
**FIT_START** | *Scale the image using START*
**FIT_XY** | *Scale the image using FILL*
**MATRIX** | *Scale using the image matrix when drawing*

<br />
ScaleTypes using CENTER and CENTER_INSIDE will not allow the image to become larger than it's original size. 
All other types may scale the image larger than its original size if the layout requires it. 

<div class="alert alert-info">
<b>Watch:</b> Images may degrade in quality if scaled into a parent much larger than their original size.
</div>
<div class="alert alert-info">
<b>Tip:</b> If you never wish your image to become larger than its original size, use CENTER or CENTER_INSIDE
</div>

### Examples
Now let's have a look at each side-by-side using cute little cow vector images:

<img class="img-responsive" src="/img/blog/2013-10-28-SizingImage_1.png" />

As we can see, CENTER and CENTER_INSIDE seem very similar, but once we shrink down the size of the containers to be smaller than the original image size, we can see the difference: CENTER_INSIDE will shrink the image to fit the container, where as CENTER will not.

<img class="img-responsive" src="/img/blog/2013-10-28-SizingImage_2.png" />

And that's it! Hopefully seeing side-by-side ScaleTypes really showcases the differences between the ScaleTypes.

### References
[Cute Cow by Martin Berube](http://www.iconarchive.com/show/animal-icons-by-martin-berube.html)
