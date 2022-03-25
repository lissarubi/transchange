import VError from 'verror';

function reCause(opt, cause) { return { ...(opt || false), cause }; }

function safeVError(opt, msg) {
  if (!Array.isArray(msg)) { return safeVError(opt, ['%s', msg]); }
  const { cause } = opt;
  if ((cause && typeof cause) !== 'object') {
    const bad = new TypeError(`non-object cause: ${typeof cause} "${cause}"`);
    return safeVError(reCause(opt, bad), msg);
  }
  try {
    return new VError(opt, ...msg);
  } catch (caught) {
    if (!caught) { throw caught; }
    const { code, message: why } = caught;
    if (code === 'ERR_ASSERTION') {
      if (why === 'cause is not an Error') {
        caught.message += `:  ${typeof cause} "${cause}"`;
        return safeVError(reCause(opt, caught), ...msg);
      }
    }
    throw caught;
  }
}

export default safeVError;
