import { useState, useEffect } from 'react';

/**
 * Custom Hook: useLocalStorage
 * Menyimpan dan menyinkronkan state ke browser localStorage dengan penanganan error JSON
 * @param {string} key Kunci penyimpanan di localStorage
 * @param {any} initialValue Nilai awal jika kunci belum ada di localStorage
 * @returns {[any, Function]} Nilai tersimpan dan setter function
 */
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      if (typeof window === 'undefined') return initialValue;
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Gagal membaca key "${key}" dari localStorage:`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(storedValue));
      }
    } catch (error) {
      console.error(`Gagal menyimpan key "${key}" ke localStorage:`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export default useLocalStorage;
