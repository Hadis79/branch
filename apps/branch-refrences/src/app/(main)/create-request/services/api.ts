import { client, bbpUrl } from '@branch-services/client';
import { ApiUtil } from '@branch-services/utils';

const Api = {
  uploadFile: async (params) => {
    const {
      file,
      accountNumber,
      paymentType,
      allowSplitPay,
      hasIbanInquiry,
      isWithWithdraw,
      branchCode,
      branchName,
      description,
      title,
      accountBranchCode,
      purpose,
    } = params;

    const queryParams = {
      paymentType,
      accountNumber,
      title,
      purpose,
      allowSplitPay,
      branchCode,
      branchName,
      description,
      isWithWithdraw,
      hasIbanInquiry,
      accountBranchCode,
    };

    const filteredQueryParams = Object.entries(queryParams)
      .filter(([_, v]) => v !== undefined && v !== null && v !== '')
      .map(([k, v]) => `${k}=${v}`)
      .join('&');

    const queryString = new URLSearchParams(filteredQueryParams).toString();

    const body = {
      file,
    };

    const response = await client.post(`${bbpUrl}/user-request/upload-file?${queryString}`, body, {
      headers: { 'content-type': 'multipart/form-data' },
    });

    return response.data;
  },

  downloadErrorFile: async (params) => {
    const { fileId } = params;
    return await ApiUtil.getFile(`${bbpUrl}/user-request/download-error-file`);
  },

  getPurposes: async () => {
    const response = await client.get(`${bbpUrl}/user-request/purposes`);
    return response.data;
  },

  createBatchRequest: async () => {
    return await client.post(`${bbpUrl}/user-request/create`, null, {
      headers: { 'Content-Type': 'application/json' },
    });
  },

  evictCache: async (id) => {
    // return await client.delete(`${bbpUrl}/user-request/evict-cache/${id}`);
    return await client.delete(`${bbpUrl}/user-request/evict-cache`);
  },

  getPaymentId: async (accountNumber, amount) => {
    const response = await client.get(`${bbpUrl}/payment-request/payment-id/${accountNumber}/${amount}`);
    return response.data;
  },

  getCheckValidation: async (params) => {
    const { id: requestId } = params;
    // const response = await client.get(`${bbpUrl}/user-request/check-validation/${requestId}`);
    const response = await client.get(`${bbpUrl}/user-request/check-validation`);
    return response.data;
  },

  getFileDetails: async (params) => {
    const { id, filter, page, size } = params;
    const queryParams = {
      destinationAccount: filter?.destinationAccount,
      page: page,
      size: size,
    };

    const filteredQueryParams = Object.entries(queryParams)
      .filter(([_, v]) => v !== undefined && v !== null && v !== '')
      .map(([k, v]) => `${k}=${v}`)
      .join('&');

    const queryString = filteredQueryParams ? `?${filteredQueryParams}` : '';
    const response = await client.get(`${bbpUrl}/user-request/import-file/${id}/details${queryString}`);
    return response.data;
  },

  bankUnits: async (params) => {
    const { criteria } = params;

    const queryParams = {
      criteria,
      limit: 10,
    };

    const filteredQueryParams = Object.entries(queryParams)
      .filter(([_, v]) => v !== undefined && v !== null && v !== '')
      .map(([k, v]) => `${k}=${v}`)
      .join('&');

    const queryString = filteredQueryParams ? `?${filteredQueryParams}` : '';

    const response = await client.get(`${bbpUrl}/bank-units${queryString}`);
    return response.data;
  },
};
export default Api;
