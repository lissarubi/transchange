// -*- coding: utf-8, tab-width: 2 -*-

import vTry from 'vtry';

import subCmd from './subCmd';
import cliCmdImpls from './allCmdImpl';

async function nextCmd(state) {
  const { cliArgs } = state;
  const pos = cliArgs.pos + 1;
  if (pos >= cliArgs.length) { return; }
  cliArgs.pos = pos;
  const cmd = cliArgs.prefix + cliArgs[pos];
  if (cmd === '--') {
    cliArgs.prefix = 'tr:file:';
    return nextCmd(state);
  }
  async function doit() {
    const { impl, args } = subCmd(cliCmdImpls, cmd, { what: 'CLI command' });
    return impl(state, args);
  }
  const nextState = await vTry.pr(doit,
    'While processing CLI argument #' + (pos + 1))();
  return nextCmd(nextState || state);
}

function cliMain(args) {
  const cliArgs = Object.assign(args.slice(), { pos: -1, prefix: '' });
  const state = cliCmdImpls.init({ cliArgs });
  return nextCmd(state);
}

export default cliMain;
