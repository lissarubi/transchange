// -*- coding: utf-8, tab-width: 2 -*-

import endOfStreamPr from 'end-of-stream-promise';

import makeStreamReader from './makeStreamReader';
import makeTransformStream from '../transform/makeTransformStream';

function isStdio(stm) {
  if (stm === process.stdin) { return true; }
  if (stm === process.stdout) { return true; }
  if (stm === process.stderr) { return true; }
  return false;
}

function waitExceptStdio(stm) { return (isStdio(stm) || endOfStreamPr(stm)); }

async function cmdTr(state, param) {
  const inputStm = await makeStreamReader(state, param);
  const resultStm = inputStm.pipe(await makeTransformStream(state));
  const outStm = resultStm.pipe(state.outputDest);
  await Promise.all([
    inputStm,
    resultStm,
    outStm,
  ].map(waitExceptStdio));
}

export default cmdTr;
