import { client, bbpUrl } from '@branch-services/client';
import { ApiUtil } from '@branch-services/utils';
import { DownloadExportFileParams, HistoryPaginationParams, HistoryParams } from './api-type';

const Api = {
  getHistory: async (params: HistoryParams, pagination: HistoryPaginationParams) => {
    const response = await client.get(
      `${bbpUrl}/history/operation?page=${pagination.page - 1}&size=${pagination.size}`,
      {
        params,
      }
    );
    return response.data;
  },
  downloadExportFile: async (params: DownloadExportFileParams) => {
    return await ApiUtil.getFile(`${bbpUrl}/receipt/details/excel/${params.id}`);
  },
  getPaymentStatus: async () => {
    const res = await client.get(`${bbpUrl}/history/request-status`);
    return res.data;
  },
  getPurposes: async () => {
    const response = await client.get(`${bbpUrl}/payment-request/single/purposes`);
    return response.data;
  },
};
export default Api;
