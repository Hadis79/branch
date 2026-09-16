import { client, bbpUrl } from '@branch-services/client';
import { DownloadReceiptParams, DownloadRequestParams } from '@branch-services/types';
import { ApiUtil } from '@branch-services/utils';

const Api = {
  getMenus: async () => {
    const response = await client.get(`${bbpUrl}/menu`);
    return response.data;
  },
  getUserPhoto: async () => {
    return { photo: 'photo' };
  },
  changeOrg: async (orgId) => {
    const response = await client.patch(`api/organizations/change/${orgId}`);
    return response.data;
  },
  getUserProfile: async () => {
    const response = await client.get(`${bbpUrl}/user/profile`);
    return response.data;
  },

  getBankUnits: async () => {
    const response = await client.get(`${bbpUrl}/bank-units`);
    return response.data;
  },

  getUserRefrencesProfile: async () => {
    const response = await client.get(`${bbpUrl}/user/profile`);
    return response.data;
  },
  downloadRequestFile: async (params: DownloadRequestParams) => {
    return await ApiUtil.getFile(`${bbpUrl}/payment-request/import-file/${params.ssn}/${params.id}`);
  },

  downloadOfflineRequestFile: async (id) => {
    return await ApiUtil.getFile(`${bbpUrl}/user-request/upload-file/download/${id}`);
  },
  downloadReceipt: async (params: DownloadReceiptParams) => {
    return await ApiUtil.getFile(`${bbpUrl}/receipt/${params.requestId}/pdf`);
  },

  downloadReceiptBranchUser: async (params) => {
    const { requestType } = params;
    let api;
    const onlineApi = `${bbpUrl}/user-request/${params.requestId}/pdf`;
    const offlineAchApi = `${bbpUrl}/offline-ach/user-request/${params.requestId}/pdf`;
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

    return await ApiUtil.getFile(api);
  },

  downloadReceiptQueryStatus: async (params) => {
    return await ApiUtil.getFile(`${bbpUrl}/user-request/download-error-file/${params.requestId}`);
  },
};
export default Api;
