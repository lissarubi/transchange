/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

var is = require('./typechecks'), repr = require('./src/lazyrepr'),
  getOwn = require('getown'),
  explainCrit = require('./src/explain-crit'),
  oneParamCrit = require('./src/crits.1param'),
  arSlc = Array.prototype.slice;


function fail(descr, allCrit, failCrit, x) {
  if (allCrit.map) { allCrit = allCrit.map(explainCrit).join(' '); }
  var err = new Error(descr + ' must be ' + allCrit +
    " but isn't " + failCrit + ': ' + repr(x));
  err.name = 'AssertionError';
  throw err;
}


function maybeDescrArg(d, f) {
  if (!d) { return f; }
  return function expectWithDefaultDescr(x) { return f(d, x); };
}


function decodeQueryParts(q) {
  return q.replace(/\+/g, ' ').split(/&/).map(decodeURIComponent);
}


function bindArgs(func, args, ctx) {
  return func.bind.apply(func, [ctx].concat(arSlc.call(args)));
}


function decodeCritArgs(spec) {
  var m = decodeCritArgs.rgx.exec(spec), crit, sep, args, decoder;
  if (!m) { return spec; }
  crit = m[1];
  sep = m[2];
  args = spec.slice(m[0].length);
  decoder = decodeCritArgs[sep];
  args = decoder(args);
  spec = [crit].concat(args);
  return spec;
}
Object.assign(decodeCritArgs, {
  rgx: /^(\w+)(:|\&|\?)/,
  ':': JSON.parse,
  '&': decodeQueryParts,
  // '?': qrystr, // not (yet?) worth the added complexity.
});


function makeNamedCrit(crit) {
  var f = is(decodeCritArgs(crit)), n = (f.descr || String(crit));
  return { f: f, n: n };
}


function reverseSplitByAndMap(list, sep, convert) {
  var groups = [], curGr = [];
  function add(item) {
    if (item === sep) {
      if (curGr.length) { groups.push(curGr.reverse()); }
      curGr = [];
      return;
    }
    curGr.push(convert(item));
  }
  list.forEach(add);
  add(sep);
  return groups;
}


function mustBe(criteria, descr) {
  if (criteria && (!criteria.forEach)) {
    criteria = (String(criteria).match(/\S+/g) || false);
  }
  if (!(criteria || false).length) { throw new Error('No criteria given'); }
  var revCritGroups = reverseSplitByAndMap(criteria, '|', makeNamedCrit);
  return maybeDescrArg(descr, function expect(d, x) {
    var done, why, nope = [];
    revCritGroups.forEach(function (cgr) {
      if (done) { return; }
      why = null;
      cgr.forEach(function (c) {
        if (why || c.f(x)) { return; }
        why = c.n;
      });
      if (why) { nope.push(why); } else { done = true; }
    });
    if (done) { return x; }
    fail(d, criteria, nope.join(' | '), x);
  });
}


mustBe.tProp = function propMustBe(t, o, c, p, d) {
  // t: topic prefix (description of object)
  // o: object, c: criterion, p: property name, d: default value
  if (arguments.length <= 3) { return bindArgs(propMustBe, arguments); }
  t = String(t || (String(o) + ': '));
  return mustBe(c)(t + '"' + String(p) + '"', getOwn(o, p, d));
};
mustBe.prop = mustBe.tProp.bind(null, null);


mustBe.getter = function getMustBe(get, descr, rule, key, dflt) {
  return mustBe(rule)(descr + ': "' + String(key) + '"', get(key, dflt));
};


mustBe.finNum = mustBe('fin num');
mustBe.near = mustBe('nonEmpty ary');
mustBe.nest = mustBe('nonEmpty str');
[
  'ary',
  'bool',
  'dictObj',
  'fun',
  'obj',
].forEach(function shortcut(rule) { mustBe[rule] = mustBe(rule); });


mustBe.withArgs = function mustBeWithArgs(crit, descr) {
  return function argsReceiver() {
    var args = Array.prototype.slice.call(arguments),
      crit1 = [crit].concat(args),
      allCrit = [crit1];
    return mustBe(allCrit, descr);
  };
};


Object.keys(oneParamCrit).forEach(function addOneArgCritHelper(c) {
  mustBe[c] = function (y, d) { return mustBe.withArgs(c, d)(y); };
});


function makeRulesDict(rules) {
  var dict = {};
  Object.keys(rules).forEach(function addRule(descr) {
    dict[descr] = mustBe(rules[descr], descr);
  });
  return dict;
}
mustBe.makeRulesDict = makeRulesDict;






module.exports = mustBe;
