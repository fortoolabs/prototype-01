export default {
  encode: (x: string): string => `encode(${x})`,
  decode: (x: string): string => `decode(${base64Decoded})`,
}

export function decorator(story, { parameters }) {
  return story()
}
