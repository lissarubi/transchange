
<!--#echo json="package.json" key="name" underline="=" -->
p-fatal
=======
<!--/#echo -->

<!--#echo json="package.json" key="description" -->
Re-throw unhandled promise rejections in the next turn, so other listeners get
a chance to also run.
<!--/#echo -->



API
---

This module exports nothing.
It does all work as a side effect of importing it.



<!--#toc stop="scan" -->



Known issues
------------

* Versions 0.1.x don't care whether the rejection becomes handled later.
  I currently consider this a feature, but I'd be willing to offer opt-out.
  I think it's still a better idea to setup your rejection handlers asap.




&nbsp;


License
-------
<!--#echo json="package.json" key=".license" -->
ISC
<!--/#echo -->
