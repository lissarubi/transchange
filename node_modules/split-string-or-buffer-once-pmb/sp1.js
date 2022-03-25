/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

function splitOnce(sep, input) {
  var opt = false, sLen, pos, head, tail;
  if (sep && (sep.length === undefined)) {
    opt = sep;
    sep = opt.sep;
  }
  sLen = (+(sep || false).length || 0);
  if (sLen <= 0) {
    sep = input.slice(0, 0);
    return (opt.last ? [input, sep] : [sep, input]);
  }
  pos = (opt.last ? input.lastIndexOf(sep) : input.indexOf(sep));
  if (pos < 0) {
    pos = opt.notFound;
    if (!pos) { return false; }
    if (pos === 'orig') { return input; }
    if (pos === 'just0') { return [input]; }
    if (pos === 'empty0') { return [input.slice(0, 0), input]; }
    if (pos === 'empty1') { return [input, input.slice(0, 0)]; }
    throw new Error('Unsupported value for "notFound" option: ' + pos);
  }
  head = input.slice(0, pos);
  tail = input.slice(pos + sLen);
  return [head, tail];
}


module.exports = splitOnce;
