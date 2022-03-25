// -*- coding: utf-8, tab-width: 2 -*-

import assert from 'assert';

// ¦mjsUsageDemo¦+
import getown from '..';
// ¦mjsUsageDemo¦- importPkgName

const same = assert.strictEqual;

// ¦mjsUsageDemo¦+
const dict = { foo: 'bar' };
same(getown(dict, 'foo'), 'bar');
same(getown(dict, 'bar'), undefined);
same(getown(dict, 'bar', 321), 321);
same(typeof dict.toString, 'function');
same(getown(dict, 'toString'), undefined);

same(getown(null, 'wow'), undefined);
same(getown(null, 'wow', 'doge'), 'doge');
// ¦mjsUsageDemo¦-







console.info('+OK usage test passed.');
