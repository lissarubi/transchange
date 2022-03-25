/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

var EX, defMtd = require('./defmtd'),
  ObjPt = Object.prototype,
  finNum = Number.isFinite;

function orf(x) { return (x || false); }

EX = {
  ary: Array.isArray,
  fin: finNum,
  nan: (Number.isNaN || function isNaN(x) { return (EX.num(x) && isNaN(x)); }),
};

function maybeUnsupp(c, f) {
  EX[c] = (f || function unsupp() {
    throw new Error('This criterion is not supported on this platform: ' + c);
  });
}
function canHaz(t) { return t !== 'undefined'; } // cheat jslint
maybeUnsupp('buf', canHaz(typeof Buffer) && Buffer.isBuffer);


defMtd.multi(EX, [
  function fun(x) { return ((typeof x) === 'function'); },
  function str(x) { return ((typeof x) === 'string'); },
  function symb(x) { return ((typeof x) === 'symbol'); },
  function nul(x) { return (x === null); },
  function bool(x) { return ((typeof x) === 'boolean'); },
  function tru(x) { return (x === true); },
  function fal(x) { return (x === false); },
  function tri(x) { return ((x === true) || (x === false) || (x === null)); },

  function num(x) { return ((typeof x) === 'number'); },
  function int(x) { return (finNum(x) && ((x % 1) === 0)); },
  function neg(x) { return (finNum(x) && (x < 0)); },
  function neg0(x) { return (finNum(x) && (x <= 0)); },
  function pos(x) { return (finNum(x) && (x > 0)); },
  function pos0(x) { return (finNum(x) && (x >= 0)); },
  function zero(x) { return (x === 0); },

  // ##### BEGIN Object checks helper functions #####
  function in2(x, a, b) { return ((x === a) || (x === b)); },
  function proto(x) { return (EX.obj(x) && Object.getPrototypeOf(x)); },
  // [proto] "&&" is unambiguous: Object.create(false) -> TypeError
  ['ncls', function nativeClassName(obj, cmp) {
    // ATT: will identify all user-defined classes as just "Object".
    if ((obj && typeof obj) !== 'object') { return false; }
    var cn = ObjPt.toString.call(obj).slice(8, -1);
    if (cmp) { return (cn === cmp); }
    return cn;
  }],
  // ##### ENDOF Object checks helper functions #####

  function obj(x) { return ((x && typeof x) === 'object'); },
  function pojo(x) { return (EX.proto(x) === ObjPt); },
  // [pojo] 0bj isn't old enough for plain _old_ JS object.

  function thenable(x) { return EX.fun(orf(x).then); },
]);

defMtd.multi(EX, Object.getPrototypeOf ? [
  function dictObj(x) { return (EX.obj(x) && (!EX.ary(x))); },
  function nobj(x) { return (EX.proto(x) === null); },
  function p0jo(x) { return EX.in2(EX.proto(x), ObjPt, null); },
] : [
  // Fallible but still better than just failing. In lacking environments,
  // you have to expect shims anyway, and thus, sub-perfect accuracy.
  ['p0jo', function nobj(x) { return EX.clsnm(x, 'Object'); }],
]);
EX['0bj'] = EX.nobj;


module.exports = EX;
