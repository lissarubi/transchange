/*jslint indent: 2, maxlen: 80, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

var is = require('typechecks-pmb'), eq = require('equal-pmb'), ne = eq.ne, x;

x = {};
eq(Object.prototype,    is.proto(x));
ne(Object,              is.proto(x));
eq(Object.prototype,    is.proto(x, 'foo'));  // .proto takes just 1 arg.
eq(Object.prototype,    is.proto(x, 'bar'));
eq(Object.prototype,    is.proto(x, null));

x = Object.create(null);
eq(null,      is.proto(x));
eq(null,      is.proto(x, null));   // as said, just 1 arg.

eq(is.proto(null),    false);
eq(is.proto(false),   false);
eq(is.proto(true),    false);

// Notify if some day the return value of "false" may become ambiguous:
eq.err(function () { Object.create(false); },   TypeError);
// How about other primitives?
eq.err(function () { Object.create(true); },    TypeError);
eq.err(function () { Object.create(123); },     TypeError);
eq.err(function () { Object.create('foo'); },   TypeError);


x = /yz/;
eq(RegExp.prototype,  is.proto(x));
ne(RegExp,            is.proto(x));

x = new Date();
eq(Date.prototype,  is.proto(x));
ne(Date,            is.proto(x));

















console.log("+OK proto tests passed.");   //= "+OK proto tests passed."
