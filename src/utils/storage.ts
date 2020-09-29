// -------------
// localStorage
// -------------

const storage = {
  getItem: (key: string) => {
    if (localStorage) {
      const item = localStorage.getItem(key);
      // console.log('key', key, 'item', item);
      if (item) {
        return JSON.parse(item);
      } else {
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
