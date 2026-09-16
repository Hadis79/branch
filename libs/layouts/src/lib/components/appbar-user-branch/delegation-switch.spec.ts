import { UserModel } from '@branch-services/types';
import { createDelegationSwitchCoordinator } from './delegation-switch';

const profile = (clientSsn: string) => ({ clientSsn } as UserModel);

describe('delegation switch coordinator', () => {
  it('commits the latest selection only and makes it available before navigation', async () => {
    const prepareQueriesForSwitch = jest.fn().mockResolvedValue(undefined);
    const switchDelegation = jest.fn().mockResolvedValueOnce({}).mockResolvedValueOnce(profile('new-delegation'));
    const getCurrentProfile = jest.fn().mockResolvedValue(profile('old-delegation'));
    const commit = jest.fn();
    const navigate = jest.fn(() => commit.mock.calls[commit.mock.calls.length - 1]?.[0]);

    const coordinator = createDelegationSwitchCoordinator({
      begin: jest.fn(),
      finish: jest.fn(),
      prepareQueriesForSwitch,
      switchDelegation,
      getCurrentProfile,
      commit,
      recoverWithoutProfile: jest.fn(),
      reportError: jest.fn(),
    });

    const firstSwitch = coordinator.switchTo('old-delegation');
    const latestSwitch = coordinator.switchTo('new-delegation');

    await expect(firstSwitch).resolves.toEqual({ status: 'superseded' });
    await expect(latestSwitch).resolves.toEqual({ status: 'success' });

    expect(switchDelegation).toHaveBeenNthCalledWith(1, 'old-delegation');
    expect(switchDelegation).toHaveBeenNthCalledWith(2, 'new-delegation');
    expect(getCurrentProfile).not.toHaveBeenCalled();
    expect(commit).toHaveBeenCalledTimes(1);
    expect(navigate()).toEqual(profile('new-delegation'));
    expect(prepareQueriesForSwitch).toHaveBeenCalledTimes(2);
  });

  it('does not restore the previous profile when the PUT succeeded but profile hydration failed', async () => {
    const recoverWithoutProfile = jest.fn();
    const reportError = jest.fn();
    const profileError = new Error('profile unavailable');

    const coordinator = createDelegationSwitchCoordinator({
      begin: jest.fn(),
      finish: jest.fn(),
      prepareQueriesForSwitch: jest.fn().mockResolvedValue(undefined),
      switchDelegation: jest.fn().mockResolvedValue({}),
      getCurrentProfile: jest.fn().mockRejectedValue(profileError),
      commit: jest.fn(),
      recoverWithoutProfile,
      reportError,
    });

    await expect(coordinator.switchTo('new-delegation')).resolves.toEqual({ status: 'failed', error: profileError });

    expect(recoverWithoutProfile).toHaveBeenCalledTimes(1);
    expect(reportError).toHaveBeenCalledWith(profileError);
  });
});
