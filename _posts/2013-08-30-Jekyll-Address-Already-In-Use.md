---
title: "TCPServer Error: Address already in use"
layout: post
categories:
- jekyll
---

At some point in your Jekyll travels you may get your sever in a state such that the TCPServer connection remains in use, even after killing Jekyll. When attempting to kick Jekyll back into action, an error such as the following may be seen:

```bash
[2013-08-30 11:58:44] WARN  TCPServer Error: Address already in use - bind(2)
error: Address already in use - bind(2). Use --trace to view backtrace
```

To fix this you must determine the process ID associated with the TCP port Jekyll is using (by default 4000), kill it and then restart Jekyll.

<!-- more -->

```bash
$ lsof -wni tcp:4000
COMMAND   PID       USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
ruby    43631      <user>  13u  IPv4 0x3453ebb5e10f92c9      0t0  TCP *:terabase (LISTEN)

$ kill -9 43631
$ jekyll --watch serve
```


### References 
http://stackoverflow.com/questions/10261477/tcpserver-error-address-already-in-use-bind2


