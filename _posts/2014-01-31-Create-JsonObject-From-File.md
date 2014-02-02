---
title: Creating a JSONObject from a File Resource
layout: post
categories:
- android
tags:
- java
---

While writing up a unit test for a service I had written, I needed to parse out a JSON test string into a large JSON object. I found the best way to do 
this was to place the test data in a file located in the 'res/raw' folder (create this folder if your project does not include it already) and
then read the file, and parse it as a JSON object. 

<!-- more -->

```java 
private JSONObject createJSONFromFile(int fileID) {
   	
	JSONObject result = null;
	
	try {
		// Read file into string builder
        InputStream inputStream = mTestContext.getResources().openRawResource(fileID);
        BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream));
		StringBuilder builder = new StringBuilder();
		
		for (String line = null; (line = reader.readLine()) != null ; ) {
			builder.append(line).append("\n");
		}
			
		// Parse into JSONObject	
		String resultStr = builder.toString();
		JSONTokener tokener = new JSONTokener(resultStr);
		result = new JSONObject(tokener);
   	}
   	catch (Exception ex) {
   		ex.printStackTrace();	
   	}
   	
   	return result;
}

private void loadTestFile() {
	JSONObject test = createJSONFromFile(R.raw.testdata_valid);
	// ... do awesome stuff with test data ...
}

```

<div class="alert alert-info">
<b>Note:</b> It is good practice to place large sets of test data in resource files (and not simply hard code data strings into a test object).
Since a string literal (or constant String expression) cannot be more than 65535 characters(1) you may run into problems manually building
projects that contain these large strings.
</div>

### References:
* (1) [Java class file format docs](http://docs.oracle.com/javase/specs/jvms/se7/html/jvms-4.html)