# end-of-stream-promise
Await the completion or erroring of a stream

```
npm i -s end-of-stream-promise
```

```js
const eosp = require('end-of-stream-promise')

const stream = getSomeStream()

try {
  await eosp(stream)
} catch(e) {
  console.log('Stream had an error!')
}
```

Check out the [end-of-stream](https://github.com/mafintosh/end-of-stream) docs for more options.
