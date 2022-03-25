# through2-promise
A small promise-based wrapper for through2, based on [RangerMauve's through2-map-promise](https://github.com/RangerMauve/through2-map-promise/)

## Quickstart

```
npm install --save through2-promise
```

Some examples:

```javascript
var through2 = require("through2-promise");
fs.createReadStream('ex.txt')
.pipe(through2(function (chunk) {
    for (var i = 0; i < chunk.length; i++) {
        if (chunk[i] == 97)
            chunk[i] = 122; // swap 'a' for 'z'

        this.push(chunk);
    }
}))
.pipe(fs.createWriteStream('out.txt'))
.on('finish', function () {
    doSomethingSpecial()
});
```

Or object streams:

```javascript
var all = []

fs.createReadStream('data.csv')
.pipe(csv2())
.pipe(through2.obj(function (chunk) {
    var data = {
        name    : chunk[0],
        address : chunk[3],
        phone   : chunk[10]
    };
    this.push(data);
}))
.on('data', function (data) {
    all.push(data)
})
.on('end', function () {
    doSomethingSpecial(all)
});
```

## API
### `through2-promise([options,] [fn] [, flushFunction])`
Creates a transform stream which calls your transforming function, `fn`. You can throw within your function to
automatically reject the promise and error-out the stream. `options` is the optional object that gets passed into [through2](https://github.com/rvagg/through2#options).

`this` is the through2 stream, so you can do `this.push()` just like in through2.  If you return a Promise, and
the Promise resolves to a value, this value will be written to the stream (just like passing a value to the
callback in through2).

`flushFunction()` is a function that runs after the source stream has been consumed.  It has access to `this.push()`,
and also any value returned will be appended to the written results.

### `through2-promise.obj([options,] [fn] [, flushFunction])`
Same as the former, but the stream is created in objectMode.

### `through2-promise.ctor([options,] [fn] [, flushFunction])`
Creates a constructor for your transform stream in case you want to be more efficient.
