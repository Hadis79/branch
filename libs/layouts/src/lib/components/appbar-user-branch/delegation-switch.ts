import { UserModel } from '@branch-services/types';

export type DelegationSwitchStatus = 'success' | 'failed' | 'superseded';

export type DelegationSwitchResult = {
  status: DelegationSwitchStatus;
  error?: unknown;
};

type DelegationSwitchDependencies = {
  begin: () => void;
  finish: () => void;
  prepareQueriesForSwitch: () => Promise<void>;
  switchDelegation: (ssn: string) => Promise<unknown>;
  getCurrentProfile: () => Promise<UserModel>;
  commit: (profile: UserModel) => void;
  recoverWithoutProfile: () => void;
  reportError: (error: unknown) => void;
};

const isUserProfile = (value: unknown): value is UserModel =>
  Boolean(value && typeof value === 'object' && typeof (value as UserModel).clientSsn === 'string');

/**
 * The PUT endpoint has returned different envelopes across deployments. Use a
 * profile embedded in a successful response when present; otherwise fetch the
 * canonical profile after the server-side delegation context has changed.
 */
export const getProfileFromDelegationResponse = (response: unknown): UserModel | null => {
  const payload = response as any;
  const candidates = [
    payload,
    payload?.profile,
    payload?.user,
    payload?.userProfile,
    payload?.data,
    payload?.data?.profile,
    payload?.data?.user,
    payload?.data?.userProfile,
  ];

  return candidates.find(isUserProfile) ?? null;
};

/**
 * Serializing writes is important because the delegation endpoint changes a
 * shared server-side session. A later selection is sent only after an earlier
 * request settles, and only the latest selection is allowed to commit locally.
 */
export const createDelegationSwitchCoordinator = (dependencies: DelegationSwitchDependencies) => {
  let latestRequestId = 0;
  let queue: Promise<unknown> = Promise.resolve();

  const switchTo = (ssn: string): Promise<DelegationSwitchResult> => {
    const requestId = ++latestRequestId;
    dependencies.begin();

    const run = async (): Promise<DelegationSwitchResult> => {
      let delegationApplied = false;

      try {
        // Stop observers and discard all old delegation-scoped query results
        // before the server context is changed.
        await dependencies.prepareQueriesForSwitch();
        const response = await dependencies.switchDelegation(ssn);
        delegationApplied = true;

        if (requestId !== latestRequestId) {
          return { status: 'superseded' };
        }

        const profile = getProfileFromDelegationResponse(response) ?? (await dependencies.getCurrentProfile());

        if (requestId !== latestRequestId) {
          return { status: 'superseded' };
        }

        dependencies.commit(profile);

        // The old cache was cancelled and removed before the PUT. Publishing
        // this profile makes active views acquire data for the new delegation
        // exactly once, without a second imperative refetch.

        return { status: 'success' };
      } catch (error) {
        if (requestId !== latestRequestId) {
          return { status: 'superseded' };
        }

        if (delegationApplied) {
          // The server may already have changed delegation. Do not revive the
          // prior local profile; force the normal profile bootstrap to recover
          // the effective server session instead.
          dependencies.recoverWithoutProfile();
        } else {
          dependencies.finish();
        }

        dependencies.reportError(error);
        return { status: 'failed', error };
      }
    };

    const operation = queue.then(run, run);
    // Keep the queue usable after a failure while preserving this operation's
    // result for its caller.
    queue = operation.then(
      () => undefined,
      () => undefined
    );

    return operation;
  };

  return { switchTo };
};
