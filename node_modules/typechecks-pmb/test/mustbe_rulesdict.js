/*jslint indent: 2, maxlen: 80, node: true */
/*globals Set: true*/
/* -*- tab-width: 2 -*- */
'use strict';

var mustBe = require('typechecks-pmb/must-be'), dict,
  mustFail = require('equal-pmb').err;

function assErr(f) { mustFail(f, assErr.rx); }
assErr.rx = /^AssertionError: /;

dict = mustBe.makeRulesDict({
  user: 'nonEmpty str',

  // JSON-encoded argument:
  level: 'pos int lte:100',

  // JSON, mind the quotes for string:
  oldPassword: 'eeq:"123456"',

  // Whitespace in args must be encoded since it splits criteria:
  newPassword: 'nonEmpty eeq:"sword\\u0020fish" str',

  // Shorter space encoding: URL-encoded version:
  repeatNewPassword: 'nonEmpty eeq&sword+fish str',

  // The first level of JSON array is used to allow multiple args.
  // Thus, a single array arg must be wrapped in another array:
  tier: 'oneOf:[["basic","pro","uber"]]',

  // Again, the URL-encoded version is shorter, but misleading:
  fame: 'oneOf&noob&lurk&reg&mod',
  // Due to the wrapping array, only the 1st param ("noob") will
  // be passed as the whitelist argument.
});

dict.user('bernd');
assErr(function fail() { dict.user(''); });

dict.level(1);
dict.level(23);
assErr(function fail() { dict.level(0); });
assErr(function fail() { dict.level(1337); });

dict.oldPassword('123456');
assErr(function fail() { dict.oldPassword(123456); });

dict.newPassword('sword fish');
assErr(function fail() { dict.newPassword('Sw0rDf1sH'); });

dict.repeatNewPassword('sword fish');
assErr(function fail() { dict.repeatNewPassword('sword+fish'); });

dict.tier('basic');
dict.tier('pro');
assErr(function fail() { dict.tier('admin'); });

dict.fame('noob');
dict.fame('n');     // for explanation, see above.
dict.fame('no');
dict.fame('oob');
dict.fame('b');
assErr(function fail() { dict.tier('lurk'); });
assErr(function fail() { dict.tier('reg'); });
assErr(function fail() { dict.tier('mod'); });










console.log("+OK mustbe_rulesdict tests passed.");
  //= "+OK mustbe_rulesdict tests passed."
