
<!--#echo json="package.json" key="name" underline="=" -->
split-string-or-buffer-once-pmb
===============================
<!--/#echo -->

<!--#echo json="package.json" key="description" -->
Generic splitOnce, using indexOf and slice so it can work on strings and
buffers alike.
<!--/#echo -->



API
---

This module exports one function:

### simple = splitOnce(sep, input)

`input` is the String, Buffer, or other compatible value you want to split.

`sep` is whatever `input.indexOf()` shall search for.
However, `sep` must have a number as its `length` property.

Returns an array with two slices of `input` if `sep` was found,
or `false` otherwise.



### advanced = splitOnce(opt, input)

Similar as above, but with an options object `opt`.

Required properties on `opt`:
* `sep`: Same as the `sep` above.

Optional properties:
* `last`: If set to a truthy value, use `lastIndexOf` to search for `sep`.

Confusing properties: If for some exotic reason your `opt` could
happen to have a `length` property, make sure it's set to `undefined`,
or the `opt` might be mistaken for `sep`.



Usage
-----

from [test/usage.js](test/usage.js):

<!--#include file="test/usage.mjs" transform="mjsUsageDemo1802" -->
<!--#verbatim lncnt="24" -->
```javascript
import splitOnce from 'split-string-or-buffer-once-pmb';

const hsw = 'hello string world';
equal(splitOnce(' ', hsw),
  ['hello', 'string world']);

function buf(x) { return Buffer.from(x); }
const hbw = buf('hello buffer world');
equal(splitOnce(' ', hbw),
  [buf('hello'), buf('buffer world')]);
equal(splitOnce('', hbw),
  [buf(''), buf('hello buffer world')]);

let opt = { sep: ' ', last: true };
equal(splitOnce(opt, hsw),
  ['hello string', 'world']);
equal(splitOnce(opt, hbw),
  [buf('hello buffer'), buf('world')]);

opt = { sep: '', last: true };
equal(splitOnce(opt, hsw),
  ['hello string world', '']);
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
