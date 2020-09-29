const tokenize = (str: string): Array<string> =>
  str
    .toLowerCase()
    .split(/[^a-z0-9]/i)
    .filter((x) => !['a', 'an', 'the', ''].includes(x));

const getIntersection = (a: Array<string>, b: Array<string>) =>
  [...new Set(a)].filter((v) => b.includes(v));

const validLyricPath = (
  path: string,
  songName: string,
  artistName: string,
): boolean => {
  // determine if good match (genius grabs the wrong song)
  const songTerms = [...tokenize(songName), ...tokenize(artistName)];
  const pathTerms = [...tokenize(path)];
  const commonTerms = getIntersection(songTerms, pathTerms);
  if (!commonTerms.length) return false;
  // valid (common terms between song/artist and path)
  return true;
};

export default validLyricPath;
