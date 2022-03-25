/*jslint indent: 2, maxlen: 80, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

var nextChunkPr = require('./alias');

function factoryMode(stream, opt) {
  var preset;
  function refine(chunk) {
    if (chunk === undefined) { return opt.undef; }
    if ((chunk === '') && opt.ignoreEmptyStr) { return preset(); }
    return chunk;
  }
  preset = function preset() {
    return nextChunkPr(stream).then(refine);
  };
  return preset;
}

function pReadNextStreamChunk(someReadableStream, opt) {
  if (opt) { return factoryMode(someReadableStream, opt); }
  return nextChunkPr(someReadableStream);
}

module.exports = pReadNextStreamChunk;
