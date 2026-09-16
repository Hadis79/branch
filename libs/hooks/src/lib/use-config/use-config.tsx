import React, { useCallback, useContext, useMemo } from 'react';
import { devtools } from 'zustand/middleware';
import { ConfigState, Direction, IConfig, Locale, LocalStorageKey, ThemeID } from '@branch-services/types';

import useLocalStorage from '../use-local-storage/use-local-storage';
import { create } from 'zustand';
import { storage } from '@branch-services/utils';

const defaultConfig = {
  themeId: ThemeID.LIGHT,
  direction: Direction.RTL,
  locale: Locale.FA_IR,
};

const initialConfig = JSON.parse(storage.getItem(LocalStorageKey.CONFIG) as string) ?? defaultConfig;

const configStore = create<ConfigState>()(
  devtools((set, get) => {
    return {
      config: initialConfig,
      //   () => set({ bears: get().bears + 1 })
      updateConfigStore: (newConfig: Partial<IConfig>) => {
        set(
          (state) => ({
            config: { ...state.config, ...newConfig },
          }),
          false,
          'updateConfigAction'
        );
      },

      // Remove config
      removeConfigStore: () => {
        // setConfig(null);
        // removeConfig(); // Clear from localStorage
        set({ config: defaultConfig }, false, 'removeConfigAction');
      },
    };
  })
);
const useConfig = () => {
  const [, setConfigStorage, removeConfigStorage] = useLocalStorage<IConfig>(LocalStorageKey.CONFIG, defaultConfig);

  const config = configStore((state: ConfigState) => state.config);
  const updateConfigStore = configStore((state: ConfigState) => state.updateConfigStore);
  const removeConfigStore = configStore((state: ConfigState) => state.removeConfigStore);

  //   configStore.setState({ config: storedConfig ?? defaultConfig });

  const updateConfig = useCallback(
    (newConfig: Partial<IConfig>) => {
      updateConfigStore(newConfig);
      setConfigStorage({ ...config, ...newConfig });
    },
    [updateConfigStore, setConfigStorage, config]
  );

  // Remove config from both Zustand and local storage
  const removeConfig = useCallback(() => {
    removeConfigStore();
    removeConfigStorage();
  }, [removeConfigStore, removeConfigStorage]);

  return {
    config,
    updateConfig,
    removeConfig,
  };
};

export default useConfig;
