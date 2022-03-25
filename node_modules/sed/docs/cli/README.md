
node-sed CLI
============

* __⚠__ While I try to keep the [script syntax](../script_syntax/)
  mostly compatible with [GNU sed](https://www.gnu.org/software/sed/),
  the CLI arguments are very different.
  If you need a tool with same CLI arguments as the original GNU sed,
  please use GNU sed.



Usage
-----

`node-sed command [command […]] [-- inputFile [inputFile […]]]`


State
-----

To understand the command descriptions, you should know the concepts
described as the _state_ in the [script syntax docs](../script syntax/).



CLI commands
------------

* `--` –
  Treat all remaining CLI arguments as if they were prefixed with `tr:file:`.
* `init` –
  Reset all state to its defaults.
* `set:NAME:VALUE` –
  Set _setting_ `NAME` to `VALUE`.
* `sc:file:FILENAME` –
  Add script commands from text file `FILENAME` to the CPT.
* `sc:arg:CODE` –
  Add script commands from literal script code `CODE` to the CPT.
* `sc:cmd:LCMD` –
  Add a single lCmd from literal script code `CODE` to the CPT.
* `tr:file:FILENAME` –
  Read the content from text file `FILENAME` and transform it.
  * If the `outFileSubst` setting is not empty, first use that to
    calculate the output filename and set output target to that file.
    `outFileSubst` is expected to contain exactly two U+003A colon characters,
    dividing it into `body:template:flags`.
    These which will be used for a native JavaScript RegExp replace,
    so your template must use JS syntax, not sed.
* `tr:arg:TEXT` –
  Transform the literal input text `TEXT`.
* `tr:stdin` –
  Transform standard input.


























<!-- scroll -->
