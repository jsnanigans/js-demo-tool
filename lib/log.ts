export default function log(arg: any) {
  let o = arg;
  const protName = arg?.constructor?.prototype?.constructor?.name

  const header = (`${protName} ${':'}`)

  // remove not-enumerable props from o
  if (o && typeof o === 'object') {
    o = Object.assign({}, o);
  }

  console.log(header, o)
}
