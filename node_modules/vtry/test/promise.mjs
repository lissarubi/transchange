// -*- coding: utf-8, tab-width: 2 -*-

import test from 'p-tape';
import testPromise from 'rejected-or-not';

import vtry from '../vtry.mjs';

async function parseAsync(json) { return JSON.parse(json); }

test('promise', async(t) => {
  t.plan(6);

  const dataType = 'location';
  const okLoca = '{"lat":0,"lon":0}';
  const badLoca = '{"lat":undefined,"lon":undefined}';

  const parseOrIgnore = vtry.pr(parseAsync);
  t.deepEqual(await parseOrIgnore(okLoca), { lat: 0, lon: 0 });
  t.deepEqual(await parseOrIgnore(badLoca), undefined);

  const parseOrAnnotate = vtry.pr(parseAsync, ['Cannot parse %s', dataType]);
  t.deepEqual(await parseOrAnnotate(okLoca), { lat: 0, lon: 0 });
  await testPromise.rejects(() => parseOrAnnotate(badLoca),
    /Cannot parse location: Unexpected token/);
  t.ok(true);

  const parseOrCapture = vtry.pr(parseAsync, err => Promise.resolve({
    error: err.name,
    msg: err.message.slice(0, 16),
  }));
  t.deepEqual(await parseOrCapture(okLoca), { lat: 0, lon: 0 });
  t.deepEqual(await parseOrCapture(badLoca),
    { error: 'SyntaxError', msg: 'Unexpected token' });
});
