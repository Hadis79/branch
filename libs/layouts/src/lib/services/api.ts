import { client, bbpUrl } from '@branch-services/client';

const Api = {
  getMenus: async () => {
    const response = await client.get(`${bbpUrl}/profile/menu`);
    return response.data;
  },
  // getUserPhoto: async () => {
  //   const response = await client.get(`${bbpUrl}/profile/photo`);
  //   return response.data;
  // },
  getUserPhoto: async () => {
    return { photo: 'photo' };
  },
  // getUserOrg: async (params) => {
  //   const response = await client.get(`${bbpUrl}/profile/organizations`, {
  //     params: params,
  //   });
  //   return response.data;
  // },
  // getUserOrg: async (params) => {
  //   return { currentOrganization: { nameFa: 'میلاد', nameEn: 'Milad', ssn: 'سازمان امور مالیاتی کل کشور' } };
  // },
  changeOrg: async (orgId) => {
    const response = await client.patch(`api/organizations/change/${orgId}`);
    return response.data;
  },
  // getUserProfile: async () => {
  //   const response = await client.get(`${bbpUrl}/profile`);
  //   return response.data;
  // },
  getUserProfile: async () => {
    const response = await client.get('https://jsonplaceholder.typicode.com/users');
    return response;
  },

  getLogOutServices: async () => {
    const response = await client.post(`${bbpUrl}/user/logout`);
    return response;
  },

  getOrganizationList: async () => {
    const response = await client.get(`${bbpUrl}/user/delegation`);
    return response;
  },

  setOrganization: async (params) => {
    const { ssn } = params;
    const queryParams = {
      ssn,
    };

    const filteredQueryParams = Object.entries(queryParams)
      .filter(([_, v]) => v !== undefined && v !== null && v !== '')
      .map(([k, v]) => `${v}`)
      .join('&');

    const queryString = filteredQueryParams ? `/${filteredQueryParams}` : '';
    const response = await client.put(`${bbpUrl}/user/delegation${queryString}`, null, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response;
  },
};
export default Api;
