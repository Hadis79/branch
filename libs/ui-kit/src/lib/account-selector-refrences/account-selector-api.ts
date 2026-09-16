import { bbpUrl, client } from '@branch-services/client';
import { AccountType } from './account-selector-type';
import { PaginatedData } from '@branch-services/types';

const Api = {
  getAccounts: async (legalId, accountNumber) => {
    const response = await client.get(`${bbpUrl}/account-controller/accounts`, {
      params: { accountNumber },
    });
    return response.data as PaginatedData<AccountType>;
  },
  getBalance: async (legalId, accountNumber) => {
    const response = await client.get(`${bbpUrl}/account-controller/${accountNumber}/balance`);
    return response.data as PaginatedData<AccountType>;
  },
};
export default Api;
