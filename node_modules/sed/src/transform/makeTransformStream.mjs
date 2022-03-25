// -*- coding: utf-8, tab-width: 2 -*-

import makeLineSplitter from 'split-stream-lines-preserve-eol-pmb';
import through2pr from 'through2-promise';

async function makeTransformStream(state) {
  async function onChunk(buf) {
    const text = buf.toString(state.settings.encoding);
    const eol = (text.slice(-1) === '\n');
    const line = (eol ? text.slice(0, -1) : text);
    this.push('>> ' + line + ' <<');
    if (eol) { this.push('\n'); }
  }

  function onEnd() { this.push('done.\n'); }

  return makeLineSplitter({
    extraPipes: [through2pr(onChunk, onEnd)],
  });
}

export default makeTransformStream;
