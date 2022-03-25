/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

var repr = require('./lazyrepr');

function explainCrit(crit) {
  var detail = '';
  if (crit.map) {
    detail = '(' + crit.slice(1).map(repr).join(', ') + ')';
    crit = crit[0];
  }
  return String(crit) + detail;
}

module.exports = explainCrit;
