import { bbpUrl, client } from '@branch-services/client';
import { ApiParams } from './types';
import { ApiUtil, removeLettersFromNumber } from '@branch-services/utils';

const Api = {
  // getFileDetails: async (params: ApiParams) => {
  //   const { ssn, id, size, page, serviceUrl, filter } = params;
  //   const response = await client.get(
  //     `${bbpUrl}/payment-request/import-file/${ssn}/${id}/${serviceUrl}?page=${page - 1}&size=${size}`,
  //     {
  //       params: {
  //         status: filter?.status ? filter?.status : null,
  //         destinationAccount: filter?.destinationAccount ? filter?.destinationAccount?.trim() : null,
  //       },
  //     }
  //   );
  //   return response.data;
  // },

  getFileDetails: async (params) => {
    const { id, filter, page, size } = params;

    const queryParams = {
      destinationAccount: filter?.destinationAccount,
      status: filter?.requestStatus,
      fromAmount: removeLettersFromNumber(filter?.fromAmount),
      toAmount: removeLettersFromNumber(filter?.toAmount),
      depositId: filter?.deposit_id,
      traceNumber: filter?.traceCode,
      purpose: filter?.purpose,
      page,
      size,
    };

    const filteredQueryParams = Object.entries(queryParams)
      .filter(([_, v]) => v !== undefined && v !== null && v !== '')
      .map(([k, v]) => `${k}=${v}`)
      .join('&');

    const queryString = new URLSearchParams(filteredQueryParams).toString();
    const response = await client.get(`${bbpUrl}/user-request/${id}/details?${queryString}`);
    return response?.data;
  },
  getFileDetailsStatuses: async () => {
    const response = await client.get(`${bbpUrl}/user-request/request-details-status`);
    return response?.data;
  },

  getPaymentStatus: async () => {
    const res = await client.get(`${bbpUrl}/user-request/request-details-status`);
    return res.data;
  },

  getPurposes: async () => {
    const response = await client.get(`${bbpUrl}/user-request/purposes`);
    return response.data;
  },

  downloadReceiptBranchUser: async (params) => {
    const { requestId, detailsId } = params;
    return await ApiUtil.getFile(`${bbpUrl}/user-request/${requestId}/${detailsId}/detailsReceipt`);
  },

  getFileDetailsStatus: async (params) => {
    const { id, filter, page, size, requestType } = params;
    const queryParams = {
      destAccNameOrNumber: filter?.destinationAccount,
      page,
      size,
    };

    const filteredQueryParams = Object.entries(queryParams)
      .filter(([_, v]) => v !== undefined && v !== null && v !== '')
      .map(([k, v]) => `${k}=${v}`)
      .join('&');

    const queryString = filteredQueryParams ? `?${filteredQueryParams}` : '';
    let api;
    const onlineApi = `${bbpUrl}/user-request/file-details/${id}${queryString}`;
    const offlineAchApi = `${bbpUrl}/offline-ach/user-request/file-details/${id}${queryString}`;
    // const offlineApi = `${bbpUrl}/user-request/import-file/${id}/details${queryString}`;
    switch (requestType) {
      case 'ONLINE':
        api = onlineApi;
        break;

      case 'OFFLINE_ACH':
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
