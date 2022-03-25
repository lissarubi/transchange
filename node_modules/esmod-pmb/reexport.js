/*jslint indent: 2, maxlen: 80, node: true */
'use strict';

var EX, stdEsm = require('esm'), dfOpt, envOpt,
  esmApi = require('./esm-api.js'),
  obAss = Object.assign, objHas = Object.prototype.hasOwnProperty;

envOpt = {
  debugEsm: (+process.env.ESMODPMB_DEBUG_ESM || 0),
};

dfOpt = {
  mode: 'auto',
  cjs: {
    // namedExports: true,  // <- seems to have no effect anyway
    // interop: true,       // <- seems to have no effect anyway

    paths: true,  // support old-school node path rules…
    // NB: … but in *.js only. Not a bug, just red tape (upstream issue 582,
    //    https://github.com/standard-things/esm/issues/582).
    //    One stopgap to make it work with .mjs would be to do ALL
    //    module resolving ourselves (https://git.io/fAOyA)
    //    but I'll rather research a less intrusive fallback approach
    //    some day. Beat me to the draw with your PR!
  },
  stripSuffixes: /(?:[\.\-](?:c?js|common|node|bridge))+$/,
  addSuffix: '.mjs',
  preferDefaultExport: 1,
  resolveImportedValues: true,
  reexport: true,
  debug: (envOpt.debugEsm >= 1),
};


function ifObj(x, d) { return ((x && typeof x) === 'object' ? x : d); }

function subObAss(dest, prop, src) {
  var ass = obAss({}, (src || dfOpt)[prop], dest[prop]);
  dest[prop] = ass;
  return ass;
}

function optimizeOpts(origOpts) {
  if (!origOpts) { return dfOpt; }
  var opt = obAss({}, dfOpt, origOpts);
  if (opt.cjs !== true) { subObAss(opt, 'cjs'); }
  if (envOpt.debugEsm > 9e3) { opt.debug = true; }
  return opt;
}

function replaceIfRx(s, r, w) { return (r ? s.replace(r, w || '') : s); }

function singleObjectKey(o) {
  var k = Object.keys(o), l = k.length;
  return (l && (l === 1) && k[0]);
}

function checkPreferDefault(mod, opt) {
  if (!ifObj(mod)) { return mod; }
  var prefer = opt.preferDefaultExport;
  if (!prefer) { return mod; }
  if (!objHas.call(mod, 'default')) { return mod; }
  if (prefer === 1) {
    return (singleObjectKey(mod) === 'default' ? mod.default : mod);
  }
  if (prefer === true) { return mod.default; }
  return mod;
}


function fixEsmOpt(opt) {
  var clean = {};
  function copy(key) {
    if (objHas.call(opt, key)) { clean[key] = opt[key]; }
  }
  esmApi.coreOptNames.forEach(copy);
  esmApi.devOptNames.forEach(copy);
  if (opt.esm) {
    // backwards-compat to @std/esm v0.21.1
    if (opt.mode) { throw new Error('Conflicting options: mode vs. esm'); }
    clean.mode = opt.esm;
    if (clean.mode === 'js') { clean.mode = 'auto'; }
  }
  return clean;
}


EX = function esmBridge(bridgeModule, opt) {
  opt = optimizeOpts(opt);
  var esmRqr = stdEsm(bridgeModule, fixEsmOpt(opt)), mjsFn, esMod, expo;
  if (opt.reexport) {
    mjsFn = EX.guessMjsFile(bridgeModule, opt);
    esMod = esmRqr(mjsFn);
    expo = checkPreferDefault(esMod, opt);
    if (ifObj(expo) && opt.resolveImportedValues) { expo = obAss({}, expo); }
    bridgeModule.exports = expo;
  }
  return esmRqr;
};
EX.defaultConfig = dfOpt;


EX.guessMjsFile = function (cjsMod, opt) {
  return (replaceIfRx((cjsMod.filename || cjsMod), opt.stripSuffixes
    ) + (opt.addSuffix || ''));
};






module.exports = EX;
