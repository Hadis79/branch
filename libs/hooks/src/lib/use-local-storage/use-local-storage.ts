import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
import { storage } from '@branch-services/utils';

type ReturnType<T> = [T | null, Dispatch<SetStateAction<T | null>>, () => void];

const useLocalStorage = <T>(key: string, initialValue?: T): ReturnType<T> => {
  const isBrowser = typeof window !== 'undefined';
  // const storage = ENV_CONSTANTS.IS_DEV ? localStorage : secureLocalStorage;

  const [state, setState] = useState<T | null>(() => {
    try {
      if (isBrowser) {
        const value = storage.getItem(key);
        if (initialValue !== undefined && !value) {
          return initialValue;
        }
        return value ? JSON.parse(value as string) : null;
      }
    } catch (err) {
      console.log(err);
    }
    return initialValue || null;
  });

  const keyRef = useRef<string>(key);

  useEffect(() => {
    if (isBrowser && state !== null) {
      try {
        storage.setItem(keyRef.current, JSON.stringify(state));
      } catch (err) {
        console.log(err);
      }
    }
  }, [state]);

  const remove = useCallback(() => {
    if (isBrowser) {
      try {
        storage.removeItem(keyRef.current);
        setState(null);
      } catch (err) {
        console.log(err);
      }
    }
  }, []);

  useEffect(() => {
    if (isBrowser) {
      try {
        const value = storage.getItem(keyRef.current);
        if (initialValue === undefined && !value) {
          setState(null);
        } else {
          setState(value ? JSON.parse(value as string) : initialValue || null);
        }
      } catch (err) {
        console.log(err);
        setState(initialValue || null);
      }
    }
  }, []);

  return [state, setState, remove];
};

export default useLocalStorage;
