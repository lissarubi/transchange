/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
/*global Promise:true */
'use strict';

var EX, splitWithSeparateMatchGroups = require('split2'),
  pumpify = require('pumpify'),
  through2pr = require('through2-promise'),
  isBuf = Buffer.isBuffer;


function defaultCombine(parts) {
  var p1 = parts[0];
  return (isBuf(p1) ? Buffer.concat(parts) : p1.concat(parts.slice(1)));
}


function decideCombinator(c) {
  if (c) { return c; }
  if (c === false) { return null; }
  return defaultCombine;
}


EX = function makeLineSplitter(opt) {
  if (!opt) { opt = false; }
  var collect = [], nGrp = opt.nEolGroups,
    combine = decideCombinator(opt.combine),
    preSplit = splitWithSeparateMatchGroups(opt.sep || /(\n)/), pipeLine,
    thrOpt = Object.assign({}, opt.throughOpt);
  if (!Number.isFinite(nGrp)) { nGrp = 1; }
  if (opt.obj || (!combine)) { thrOpt.objectMode = true; }

  function shipIt(pushable) {
    var parts = collect.slice();
    collect = [];
    function pushIt(x) { pushable.push(x); }
    return Promise.resolve(parts).then(combine).then(pushIt);
  }

  function onChunk(data) {
    collect.push(data);
    return ((collect.length > nGrp) ? shipIt(this) : null);
  }

  function onEnd() { return (collect.length ? shipIt(this) : null); }

  pipeLine = [
    preSplit,
    through2pr(thrOpt, onChunk, (opt.discardRemainder ? undefined : onEnd)),
  ].concat(opt.extraPipes).filter(Boolean);
  if (thrOpt.objectMode) { return pumpify.obj(pipeLine); }
  return pumpify(pipeLine);
};


module.exports = EX;
