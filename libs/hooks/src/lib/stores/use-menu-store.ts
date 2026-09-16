import { LocalStorageKey, MenuModel } from '@branch-services/types';
import { create } from 'zustand';
import useLocalStorage from '../use-local-storage/use-local-storage';
import { storage } from '@branch-services/utils';

type State = {
  menu: MenuModel[] | null;
};

type Actions = {
  setMenu: (menu: MenuModel[] | null) => void;
  removeMenu: () => void;
};

const initialState: State = {
  menu: JSON.parse(storage.getItem(LocalStorageKey.MENU) as string) ?? null,
};

// Zustand store setup
const menuStore = create<State & Actions>()((set) => ({
  ...initialState,
  setMenu: (menu: MenuModel[] | null) => set(() => ({ menu })),
  removeMenu: () => set(() => ({ menu: [] })),
}));

// Hook to manage menu state and local storage
const useMenuStore = () => {
  const [menuStorage, setMenuStorage, removeMenusStorage] = useLocalStorage(LocalStorageKey.MENU);
  const { menu, setMenu, removeMenu } = menuStore((state) => state);

  const updateMenu = (data) => {
    setMenu(data);
    setMenuStorage(data);
  };

  const resetMenu = () => {
    setMenu(null);
    removeMenu();
    removeMenusStorage();
  };

  return {
    menu,
    menuStorage,
    setMenu,
    updateMenu,
    resetMenu,
  };
};

export default useMenuStore;
