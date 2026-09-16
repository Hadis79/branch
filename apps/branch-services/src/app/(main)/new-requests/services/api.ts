import { client, bbpUrl } from '@branch-services/client';
import { ApiUtil } from '@branch-services/utils';

const Api = {
  getHistory: async (params) => {
    const response = await client.get(`${bbpUrl}/user-request/history`, {
      params,
    });
    return response.data;
  },
  getPurposes: async () => {
    const response = await client.get(`${bbpUrl}/payment-request/single/purposes`);
    return response.data;
  },
  getPaymentLimitInquiry: async (paymentType) => {
    const response = await client.get(`${bbpUrl}/payment-limit/inquiry`, { params: paymentType });
    return response.data;
  },
  getStatuses: async () => {
    const response = await client.get(`${bbpUrl}/user-request/list/status`);
    return response.data;
  },
  getCheckValidation: async (params) => {
    const { id } = params;
    const response = await client.get(`${bbpUrl}/user-request/check-validation/${id}`);
    return response.data;
  },
  postValidateRequest: async (requestId) => {
    const response = await client.post(`${bbpUrl}/user-request/${requestId}/validate`);
    return response.data;
  },
  postApproveRequest: async (params, id, ssn) => {
    const response = await client.post(`${bbpUrl}/user-request/approve/${id}`, null);
    return response.data;
  },
  postApproveOfflineAchRequest: async (id) => {
    const response = await client.post(`${bbpUrl}/user-request/approve/offline-ach/${id}`, null);
    return response.data;
  },
  getFileDetails: async (params) => {
    const { ssn, id, ...rest } = params;
    const response = await client.get(`${bbpUrl}/payment-request/import-file/${id}/details`, { params: rest });
    return response.data;
  },
  downloadErrorFile: async (params) => {
    const { id, ssn } = params;
    return await ApiUtil.getFile(`${bbpUrl}/payment-request/import-file/${id}/error`);
  },

  getUserFileDetails: async (params) => {
    const { requestId, ...rest } = params;
    const response = await client.get(`${bbpUrl}/user-request/file-details/${requestId}`, { params: rest });
    return response.data;
  },

  getTransactionDetails: async (params) => {
    const { requestId } = params;
    const response = await client.get(`${bbpUrl}/user-request/transaction-details/${requestId}`);
    return response.data;
  },
};
export default Api;
