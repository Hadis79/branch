import { bbpUrl, client } from '@branch-services/client';

const Api = {
  getCartableOperation: async (params) => {
    const response = await client.get(`${bbpUrl}/cartable/operation`, { params });
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

  approveOfflineRequest: async (id) => {
    const response = await client.patch(`${bbpUrl}/cartable/operation/${id}`);
    return response.data;
  },
};

export default Api;
