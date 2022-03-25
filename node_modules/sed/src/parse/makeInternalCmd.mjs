// -*- coding: utf-8, tab-width: 2 -*-

function makeInternalCmd(cmdName, details) {
  return {
    cmd: cmdName,
    trace: { file: '<internal>' },
    ...details,
  };
}

export default makeInternalCmd;
