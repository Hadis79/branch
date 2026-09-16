import { client, bbpUrl } from '@branch-services/client';

const Api = {
  getRequest: async (params) => {
    const { id, ...restParams } = params;

    const response = await client.get(`${bbpUrl}/request/${id}`, restParams);
    return response.data;
  },

  verify: async (params) => {
    const response = await client.post(`${bbpUrl}/user/verify-contact`, params);
    return response.data;
  },

  captcha: async () => {
    const response = await client.get(`${bbpUrl}/user/captcha`);
    return response.data;
  },

  resetLogin: async () => {
    const response = await client.post(`${bbpUrl}/user/login/reset`, null);
    return response.data;
  },

  getOtp: async () => {
    const response = await client.get(`${bbpUrl}/user/otp`);
    return response.data;
  },

  validateOtp: async ({ otp }) => {
    const response = await client.post(`${bbpUrl}/user/otp/validate`, null, {
      params: { otp },
    });

    return response.data;
  },

  cardList: async (params) => {
    const { userSSN } = params;

    const queryParams = {
      userSSN,
    };

    const filteredQueryParams = Object.entries(queryParams)
      .filter(([_, v]) => v !== undefined && v !== null && v !== '')
      .map(([k, v]) => `${k}=${v}`)
      .join('&');

    const queryString = new URLSearchParams(filteredQueryParams).toString();

    const response = await client.get(`${bbpUrl}/user/card/list?${queryString}`);
    return response.data;
  },

  cardOtp: async (params) => {
    const { panNo, cvv2, expDate } = params;

    const queryParams = {
      cvv2,
      expDate,
    };

    const filteredQueryParams = Object.entries(queryParams)
      .filter(([_, v]) => v !== undefined && v !== null && v !== '')
      .map(([k, v]) => `${k}=${v}`)
      .join('&');

    const queryString = new URLSearchParams(filteredQueryParams).toString();

    const response = await client.get(`${bbpUrl}/user/card/otp/${panNo}?${queryString}`);
    return response.data;
  },

  cardVerify: async ({ panNo, cvv2, expDate, otp }) => {
    const response = await client.post(`${bbpUrl}/user/card/verify/${panNo}`, null, {
      params: {
        cvv2,
        expDate,
        otp,
      },
    });

    return response.data;
  },
};
export default Api;
