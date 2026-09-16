import { ApiUtil, storage } from '@branch-services/utils';
import { LocalStorageKey } from '@branch-services/types';
import { Api } from '../../services';
import { useWidgetStore } from '../../store';
import { queryClient, useMenuStore, useUserStore } from '@branch-services/hooks';
import { bbpUrl, client } from '@branch-services/client';
import { useRef, useState } from 'react';
import { createDelegationSwitchCoordinator } from './delegation-switch';

export type DelagationParams = {
  ssn: string;
};

function handleError(reason: any): string {
  return ApiUtil.getErrorMessage(reason);
}

const useDelagationQuery = () => {
  const { setDelagaationResponse, setMessage } = useWidgetStore((state) => state);
  const { setMenu } = useMenuStore();
  const { setUser, removeUserPhoto } = useUserStore();
  const [isSwitching, setIsSwitching] = useState(false);
  const coordinatorRef = useRef<ReturnType<typeof createDelegationSwitchCoordinator>>();

  if (!coordinatorRef.current) {
    coordinatorRef.current = createDelegationSwitchCoordinator({
      begin: () => setIsSwitching(true),
      finish: () => setIsSwitching(false),
      prepareQueriesForSwitch: async () => {
        await queryClient.cancelQueries();
        // Removing cached queries before the server-side session changes
        // prevents a route from adopting old results. Do not reset/refetch
        // active observers after commit: their new store inputs trigger one
        // fetch, whereas resetQueries would trigger an unnecessary second one.
        queryClient.removeQueries();
      },
      switchDelegation: async (ssn) => Api.setOrganization({ ssn }),
      getCurrentProfile: async () => {
        const response = await client.get(`${bbpUrl}/user/profile`, {
          headers: { 'Cache-Control': 'no-cache, no-store', Pragma: 'no-cache' },
        });
        return response.data;
      },
      commit: (profile) => {
        // Clear only delegation-scoped values. `setUserAction` is deliberately
        // not used here because its broad storage cleanup can remove the
        // reference application's authentication/session values.
        [
          LocalStorageKey.USER_PROFILE,
          LocalStorageKey.USER_PHOTO,
          LocalStorageKey.MENU,
          LocalStorageKey.Accounts,
          LocalStorageKey.PURPOSES,
          LocalStorageKey.WITHDRAWAL_TYPE,
          LocalStorageKey.USER_ORG,
        ].forEach((key) => storage.removeItem(key));
        storage.setItem(LocalStorageKey.USER, JSON.stringify(profile));
        // Some reference screens still read this legacy profile key. It must
        // be replaced with the same newly fetched profile, never left empty
        // or populated with the previous delegation.
        storage.setItem(LocalStorageKey.USER_PROFILE, JSON.stringify(profile));
        setMenu(null);
        removeUserPhoto();
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new Event('branch-refrences:delegation-state-reset'));
        }
        setDelagaationResponse(profile as any);
        setUser(profile);
        setIsSwitching(false);
      },
      recoverWithoutProfile: () => {
        [
          LocalStorageKey.USER,
          LocalStorageKey.USER_PROFILE,
          LocalStorageKey.USER_PHOTO,
          LocalStorageKey.MENU,
          LocalStorageKey.Accounts,
          LocalStorageKey.PURPOSES,
          LocalStorageKey.WITHDRAWAL_TYPE,
          LocalStorageKey.USER_ORG,
        ].forEach((key) => storage.removeItem(key));
        setMenu(null);
        removeUserPhoto();
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new Event('branch-refrences:delegation-state-reset'));
        }
        // The PUT may have changed the server session. Drop the old local
        // profile so the reference bootstrap fetches the effective session.
        setUser(null);
        setIsSwitching(false);
      },
      reportError: (error) => setMessage(handleError(error)),
    });
  }

  return {
    switchDelegation: (params: DelagationParams) => coordinatorRef.current!.switchTo(params.ssn),
    isSwitching,
  };
};

export default useDelagationQuery;
