
<!--#echo json="package.json" key="name" underline="=" -->
vtry
====
<!--/#echo -->

<!--#echo json="package.json" key="description" -->
tryit + verror = Verbosely try.
<!--/#echo -->




API
---

This module exports one function that can be called in several ways
described below. In each case,

* `f` is the original function that might throw.
* `g` is a proxy function that wraps `f`, preserving context (`this`)
  and arguments. If no error is thrown, it forwards the result.


### g = vtry(f)

Errors are silently ignored.


### g = vtry(f, hnd[, ...args])

In case of an error, return `hnd(err, ...args)`.


### g = vtry(f, errMsg[, errOpt])

* Required prior knowledge: [verror](https://www.npmjs.com/package/verror)

Decorate potentially-cryptic errors with an error message `errMsg` that
ideally describes what operation you were trying to perform.
`errMsg` must be either a non-empty string or an array.
It will be used as the `sprintf_args` to `VError`.
`errOpt` are the `options` as described in `VError`.



&nbsp;

### Promise API

There's also a method `vtry.pr` ("Promise") which works almost as above,
except it takes an async function `f` and returns an async function `g`.
As a special convenience, supplying `1` (the number) as `f` is a shorthand
for the identity function, so you can easily pass existing promises to `g`.






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
