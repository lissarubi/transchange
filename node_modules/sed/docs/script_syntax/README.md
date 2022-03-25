
Script syntax
=============

Differences to GNU sed script syntax
------------------------------------

* At this early stage of development, the parser accepts only one
  command per line, optionally with one condition in front of it.
* Not all commands are available yet.
* Not all letter-named and numeric backslash sequences are supported.



State
-----

A lot of these concepts probably exist in GNU sed with a different name.
However, node-sed is aimed to be an alternate approach to the same problem,
rather than a reimplementation of GNU sed.

The _state_ exists even before any script command is read.
It consists of these parts:

* The available __settings__
  are explained in the like-named chapter below.

* The __input buffer (inBuf)__
  is text that has been read but not released yet,
  much like the "pattern space" in GNU sed.

* The __input line counter (inLnCnt)__
  counts how many lines of input have been read.

* The __alternate buffer (altBuf)__
  is another buffer,
  much like the "hold space" in GNU sed.

* Any number of __named buffers (nameBuf)__
  which are buffers with a user-defined name.
  They are created on-the-fly as needed, and removed when they become empty.

* The __current parse tree (CPT)__
  is where node-sed remembers what to do when input is read.
  * It consists of __tree nodes__.
    A tree node that encodes a command is a __command node__.
  * It always has an __initial node__ onto which script commands can be added.
    The initial node is always an `N` command.
  * The __end node__ is an imaginary node at the end of the outermost command
    list. Its behavior can be controlled by the `afterWork` setting.
  * A __trampoline__
    is a dictionary that remembers positions in the _current parse tree_
    by custom names.

* The __match counter (mCnt)__ counts successful regexp matches.
  It starts at 0.



Further definitions
-------------------

* The __command scope__
  is the text that forms one command.
  It currently reaches to the end of the line.

* A __virtual command string (vCmd)__
  is a sequence of zero or more characters that can be executed as if each
  of its characters were an upcoming command node in the CPT, with the
  command denoted by that character. (Thus, it is limited to only cCmd.)

* A __single character command (cCmd)__
  is a command whose name is just one character.
  Some of them can have one or more arguments.

* A __long command (lCmd)__
  is a command whose name has multiple characters.



Settings
--------

### encoding

Which encoding to use for file content being read or written.
Supported values are:
* `utf8` (default)
* `latin1`

### longPfx

The sequence used to indicate the start of an lCmd.
If empty, lCmd are disabled.
Default: `_` (U+005F low line)

### afterWork

Defines the behavior of the end node.
Defaults to the empty string, which means to continue at the initial node.
Can also be a vCmd, but in this case the only supported value is `q`.

### autoPrint

A vCmd to execute before each `n` or `q` command.
The supported values are `p` (default) and the empty string.

### outFileSubst

Used for the `tr:file:…` CLI command.



cCmd
----

In headlines with spaces, the character before the first space is meant
literally.
The words behind the first space describe order and name of additional
syntax elements described individually.


### p

Print the inBuf
and one U+000A Line Feed character.

### =

Print the number of lines read in the current transformation,
and one U+000A Line Feed character.

### n

Reset mCnt, clear the inBuf and read the next line from input.
If there is no next line beause we reached the end of input, execute `q`.

### N

Reset mCnt.
If any input was read yet, append a U+000A Line Feed character to inBuf.
After that, read the next line from input.
If there is no next line beause we reached the end of input, execute `q`.

### q

Stop the current transformation and abandon it.

### # comment

Ignore `comment`, which is any text remaining in the command scope.

### s sep body sep template sep flags opt

Apply a JavaScript RegExp string replacement on the inBuf.
If a match was found, increment mCnt by one.

* `sep` means any one of the characters `!"#$%&',/:=@|~`,
  but both `sep` have to be the same.
* `body` is the body of the JavaScript RegExp.
  In case `body` is empty, act as if there was a match result with only one
  match group that is the entire inBuf.
* `template` is the template for replacement text.
  It can contain positive single-digit backslash escape sequences
  to refer to match groups 1 to 9.
* `flags` is one or more letter to be used as flags for the
  JavaScript RegExp.
* Things that are not allowed to occurr inside `body` and `template`
  (use `\x##` or `\u####` escape sequences instead):
  * the `sep` character
  * octal character escape sequences
* `space` means one or more U+0020 space characters.
* `opt` is a sequence of zero or more keywords that enable options
  not supported by GNU sed. Each keyword may occurr up to once and
  must be preceeded by one or more U+0020 space character(s).
  The supported option keywords are:
  * `import`:
    The template result is to be treated as a CommonJS import ID,
    the module imported and its default export (which should be a function)
    is invoked with the RegExp match groups as the parameters.
    The match is replaced with the result of this function,
    promises are supported.
  * `altbuf`: (Hint: All lowercase.)
    Instead of modifying inBuf, store the template result into altBuf,
    discarding the previous content.

### : label

The resulting command node does nothing.
However, when the script is parsed, this command node is registered
in the trampoline with name `label`.
Whitespace on the sides of `label` are stripped.

### b label

If `label` is empty, continue at the end node.
Otherwise, continue at the command node named `label` in the trampoline.
Whitespace on the sides of `label` are ignored.

### t label

Reset mCnt.
If it had been positive before the reset, act like the `b` command.

### T label

If mCnt is positive, reset it. Otherwise, act like the `b` command.












lCmd
----

None yet.

















<!-- scroll -->
