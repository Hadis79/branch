import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { LocalStorageKey, MessageModel, UserModel } from '@branch-services/types';
import {
  clearAllCookies,
  clearLocalStorageExceptForKey,
  ENV_CONSTANTS,
  readFromCookieByKey,
  storage,
} from '@branch-services/utils';
import { useRouter } from 'next/navigation';
import useLocalStorage from '../use-local-storage/use-local-storage';

type State = {
  user: UserModel | null;
  userPhoto: string | null;
  message: MessageModel | null;
};

type Actions = {
  clearUserData: () => void;
  setUser: (user: any) => void;
  setUserPhoto: (photo: any) => void;
  removeUserPhoto: () => void;
  isAuth: () => boolean;
  setMessage: (message: MessageModel) => void;
  resetMessage: () => void;
};

const initialState: State = {
  user: JSON.parse(storage.getItem(LocalStorageKey.USER) as string) ?? null,
  userPhoto: JSON.parse(storage.getItem(LocalStorageKey.USER_PHOTO) as string) ?? null,
  message: null,
};

const userStore = create<State & Actions>()(
  devtools((set, get) => ({
    ...initialState,

    // Actions
    setUser: (user: UserModel) => {
      set((state) => ({
        ...state.user,
        user,
      }));
    },

    setUserPhoto: (photo: any) =>
      set({
        userPhoto: photo,
      }),

    removeUserPhoto: () =>
      set({
        userPhoto: null,
      }),

    clearUserData: () => {
      set({
        user: null,
        userPhoto: null,
      });
    },
    isAuth: () => Boolean(get().user),

    setMessage: (message: MessageModel) => set({ message }),
    resetMessage: () => set({ message: null }),
  }))
);

const clearAuthStorage = () => {
  const authKeys = [
    LocalStorageKey.USER,
    LocalStorageKey.USER_PROFILE,
    LocalStorageKey.Accounts,
    // LocalStorageKey.CONFIG,
    LocalStorageKey.WITHDRAWAL_TYPE,
    LocalStorageKey.USER_ORG,
  ];

  authKeys.forEach((key) => storage.removeItem(key));
};

// Custom hook to use user store in our components
function useUserStore() {
  const router = useRouter();
  const [_, setUserStorage, removeUserStorage] = useLocalStorage(LocalStorageKey.USER, null);
  // const [userPhoto, setUserPhoto, removeUserPhoto] = useLocalStorage(LocalStorageKey.USER_PHOTO, null);
  const { isAuth, user, setUser, clearUserData, ...rest } = userStore((state) => state);

  function setUserAction(userData: any, path?: string) {
    clearLocalStorageExceptForKey(LocalStorageKey.CONFIG);
    setUser(userData);
    setUserStorage(userData);
    path && router.replace(path ?? '/');
  }

  function isAuthentication(): boolean {
    // if (ENV_CONSTANTS.IS_AUTH_MODE_1) {
    return isAuth();
    // } else {
    //   const isLoggedin = readFromCookieByKey('LoggedIn');
    //   return isLoggedin === 'true';
    // }
  }
  function clearUserDataAction() {
    clearUserData();
    clearLocalStorageExceptForKey(LocalStorageKey.CONFIG);
  }
  // Helper function to call the logout service
  const callLogoutService = async () => {
    const formData = new FormData();
    const csrf_token = readFromCookieByKey('XSRF-TOKEN');
    const headers = {
      'Content-Type': 'multipart/form-data',
      'X-XSRF-TOKEN': `${csrf_token}`,
    };
    await fetch('/api/auth/logout', {
      credentials: 'include',
      method: 'POST',
      headers: headers,
      body: formData,
    });
  };

  async function logout(path?: string) {
    removeUserStorage();
    clearUserDataAction();
    clearAuthStorage();
    // await callLogoutService();
    clearAllCookies();
    if (path === 'refrences') {
      window.location.href = '/auth';
      return;
    }
    window.location.href = '/api/logout';
  }

  return {
    isAuth: isAuthentication(),
    user,
    setUser,
    setUserAction,
    logout,
    callLogoutService,
    ...rest,
  };
}

export default useUserStore;
