// convert to array of words (remove articles and empty strings)
const tokenize = (str: string): Array<string> =>
  str
    .toLowerCase()
    .split(/[^a-z0-9]/i)
    .filter((x) => !['a', 'an', 'the', ''].includes(x));

// find common elements between arrays
const getIntersection = (a: Array<string>, b: Array<string>) =>
  [...new Set(a)].filter((v) => b.includes(v));

// determine if there are any common terms between artist/song and path
const validateLyricPath = (
  path: string,
  songName: string,
  artistName: string,
): boolean => {
  // determine if good match (genius sometimes grabs incorrect paths)
  const songTerms: Array<string> = [
    ...tokenize(songName),
    ...tokenize(artistName),
  ];
  const pathTerms: Array<string> = [...tokenize(path)];
  const commonTerms: Array<string> = getIntersection(songTerms, pathTerms);
  if (!commonTerms.length) return false;
  // valid (common terms between song/artist and path)
  return true;
};

export default validateLyricPath;
