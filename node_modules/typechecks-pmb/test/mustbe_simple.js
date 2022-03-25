/*jslint indent: 2, maxlen: 80, node: true */
/*globals Set: true*/
/* -*- tab-width: 2 -*- */
'use strict';

var mustBe = require('typechecks-pmb/must-be'), test,
  makeTest = require('./lib/mustbe_helper'),
  mustFail = require('equal-pmb').err;

function assErr(f) { mustFail(f, assErr.rx); }
assErr.rx = /^AssertionError: /;

test = makeTest('nonEmpty str');
test({ ok: 'hello' });
test({ isNot: 'nonEmpty',   nope: '' });
test({ isNot: 'str',        nope: undefined });
test({ isNot: 'str',        nope: null });
test({ isNot: 'str',        nope: true });
test({ isNot: 'str',        nope: [] });
test({ isNot: 'str',        nope: [0] });

test = makeTest('undef');
test({ ok: undefined });
test({ isNot: 'undef',      nope: 2 });
test({ isNot: 'undef',      nope: null });

test = makeTest('pos fin num');
test({ ok: 23.42 });
test({ isNot: 'pos',        nope: 0 });
test({ isNot: 'pos',        nope: -23.42 });
test({ isNot: 'fin',        nope: NaN });
test({ isNot: 'fin',        nope: Number.POSITIVE_INFINITY });
test({ isNot: 'num',        nope: '23' });

test = makeTest('neg0 int');
test({ ok: 0 });
test({ ok: -5 });
test({ isNot: 'int',        nope: -5.5 });
test({ isNot: 'int',        nope: Number.POSITIVE_INFINITY });
test({ isNot: 'neg0',       nope: 2 });

test = makeTest('nonEmpty');
test({ isNot: 'nonEmpty',   nope: '' });
test({ isNot: 'nonEmpty',   nope: { length: 0 } });
test({ ok: { length: 2 } });
test({ isNot: 'nonEmpty',   nope: [] });
test({ ok: [1, 2] });
test({ isNot: 'nonEmpty',   nope: {} });
test({ ok: { a: 1, b: 2 } });

test = makeTest('empty');
test({ ok: '' });
test({ ok: { length: 0 } });
test({ isNot: 'empty',      nope: { length: 2 } });
test({ isNot: 'empty',      nope: { length: NaN } });
test({ ok: [] });
test({ isNot: 'empty',      nope: [1, 2] });
test({ ok: {} });
test({ isNot: 'empty',      nope: { a: 1, b: 2 } });

mustFail(function fail() { mustBe.obj({}); },
  "AssertionError: [object Object] must be obj " +
  "but isn't obj: undefined");

mustFail(function fail() { mustBe.nest('again, no descr'); },
  "AssertionError: again, no descr must be nonEmpty str " +
  "but isn't str: undefined");

test = mustBe.oneOf([Boolean, null, NaN], 'input');
assErr(function fail() { test(123); });
assErr(function fail() { test(true); });
assErr(function fail() { test(false); });
test(Boolean);
test(null);
assErr(function fail() { test(NaN); });   // compare with next test

test = mustBe.oneOf(new Set([Boolean, null, NaN]), 'input');
assErr(function fail() { test(123); });
assErr(function fail() { test(true); });
assErr(function fail() { test(false); });
test(Boolean);
test(null);
test(NaN);      // with Set, NaN can be found.

test = makeTest([ ['same', NaN] ], 'same(number "NaN")');
test({ ok: NaN });
test({ isNot: 'same',  nope: 'NaN' });

test = makeTest([ ['same', 'NaN' ] ], 'same(string "NaN")');
test({ ok: 'NaN' });
test({ isNot: 'same',  nope: NaN });

test = mustBe.same([], "the world's very best empty array");
assErr(function fail() { test([]); });

test = makeTest('nul | nonEmpty str');
test({ ok: null });
test({ ok: '$6$SaltSalt$HashHashHash' });
test({ ok: '!' });      // locked linux account
test({ ok: 'true' });   // very exotic hash algo ;-)
test({ ok: 'false' });
test({ isNot: 'nul | nonEmpty', nope: '' });
test({ isNot: 'nul | str',      nope: 0 });
test({ isNot: 'nul | str',      nope: true });
test({ isNot: 'nul | str',      nope: false });
test({ isNot: 'nul | str',      nope: undefined });

test = makeTest('obj');
test({ ok: {} });
test({ ok: [] });
test({ ok: Object.create(null) });
test({ isNot: 'obj',    nope: Function });
test({ isNot: 'obj',    nope: '' });

test = makeTest('pojo');
test({ ok: {} });
test({ isNot: 'pojo',   nope: [] });
test({ isNot: 'pojo',   nope: Object.create(null) });
test({ isNot: 'pojo',   nope: Function });
test({ isNot: 'pojo',   nope: '' });

test = makeTest('nobj');
test({ isNot: 'nobj',   nope: {} });
test({ isNot: 'nobj',   nope: [] });
test({ ok: Object.create(null) });
test({ isNot: 'nobj',   nope: Function });

test = makeTest('dictObj');
test({ ok: {} });
test({ isNot: 'dictObj',  nope: [] });
test({ ok: Object.create(null) });
test({ isNot: 'dictObj',  nope: Function });

mustFail(function fail() { makeTest('length:3'); },
  'Error: Unsupported criterion: length');

test = makeTest('ofLength:3');
test({ ok: 'abc' });
test({ ok: [4, 5, 6] });
test({ isNot: 'ofLength',  nope: 'ab' });
test({ isNot: 'ofLength',  nope: [4, 5] });
test({ isNot: 'ofLength',  nope: 'abcd' });
test({ isNot: 'ofLength',  nope: [4, 5, 6, 7] });

test = makeTest('minLength:3');
test({ ok: 'abc' });
test({ ok: [4, 5, 6] });
test({ isNot: 'minLength',  nope: 'ab' });
test({ isNot: 'minLength',  nope: [4, 5] });
test({ ok: 'abcd' });
test({ ok: [4, 5, 6, 7] });

test = makeTest('maxLength:3');
test({ ok: 'abc' });
test({ ok: [4, 5, 6] });
test({ ok: 'ab' });
test({ ok: [4, 5] });
test({ isNot: 'maxLength',  nope: 'abcd' });
test({ isNot: 'maxLength',  nope: [4, 5, 6, 7] });

test = makeTest('thenable');
test({ isNot: 'thenable',  nope: {} });
test({ isNot: 'thenable',  nope: String });
test({ isNot: 'thenable',  nope: 5 });
test({ ok: { then: String } });

test = makeTest('buf');
test({ isNot: 'buf',  nope: {} });
test({ isNot: 'buf',  nope: String });
test({ isNot: 'buf',  nope: '' });
test({ ok: Buffer.from('yes') });











console.log("+OK mustbe_simple tests passed.");
  //= "+OK mustbe_simple tests passed."
