// -*- coding: utf-8, tab-width: 2 -*-

import fs from 'fs';

import mustBe from 'typechecks-pmb/must-be';

import makeParseTree from '../parse/makeParseTree';

const dfSett = {
  encoding: 'utf8',
  longPfx: '_',
  afterWork: '',
  autoPrint: 'p',
  outFileSubst: '',
};

const prFs = {
  createReadStream: fs.createReadStream,
  createWriteStream: fs.createWriteStream,
};

function cmdInit(oldState) {
  const origMust = mustBe.tProp('old state', oldState);
  const state = {
    cliArgs: origMust('ary', 'cliArgs'),
    settings: { ...dfSett },
    inBuf: '',
    inLnCnt: 0,
    altBuf: '',
    nameBuf: {},
    parseTree: makeParseTree(),
    mCnt: 0,
    outputDest: process.stdout,
    prFs,
  };
  return state;
}

export default cmdInit;
