import 'p-fatal';

async function failWhale() {
  const [, , ...args] = process.argv;
  throw new Error(args.join(' ') || '☠');
}

failWhale();
