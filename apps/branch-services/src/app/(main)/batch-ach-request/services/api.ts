import { client, bbpUrl } from '@branch-services/client';
import { ApiUtil } from '@branch-services/utils';

const Api = {
  uploadFile: async (params) => {
    const { ssn, file, ...restParams } = params;
    const config = {
      headers: { 'content-type': 'multipart/form-data' },
    };
    const response = await client.post(
      `${bbpUrl}/payment-request/import-file/${ssn}`,
      {
        file,
      },
      {
        params: { ...restParams },
        ...config,
      }
    );
    return response.data;
  },

  downloadErrorFile: async (params) => {
    const { fileId, ssn } = params;
    return await ApiUtil.getFile(`${bbpUrl}/payment-request/import-file/${ssn}/${fileId}/error`);
  },

  getPurposes: async () => {
    const response = await client.get(`${bbpUrl}/payment-request/single/purposes`);
    return response.data;
  },

  createBatchRequest: async (params) => {
    const { ssn, ...restParams } = params;
    return await client.post(`${bbpUrl}/payment-request/${ssn}/${params.id}`, restParams);
  },

  getPaymentId: async (accountNumber, amount) => {
    const response = await client.get(`${bbpUrl}/payment-request/payment-id/${accountNumber}/${amount}`);
    return response.data;
  },
};
export default Api;
