// -*- coding: utf-8, tab-width: 2 -*-

import makeInternalCmd from './makeInternalCmd';

function makeParseTree() {
  const initialNode = makeInternalCmd('N');
  const tree = {
    nodes: [initialNode],
    trampoline: {},
  };
  return tree;
}

export default makeParseTree;
