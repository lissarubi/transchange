/*jslint indent: 2, maxlen: 80, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

var is = require('typechecks-pmb'), eq = require('equal-pmb'), x;

function StrangeError(msg) {
  RangeError.call(this, msg);
  this.name = 'StrangeError';
  this.message = msg;
}
StrangeError.prototype = new RangeError('bad proto range');

x = new StrangeError('never seen *that* before');

eq(String(x), 'StrangeError: never seen *that* before');
eq('Object',  is.ncls(x));
eq(true,      is.ncls(x, 'Object'));
eq(false,     is.ncls(x, 'Error'));

eq('Error',   is.ncls(new Error('foo')));
eq('Error',   is.ncls(new RangeError('bar')));
eq(true,      is.ncls(new Error('foo'), 'Error'));
eq(true,      is.ncls(new RangeError('bar'), 'Error'));
eq(false,     is.ncls(new RangeError('bar'), 'RangeError'));

eq('Date',    is.ncls(new Date()));
eq('RegExp',  is.ncls(/x/));
eq(true,      is.ncls(/x/, 'RegExp'));
eq(false,     is.ncls(/x/, 'Regexp'));
eq(false,     is.ncls(Buffer.from('hello'), 'Buffer'));
eq(true,      is.ncls(Buffer.from('hello'), 'Uint8Array'));















console.log("+OK ncls test passed.");   //= "+OK ncls test passed."
