"use strict";
var through2 = require("through2");
var Promise = require("any-promise");
var xtend = require("xtend");

var ctor = ensure_args(makeCtor);
var ctorObj = ensure_args(makeCtorObj);

module.exports = create;
module.exports.ctor = ctor;
module.exports.obj = obj;

function create(options, transform, flush) {
	return new(ctor(options, transform, flush))();
}

function obj(options, transform, flush) {
	return new(ctorObj(options, transform, flush))();
}

function ensure_args(creator) {
	return function (options, transform, flush) {
		if (typeof options === "function") {
			flush = transform;
			transform = options;
			options = {};
		}

		return creator(options, transform, flush);
	};
}

function makeCtor(options, transform, flush) {
	return through2.ctor(options, doTransform, doFlush);

	function doTransform(chunk, encoding, callback) {
		Promise.resolve(chunk)
		.then(transform.bind(this))
		.then(function (result) {callback(null, result);}, callback);
	}

	function doFlush(callback) {
		if(flush) {
			Promise.resolve(flush.bind(this)())
			.then(function (result) {callback(null, result);}, callback);
		} else {
			callback();
		}
	}
}

function makeCtorObj(options, transform, flush) {
	options = xtend(options, {
		objectMode: true
	});

	return makeCtor(options, transform, flush);
}
