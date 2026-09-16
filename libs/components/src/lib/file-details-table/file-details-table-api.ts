import { bbpUrl, client } from '@branch-services/client';
import { ApiParams } from './types';

const Api = {
  getFileDetails: async (params: ApiParams) => {
    const { ssn, id, size, page, serviceUrl, filter } = params;
    const response = await client.get(
      `${bbpUrl}/payment-request/import-file/${ssn}/${id}/${serviceUrl}?page=${page - 1}&size=${size}`,
      {
        params: {
          status: filter?.status ? filter?.status : null,
          destinationAccount: filter?.destinationAccount ? filter?.destinationAccount?.trim() : null,
        },
      }
    );
    return response.data;
  },
  getFileDetailsStatuses: async () => {
    const response = await client.get(`${bbpUrl}/history/request-details-status`);
    return response.data;
  },

  getFileDetailsBranchUser: async (params) => {
    const { id, filter, page, size, serviceUrl } = params;
    const queryParams = {
      destinationAccount: filter?.destinationAccount,
      page: page - 1,
      size: size,
    };

    const filteredQueryParams = Object.entries(queryParams)
      .filter(([_, v]) => v !== undefined && v !== null && v !== '')
      .map(([k, v]) => `${k}=${v}`)
      .join('&');
    const queryString = filteredQueryParams ? `?${filteredQueryParams}` : '';
    let api;
    const onlineApi = `${bbpUrl}/user-request/import-file/${id}/details${queryString}`;
    const offlineAchApi = `${bbpUrl}/offline-ach/user-request/import-file/${id}/details${queryString}`;
    // const offlineApi = `${bbpUrl}/user-request/import-file/${id}/details${queryString}`;
    switch (serviceUrl) {
      case 'details':
        api = onlineApi;
        break;

      case 'details-ach':
        api = offlineAchApi;
        break;

      default:
        break;
    }
    const response = await client.get(api);
    return response.data;
  },
};

export default Api;
