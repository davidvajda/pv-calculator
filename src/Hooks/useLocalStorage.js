import { useState, useEffect } from "react";

export const useLocalStorage = (key, defaultValue = null) => {
  const [value, setValue] = useState(() => {
    try {
      const savedValue = localStorage.getItem(key);
      if (savedValue !== null) {
        return JSON.parse(savedValue);
      }
      return defaultValue;
    } catch {
      return defaultValue;
    }
  });

  useEffect(() => {
    const stringValue = JSON.stringify(value);
    localStorage.setItem(key, stringValue);
  }, [value]);

  return [value, setValue];
};
