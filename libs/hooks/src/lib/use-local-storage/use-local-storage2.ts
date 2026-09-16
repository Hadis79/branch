import { Dispatch, SetStateAction, useEffect, useState } from 'react';

type ReturnType<T> = [T | null, Dispatch<SetStateAction<T | null>>, () => void];

const useLocalStorage = <T>(key: string, initialValue?: T): ReturnType<T> => {
  const [state, setState] = useState<T | null>(() => {
    try {
      const value = localStorage.getItem(key);
      if (!initialValue && !value) return null;
      return value ? JSON.parse(value) : initialValue;
    } catch (err) {
      return initialValue;
    }
  });

  useEffect(() => {
    if (state) {
      try {
        localStorage.setItem(key, JSON.stringify(state));
      } catch (err) {
        console.log(err);
      }
    }
  }, [state, key]);

  function remove() {
    try {
      localStorage.removeItem(key);
      setState(null);
    } catch (err) {
      console.log(err);
    }
  }

  return [state, setState, remove];
};

export default useLocalStorage;
