[![npm version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![coverage status][coverage-image]][coverage-url]

# next-chunk

This package provides an easy mechanism to read the first chunk in a readable stream. It returns a promise which will be resolved with the chunk (either a `Buffer` or a `string`), or `null` if the stream was ended. It rejects the promise if an error occured on the stream.

# API

## Importing

If importing using TypeScript or ES6 modules:

```ts
import nextChunk from 'next-chunk'
```

and if importing using CommonJS `require`:

```js
const { nextChunk } = require( 'next-chunk' );
// or, if preferred
const nextChunk = require( 'next-chunk' ).default;
```

## Usage

```ts
const readable = getSomeReadableStream( );

const firstChunk = await nextChunk( readable );
const secondChunk = await nextChunk( readable );
// ... eventually the stream may end, we get
const endedChunk = await nextChunk( readable );
const againChunk = await nextChunk( readable );

// These chunks contain buffers or strings
expect( firstChunk ).to.not.be.null;
expect( secondChunk ).to.not.be.null;
// These are all null
expect( endedChunk ).to.be.null;
expect( againChunk ).to.be.null;
```

[npm-image]: https://img.shields.io/npm/v/next-chunk.svg
[npm-url]: https://npmjs.org/package/next-chunk
[travis-image]: https://img.shields.io/travis/grantila/next-chunk.svg
[travis-url]: https://travis-ci.org/grantila/next-chunk
[coverage-image]: https://coveralls.io/repos/github/grantila/next-chunk/badge.svg?branch=master
[coverage-url]: https://coveralls.io/github/grantila/next-chunk?branch=master
