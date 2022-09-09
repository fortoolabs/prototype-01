import base64url from 'base64url'

export const defaultTarget = encodeTarget(
  'https://gitlab.com/formation.tools/eng/engineering/-/raw/main/README.org',
)

export function encodeTarget(url: string) {
  return base64url.encode(url)
}
