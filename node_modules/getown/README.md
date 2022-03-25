
<!--#echo json="package.json" key="name" underline="=" -->
getown
======
<!--/#echo -->

<!--#echo json="package.json" key="description" -->
Lookup an object property only if it&#39;s its own property.
<!--/#echo -->



API
---

This module exports one function:

### getown(obj, prop, fallback)

Returns `obj[prop]` if `obj` is truthy and has an own property `prop`,
otherwise returns `fallback`.



Usage
-----

from [test/usage.mjs](test/usage.mjs):

<!--#include file="test/usage.mjs" transform="mjsUsageDemo1802" -->
<!--#verbatim lncnt="9" -->
```javascript
import getown from 'getown';
const dict = { foo: 'bar' };
same(getown(dict, 'foo'), 'bar');
same(getown(dict, 'bar'), undefined);
same(getown(dict, 'bar', 321), 321);
same(typeof dict.toString, 'function');
same(getown(dict, 'toString'), undefined);
```
<!--/include-->


<!--#toc stop="scan" -->



Known issues
------------

* Needs more/better tests and docs.




&nbsp;


License
-------
<!--#echo json="package.json" key=".license" -->
ISC
<!--/#echo -->
