import { client, bbpUrl } from '@branch-services/client';
import { ApiUtil, toApiDate } from '@branch-services/utils';
import { HistoryPaginationParams } from './api-type';
import { isInternalWithdrawal } from '../utils/utils';
import { RequestType } from '../utils/consts';
// import { LocalStorageKey } from '@branch-services/types';

const Api = {
  getHistory: async (params, pagination: HistoryPaginationParams) => {
    const {
      accountNumber,
      description,
      fromAmount,
      toAmount,
      paymentType,
      requestStatus,
      traceCode,
      deposit_id,
      fromDate,
      toDate,
      purpose,
      requestType,
      depositType,
    } = params;

    const queryParams = {
      accountNumber,
      description,
      fromAmount,
      toAmount,
      paymentType,
      requestStatus,
      traceCode,
      deposit_id,
      fromDate: toApiDate(fromDate),
      toDate: toApiDate(toDate),
      purpose,
      requestType: requestType === RequestType.ALL ? null : requestType,
      withWithdraw: isInternalWithdrawal(depositType),
    };

    const filteredQueryParams = Object.entries(queryParams)
      .filter(([_, v]) => v !== undefined && v !== null && v !== '')
      .map(([k, v]) => `${k}=${v}`)
      .join('&');

    const queryString = filteredQueryParams ? `?${filteredQueryParams}` : '';

    const response = await client.get(`${bbpUrl}/user-request/history${queryString}`);
    return response.data;
  },

  getPurposes: async () => {
    const response = await client.get(`${bbpUrl}/user-request/purposes`);
    return response.data;
  },
  downloadExportFile: async (params) => {
    const { id, page, size, requestType } = params;
    const queryParams = {
      page: page ?? 0,
      size: size ?? 20,
    };

    const filteredQueryParams = Object.entries(queryParams)
      .filter(([_, v]) => v !== undefined && v !== null && v !== '')
      .map(([k, v]) => `${k}=${v}`)
      .join('&');

    const queryString = new URLSearchParams(filteredQueryParams).toString();
    return await ApiUtil.getFile(`${bbpUrl}/user-request/${id}/output-file?${queryString}`);
  },
  getPaymentStatus: async () => {
    const res = await client.get(`${bbpUrl}/user-request/list/status`);
    return res.data;
  },

  downloadRequestFile: async (params) => {
    const { id } = params;
    return await ApiUtil.getFile(`${bbpUrl}/user-request/upload-file/download/${id}`);
  },

  getInqueryDetailsCache: async (requestId, requestType) => {
    let api;
    const onlineApi = `${bbpUrl}/user-request/transaction-details/${requestId}`;
    const offlineAchApi = `${bbpUrl}/offline-ach/user-request/transaction-details/${requestId}`;
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
  getInqueryDetails: async (requestId) => {
    const response = await client.get(`${bbpUrl}/user-request/batch-transaction-details/${requestId}`);
    return response.data;
  },
};
export default Api;
