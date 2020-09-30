// -------------
// localStorage
// -------------

const storage = {
  getItem: (key: string) => {
    if (localStorage) {
      const item = localStorage.getItem(key);
      try {
        if (item) {
          // parse and return result
          return JSON.parse(item);
        } else {
          // no match
          return null;
        }
      } catch {
        // bad key
        localStorage.removeItem(key);
        return null;
      }
    }
  },
  setItem: (key: string, value: any): void => {
    if (localStorage) return localStorage.setItem(key, JSON.stringify(value));
  },
  removeItem: (key: string): void => {
    if (localStorage) return localStorage.removeItem(key);
  },
};

export default storage;
