import { client, bbpUrl } from '@branch-services/client';

const Api = {
  getSsnInformation: async (params) => {
    const { SSN } = params;
    const response = await client.get(`${bbpUrl}/customer/${SSN}/person`);
    return response.data;
  },

  getLegalSsnInformation: async (params) => {
    const { ssn } = params;
    const response = await client.get(`${bbpUrl}/customer/${ssn}/corporate`);
    return response.data;
  },

  getAgentInformation: async (params) => {
    const { userSsn: branchAgentSsn } = params;
    const response = await client.get(`${bbpUrl}/delegation/${branchAgentSsn}`);
    return response.data;
  },

  removeAgent: async (params) => {
    const { orgSsn, branchAgentSsn } = params;
    const response = await client.delete(`${bbpUrl}/delegation/${orgSsn}/${branchAgentSsn}`);
    return response.data;
  },

  submitAgent: async (params) => {
    const response = await client.post(`${bbpUrl}/delegation`, params);
    return response.data;
  },
};
export default Api;
