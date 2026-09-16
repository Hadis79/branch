import { LocalStorageKey } from '@branch-services/types';
import { storage } from '@branch-services/utils';
import { useEffect, useState } from 'react';

export default function useClientSsn() {
  const [clientSsn, setClientSsn] = useState<string | null>(() => {
    try {
      const organizationString: any = storage.getItem(LocalStorageKey.USER_PROFILE);
      const firstCallOrg: any = storage.getItem(LocalStorageKey.USER);
      const firstCallOrgString = JSON.parse(firstCallOrg);
      if (!organizationString) return firstCallOrgString?.clientSsn;
      const organization = JSON.parse(organizationString);
      return organization?.clientSsn ?? null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const organizationString: any = storage.getItem(LocalStorageKey.USER_PROFILE);
        if (!organizationString) {
          setClientSsn(null);
          return;
        }
        const organization = JSON.parse(organizationString);
        setClientSsn(organization?.clientSsn ?? null);
      } catch {
        setClientSsn(null);
      }
    };

    window.addEventListener('storageChange', handleStorageChange);

    const originalSetItem = storage.setItem;
    const originalRemoveItem = storage.removeItem;
    const originalClear = storage.clear;

    storage.setItem = function (key: string, value: any) {
      originalSetItem.call(this, key, value);
      if (key === LocalStorageKey.USER_PROFILE) {
        window.dispatchEvent(new CustomEvent('storageChange', { detail: { key, value } }));
      }
    };

    storage.removeItem = function (key: string) {
      originalRemoveItem.call(this, key);
      if (key === LocalStorageKey.USER_PROFILE) {
        window.dispatchEvent(new CustomEvent('storageChange', { detail: { key } }));
      }
    };

    storage.clear = function () {
      originalClear.call(this);
      window.dispatchEvent(new CustomEvent('storageChange', { detail: { key: null } }));
    };

    return () => {
      window.removeEventListener('storageChange', handleStorageChange);
      storage.setItem = originalSetItem;
      storage.removeItem = originalRemoveItem;
      storage.clear = originalClear;
    };
  }, []);

  return clientSsn;
}
