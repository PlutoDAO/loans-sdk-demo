export function getShortenedText(key: string) {
  return key.slice(0, 5).concat('...').concat(key.substr(-5));
}
