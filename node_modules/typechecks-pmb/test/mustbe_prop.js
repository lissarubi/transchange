/*jslint indent: 2, maxlen: 80, node: true */
/*globals Set: true*/
/* -*- tab-width: 2 -*- */
'use strict';

var mustBe = require('typechecks-pmb/must-be'), equal = require('equal-pmb');

function fails(f) { equal.err(f, /^AssertionError: /); }

(function () {
  var obj = { purpose: undefined, enabled: true },
    getProp = mustBe.prop(obj),
    getN = mustBe.prop(obj, 'num'),
    getB = mustBe.prop(obj, 'bool'),
    getU = mustBe.prop(obj, 'undef');

  equal(getProp('undef',  'purpose'),             undefined);
  equal(getProp('undef',  'purpose',  undefined), undefined);
  equal(getU('purpose'),                          undefined);
  equal(getU('purpose',               undefined), undefined);

  equal(getProp('bool',   'enabled'),         true);
  equal(getProp('bool',   'enabled',  true),  true);
  equal(getProp('bool',   'enabled',  false), true);
  equal(getB('enabled'),                      true);
  equal(getB('enabled',               true),  true);
  equal(getB('enabled',               false), true);

  // Default is used for values that are not set:
  equal(getProp('bool', 'elephant', true),  true);
  equal(getProp('bool', 'elephant', false), false);
  equal(getProp('num',  'elephant', 42),    42);
  equal(getProp('num',  'elephant', 42),    42);
  fails(function () { getProp('bool', 'elephant', 42); });
  equal(getB('elephant',            true),  true);
  equal(getB('elephant',            false), false);
  equal(getN('elephant',            42),    42);
  equal(getN('elephant',            42),    42);
  fails(function () { getB('elephant', 42); });

  // Bad default value doesn't matter as long as it isn't used:
  equal(getProp('bool',   'enabled',  42), true);
  equal(getProp('undef',  'purpose',  'fun'), undefined);
  equal(getB('enabled',               42), true);
  equal(getU('purpose',               'fun'), undefined);

  // Good default cannot help if a bad value is set:
  fails(function () { getProp('undef',  'enabled',  undefined); });
  fails(function () { getProp('bool',   'purpose',  true); });
  fails(function () { getU('enabled',               undefined); });
  fails(function () { getB('purpose',               true); });
}());






console.log("+OK mustbe_prop tests passed.");
  //= "+OK mustbe_prop tests passed."
