import { useEffect, useState } from "react";

/**
 * Persists a piece of state to localStorage under `key`.
 * Falls back to `initialValue` if nothing is stored yet or JSON parsing fails.
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // localStorage may be unavailable (private browsing, quota, etc.) - fail silently
    }
  }, [key, value]);

  return [value, setValue];
}
