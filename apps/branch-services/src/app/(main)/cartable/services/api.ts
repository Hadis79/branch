import { bbpUrl, client } from '@branch-services/client';
import { ApiUtil } from '@branch-services/utils';

const Api = {
  getCartable: async (params) => {
    const response = await client.get(`${bbpUrl}/cartable`, { params });
    return response.data.content;
  },

  getCartableDetail: async (id) => {
    const response = await client.get(`${bbpUrl}/cartable/${id}`);
    return response.data;
  },

  rejectRequest: async (id) => {
    const response = await client.delete(`${bbpUrl}/cartable/${id}`);
    return response.data;
  },

  rejectOfflineRequest: async (id) => {
    const response = await client.delete(`${bbpUrl}/cartable/offline-ach/${id}`);
    return response.data;
  },

  downloadOfflineRequestFile: async (id) => {
    return await ApiUtil.getFile(`${bbpUrl}/user-request/upload-file/download/${id}`);
  },

  confirmRequest: async (id) => {
    const response = await client.patch(`${bbpUrl}/cartable/${id}`);
    return response.data;
  },

  confirmOfflineAchRequest: async (id) => {
    const response = await client.patch(`${bbpUrl}/cartable/offline-ach/${id}`);
    return response.data;
  },
};

export default Api;
