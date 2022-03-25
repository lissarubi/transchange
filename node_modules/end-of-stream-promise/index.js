var eos = require('end-of-stream')

module.exports = function eosp (stream, opts = {}) {
  return new Promise((resolve, reject) => {
    function cb (err) {
      if (err) reject(err)
      else resolve()
    }

    eos(stream, opts, cb)
  })
}
