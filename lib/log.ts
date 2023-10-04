import { isModuleNamespaceObject } from "util/types";

export default function log(arg1: any, name: string = '') {
  let o = arg1;
  const protName = o?.constructor?.prototype?.constructor?.name

  const headerName = name ? `"${name}" ` : ''
  const header = (`${protName} ${headerName}:`)

  // add missing enumerable properties
  if (o && typeof o === 'object') {
    const copy = Object.assign({}, o)

    for (const key in o) {
      copy[key] = o[key]
    }

    o = copy
  }

  console.log(header, o)
  console.log()
}
