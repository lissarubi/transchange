const { Readable } = require('stream')
const test = require('tape')

const eosp = require('./')

test('closed stream', async (t) => {
  t.plan(1)
  try {
    const stream = new Readable({
      read () {
        this.push(null)
      }
    })

    process.nextTick(() => stream.read())

    await eosp(stream)

    t.pass('stream resolved')
  } catch (e) {
    t.error(e)
  }
})

test('errored stream', async (t) => {
  t.plan(1)
  try {
    const stream = new Readable({
      read () {
        this.emit('error', new Error('Something happened'))
        this.push(null)
      }
    })

    process.nextTick(() => stream.read())

    await eosp(stream)

    t.error('stream resolved')
  } catch (e) {
    t.pass('stream errored')
  }
})
