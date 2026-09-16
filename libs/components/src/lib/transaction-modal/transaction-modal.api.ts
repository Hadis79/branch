import { bbpUrl, client } from '@branch-services/client';

export const Api = {
  getInqueryDetails: async (ssn, id) => {
    const response = await client.get(`${bbpUrl}/payment-request/import-file/${ssn}/${id}/inquiry`);
    return response.data;
  },
};
