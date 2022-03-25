
<!--#echo json="package.json" key="name" underline="=" -->
split-stream-lines-preserve-eol-pmb
===================================
<!--/#echo -->

<!--#echo json="package.json" key="description" -->
Split a stream into lines that include their line terminator if they had one.
<!--/#echo -->



API
---

This module exports one function:

### makeLineSplitter(opt)

Returns a duplex stream that splits the input by lines.

`opt` is an optional options object that supports these keys:

* `sep`: RegExp for what you consider a line terminator. Default: `/(\n)/`
* `nEolGroups`: The number of match groups in `sep`. Default: `1`
* `discardRemainder`:
  Boolean, whether to silently discard the last line if it was not
  properly terminated. Default: `false`

These experimental options are planned but do not work reliably yet:

* `throughOpt`: Options to pass through to `through2`. Default: empty object.
* `obj`: A shortcut for enabling `objectMode` in `throughOpt`.
  Boolean. Default: `false`
* `combine`:
  A function that merges the line with the match group(s) of its terminator.
  It will be called with one argument, a flat array of all these parts.
  Can also be `false` to pass on said array, auto-enabling the `obj` option.
  Defaults to a function that can concat either buffers and strings.




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
