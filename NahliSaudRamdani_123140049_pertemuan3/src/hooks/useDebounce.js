import { useState, useEffect } from 'react';

/**
 * Custom Hook: useDebounce
 * Menunda pembaruan nilai hingga periode delay berlalu untuk optimasi performa input pencarian
 * @param {any} value Nilai yang ingin di-debounce
 * @param {number} delay Waktu tunda dalam milidetik (default 300ms)
 * @returns {any} Nilai yang sudah di-debounce
 */
function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
