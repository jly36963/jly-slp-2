const removeSpecialCharacters = (str: string): string =>
  str.replace(/[^a-z0-9]/i, ' ');
export default removeSpecialCharacters;
