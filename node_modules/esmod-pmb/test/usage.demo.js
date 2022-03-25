'use strict';
var u = require('./usage.node');
console.log('node version: ', process.versions.node);
console.log('as-is:', u);
console.log('assigned:', Object.assign({}, u));
