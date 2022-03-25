// -*- coding: utf-8, tab-width: 2 -*-

import splitOnce from 'split-string-or-buffer-once-pmb';
import getOwn from 'getown';

function subCmd(known, param, opt) {
  const [name, args] = (splitOnce(':', param) || [param, '']);
  const impl = getOwn(known, name);
  if (!impl) {
    const what = ((opt || false).what || 'subcommand');
    throw new Error('Unsupported ' + what + ': ' + name);
  }
  return { name, impl, args };
}

export default subCmd;
