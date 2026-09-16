import secureLocalStorage from 'react-secure-storage';
import { ENV_CONSTANTS } from './app-constants';

const isBrowser = typeof window !== 'undefined';

export const storage = isBrowser
  ? ENV_CONSTANTS.IS_DEV
    ? localStorage
    : secureLocalStorage
  : {
      getItem: () => null,
      setItem: () => null,
      removeItem: () => null,
      clear: () => null,
    };
