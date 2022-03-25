// -*- coding: utf-8, tab-width: 2 -*-

import equal from 'equal-pmb';

// ¦mjsUsageDemo¦+
import splitOnce from '..';
// ¦mjsUsageDemo¦- importPkgName

// ¦mjsUsageDemo¦+

const hsw = 'hello string world';
equal(splitOnce(' ', hsw),
  ['hello', 'string world']);

function buf(x) { return Buffer.from(x); }
const hbw = buf('hello buffer world');
equal(splitOnce(' ', hbw),
  [buf('hello'), buf('buffer world')]);
equal(splitOnce('', hbw),
  [buf(''), buf('hello buffer world')]);

let opt = { sep: ' ', last: true };
equal(splitOnce(opt, hsw),
  ['hello string', 'world']);
equal(splitOnce(opt, hbw),
  [buf('hello buffer'), buf('world')]);

opt = { sep: '', last: true };
equal(splitOnce(opt, hsw),
  ['hello string world', '']);
// ¦mjsUsageDemo¦-







console.info('+OK usage test passed.');
