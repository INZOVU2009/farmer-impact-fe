export default function acronymGenerator(text) {
  if (typeof text != "string" || !text) {
    return "";
  }

  let acronym = text
    .match(/[\p{Alpha}\p{Nd}]+/gu)
    .reduce(
      (previous, next) =>
        previous +
        (+next === 0 || parseInt(next) ? parseInt(next) : next[0] || ""),
      ""
    )
    .toUpperCase();

  if (acronym.length == 1) {
    acronym = shrinkToConsonants(text);
  }

  return acronym;
}

function shrinkToConsonants(word, length = 2) {
  const consonants = word
    .replace(/[aeiou]/gi, "")
    .slice(0, length)
    .toUpperCase();
  return consonants || word.slice(0, length).toUpperCase();
}
