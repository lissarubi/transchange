
<!--#echo json="package.json" key="name" underline="=" -->
sed
===
<!--/#echo -->

<!--#echo json="package.json" key="description" -->
Embrace and extend GNU sed, the stream editor for filtering and transforming
text.
<!--/#echo -->


&nbsp;

-----
-----

### Stability: Alpha preview

* Some parts seem to somewhat work already.
* The transform part is currently hard-coded to the equivalent of
  `sed -re 's~^~>> ~;s~$~ <<~;$a done.'`
* Uploading to npm anyway in order to announce the new repository.

-----
-----



&nbsp;


CLI
---

See [docs/cli/](docs/cli/).



API
---

This module ESM-exports an object with these methods:

### .cliMain(args)

Interpret the [CLI arguments](docs/cli/) given in array `args`.
Returns a promise for completion.

* __⚠__ While I try to keep the [script syntax](docs/script_syntax/)
  mostly compatible with [GNU sed](https://www.gnu.org/software/sed/),
  the CLI arguments [are very different](docs/cli/).
  If you need a tool with same CLI arguments as the original GNU sed,
  please use GNU sed.



### .transform(state[, input])

Transform text according to `state`, which should be an object with a
property `parseTree`, whose value should be the result of `.parse`-ing
a sed script.

If `input` is…

* `null` or `undefined` (e.g. not given), return a transform stream that
  you can pipe your text into.
* a string, return a promise for the transformed stream.
* a buffer, it will be converted to a string using node's default encoding,
  then processed as if that string was given.

In addition to the mandatory `parseTree` property, `state` may contain
any of these optional properties:

* `prFs`: An object with an interface similar to the
  [Node.js fs Promises API](https://nodejs.org/docs/latest/api/fs.html).
  Providing it will enable script commands that need file system access.



### .parse(script[, grow])

Parse sed commands from string `script`. Returns a promise for an opaque
truthy value that represents the resulting parse tree.
The only purpose of exposing the parse tree is so that you can reuse it
for multiple invocations of `.transform`,
so avoid relying on its internal structure in any way.

If `grow` is provided, it is expected to be an existing parse tree,
and that one will be extended in-place rather than creating a new one.








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
