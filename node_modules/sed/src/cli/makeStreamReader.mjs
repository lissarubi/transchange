// -*- coding: utf-8, tab-width: 2 -*-

import intoStream from 'into-stream';
import makeLineSplitter from 'split-stream-lines-preserve-eol-pmb';
import pReadNextChunk from 'p-read-next-stream-chunk';

import subCmd from './subCmd';


const inputStreamByType = {
  stdin() { return process.stdin; },
  arg(x) { return intoStream(x); },
  file(path, state) { return state.prFs.createReadStream(path); },
};


function isAtLeast(n, l) { return Number.isFinite(n) && (n >= l); }

async function makeStreamReader(state, param) {
  const { impl, args } = subCmd(inputStreamByType, param,
    { what: 'input source type' });
  return await impl(args, state);
}

export default makeStreamReader;
