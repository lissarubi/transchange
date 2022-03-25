/*jslint indent: 2, maxlen: 80, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

var is = require('typechecks-pmb'), eq = require('equal-pmb');

eq(true,  is.weaklyEqual(false, 0));
eq(true,  is.weaklyEqual(false, ''));

eq(true,  is.same(false, false));
eq(true,  is.same('NaN', 'NaN'));
eq(true,  is.same(NaN, NaN));
eq(false, is.same(NaN, 'NaN'));
eq(false, is.same({}, {}));
eq(false, is.same([], []));
















console.log("+OK simple tests passed.");    //= "+OK simple tests passed."
