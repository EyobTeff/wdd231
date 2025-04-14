export function saveToLocal(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  
  export function loadFromLocal(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }
  