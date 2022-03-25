
<!--#echo json="package.json" key="name" underline="=" -->
esmod-pmb
=========
<!--/#echo -->

<!--#echo json="package.json" key="description" -->
Use esm (ES modules, import, export for Node v6) with less boilerplate.
<!--/#echo -->


Usage
-----

Let's assume you have an ES module like [`usage.mjs`](test/usage.mjs):

<!--#include file="test/usage.mjs" code="javascript" -->
<!--#verbatim lncnt="7" -->
```javascript
import dfOnly from './default-export-only';
import * as named from './named-exports-only';

export default dfOnly;
export const { foo, answer } = named;
```
<!--/include-->

… and you want to use it from old node's CommonJS realm.
The `esm` module can do it:

```javascript
module.exports = require('esm')(module)('./usage.mjs')
```

But that's still a bit too much boilerplate for my taste.
Don't waste your time micro-managing the filename
and whether you should add `.default` to the above formula!
There's a much easier way:

Make a bridge module with almost the same name,
except it ends with `.node.js` instead of `.mjs`
(thus here, [`usage.node.js`](test/usage.node.js)):

<!--#include file="test/usage.node.js" code="javascript" -->
<!--#verbatim lncnt="3" -->
```javascript
require('esmod-pmb')(module);
```
<!--/include-->

It should work out of the box:

```bash
$ nodejs -p "require('./usage.node.js')"
{ foo: [Getter], answer: [Getter], default: [Getter] }
```

To see values instead of getters, copy them to another object:

```bash
$ nodejs -p "Object.assign({}, require('./usage.node.js'))"
{ foo: 23,
  answer: 42,
  default: { isDefaultExport: true, bar: 5 } }
```

For modules that have a default export and no named exports,
like [`default-export-only.mjs`](test/default-export-only.mjs):

<!--#include file="test/default-export-only.mjs" code="javascript" -->
<!--#verbatim lncnt="3" -->
```javascript
export default { isDefaultExport: true, bar: 5 };
```
<!--/include-->

… your bridge module will export that as the top level:

```bash
$ nodejs -p "require('./default-export-only.node.js')"
{ isDefaultExport: true, bar: 5 }
$ nodejs -p "require('esm')(module)('./default-export-only.mjs')"
{ default: [Getter] }
```



API
---

```javascript
// standard:
require('esmod-pmb')(module);

// custom options:
require('esmod-pmb')(module, { preferDefaultExport: false });

// detailed:
var bridgeBuilder = require('esmod-pmb');
var opt = { reexport: false };
var esmRequire = bridgeBuilder(module, opt);
var yourEsModule = esmRequire('./yourmodule.mjs');
```

This module exports one function:

### esmRqr = bridgeBuilder(baseModule[, opt])

Returns an ESM-capable `require`-like function obtained from `esm`.

The optional options object `opt` can be used to modify the default
options.

If you need custom options for something you consider "normal"/"usual",
please file an issue so we can try to provide better defaults.
After all, the purpose of this module is to _reduce_ boilerplate.

That said, `bridgeBuilder` uses the same options object as `esm`,
so you can use all of its options, and some additional ones:

  * `reexport`: (bool, default: true)
    Whether `bridgeBuilder` shall do its main magic:
    1. guess the name of your ES module,
    1. import it,
    1. (skippable) resolve the imported bindings
    1. and "re-export" them, i.e. assign the imported values to
      `baseModule.exports`.
    * Set to `false` to opt-out of the main magic, but still get an `esmRqr`
      with the combined options based on this module's defaults.

Options used only when `reexport` is enabled:

  * `stripSuffixes`: (regexp) and `addSuffix` (string, default: `".mjs"`)
    To guess the ES module filename, the `bridgeBuilder` removes the part
    matched by `stripSuffixes` and appends `addSuffix`.

  * `resolveImportedValues`: (bool, default: `true`)
    Whether to resolve (copy) the imported values.
    Set to `false` if you prefer getter functions.
    Sane modules usually shouldn't mutate their exports,
    so usually resolving them makes life easier
    by reducing the amount of magic involved.

  * `preferDefaultExport`: Determines which of the ESM exports
    shall be re-export into CommonJS land.
    * `false` = all of them. The re-export will be a dictionary (object).
      If the ES module only has a default export, the dictionary will
      contain only one key, `default`.
    * `true` = only the default export.
      If the ES module doesn't have a default export,
      the re-export will be `undefined`.
    * `1` (as a number; also the default) = automatic.
      The re-export will be a dictionary with all exports, except in case
      there is only one single export and its name is `default`; in that case,
      that default export will be re-exported directly.














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
