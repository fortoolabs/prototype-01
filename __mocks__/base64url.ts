let base64Decoded: string
let base64Encoded: string

const show = (x: string): string => {
  console.log('Showing', x)
  return x
}

export default {
  encode: (x: string): string => {
    console.log('Call encode', x, base64Encoded)
    if (base64Encoded) {
      return `ENCODE(${x})=${base64Encoded}`
    }
    base64Encoded = null
  },
  decode: (x: string): string => {
    console.log('Call decode', x, base64Decoded)
    if (base64Decoded) {
      return `DECODE(${x})=${base64Decoded}`
    }
    base64Decoded = null
  },
}

export function decorator(story, { parameters }) {
  console.log('parameters', parameters)

  if (parameters && parameters.base64Url) {
    if (parameters.base64url.encoded) {
      base64Encoded = parameters.base64url.encoded
    }

    if (parameters.base64url.decoded) {
      base64Decoded = parameters.base64url.decoded
    }
  }

  return story()
}
