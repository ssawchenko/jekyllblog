---
title: "How to: Read an HttpURLConnection Response into a String"
layout: post
categories:
- android
tags:
- java
---

While creating a library that wraps up asynchronous http connection requests I wrote a handy helper function that takes an 
open HttpURLConnection and reads the resulting input stream into a String. I figured it was useful to me, so it may be useful 
to someone else as well. I continue on in my library to parse the String into either XML or JSON; this function simply returns 
a raw String for you to use as you please.

<!-- more -->

``` java
private String TAG = "MyAwesomeApp";
/**
 * @param connection object; note: before calling this function, 
 *   ensure that the connection is already be open, and any writes to 
 *   the connection's output stream should have already been completed.
 * @return String containing the body of the connection response or 
 *   null if the input stream could not be read correctly
 */
private String readInputStreamToString(HttpURLConnection connection) {
	String result = null;
	StringBuffer sb = new StringBuffer();
	InputStream is = null;
	
	try {
		is = new BufferedInputStream(connection.getInputStream());
		BufferedReader br = new BufferedReader(new InputStreamReader(is));
		String inputLine = "";
		while ((inputLine = br.readLine()) != null) {
			sb.append(inputLine);
		}
		result = sb.toString();
	}
	catch (Exception e) {
		Log.i(TAG, "Error reading InputStream");
		result = null;
	}
	finally {
		if (is != null) {
			try { 
				is.close(); 
			} 
			catch (IOException e) {
				Log.i(TAG, "Error closing InputStream");
			}
		}	
	}

	return result;
}
```

Or if you prefer, check out the [Gist](https://gist.github.com/ssawchenko/9282300)