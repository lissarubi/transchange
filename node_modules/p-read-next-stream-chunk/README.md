
<!--#echo json="package.json" key="name" underline="=" -->
p-read-next-stream-chunk
========================
<!--/#echo -->

<!--#echo json="package.json" key="description" -->
Extended next-chunk.
<!--/#echo -->


If you just want an alias module for directly importing
`next-chunk`'s `nextChunk` function, without the extra features:

```javascript
import pReadNextStreamChunk from 'p-read-next-stream-chunk/alias'
```



API
---

This module exports one function:

### pReadNextStreamChunk(someReadableStream[, opts])

Tries to read one next chunk from `someReadableStream`.
Returns a promise for that next chunk.
Should return `null` at end of stream as per
[the objectMode spec][object-mode-spec].

`opts` is an optional options object.
If it is set to a truthy value (e.g. an object),
`pReadNextStreamChunk` switches to factory mode,
returnung a function `preset` that remembers the `someReadableStream`.
`preset` will ignore any arguments and return promises for stream chunks.

`opts` supports these keys:

* `undef`: Translate `undefined` chunks to this value.
  Default: `undefined`
* `ignoreEmptyStr`: If set to a truthy value and the chunk is an
  empty string, ignore it.






<!--#toc stop="scan" -->



Known issues
------------

* Needs more/better tests and docs.
* No support for read length limits and cancellation.
  If you want those, have a look at @kevinoid's
  [promised-read](https://github.com/kevinoid/promised-read).




&nbsp;

  [object-mode-spec]: https://nodejs.org/dist/latest-v11.x/docs/api/stream.html#stream_object_mode

License
-------
<!--#echo json="package.json" key=".license" -->
ISC
<!--/#echo -->
