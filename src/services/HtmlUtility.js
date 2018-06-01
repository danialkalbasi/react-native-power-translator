export default function htmlEntities(param) {
  let text = param;

  if (!text) {
    return '';
  }

  const characters = {
    '«': '',
    '»': '',
    '&lt;': '<',
    '&gt;': '>',
    '&sol;': '/',
    '&quot;': '"',
    '&apos;': '\'',
    '&amp;': '&',
    '&laquo;': '«',
    '&raquo;': '»',
    '&nbsp;': ' ',
    '&copy;': '©',
    '&reg;': '®',
    '&deg;': '°',
  };
  Object.keys(characters).forEach((key) => {
    text = text.replace(new RegExp(key, 'g'), characters[key]);
  });
  const result = text
    .replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec))
    .trim();

  return result;
}
