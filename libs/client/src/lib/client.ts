import axios from 'axios';

import { LocalStorageKey } from '@branch-services/types';
import { readFromCookieByKey, storage } from '@branch-services/utils';

const baseUrl = '/';

export const bbpUrl = process.env['NEXT_PUBLIC_BBP_PREFIX'];
const token = process.env['NEXT_PUBLIC_AUTH_TOKEN'];
const project = process.env.NEXT_PUBLIC_APP_NAME;
const client = axios.create({
  baseURL: baseUrl,
  timeout: 220000,
  // maxRedirects: 0,// Disable automatic following of redirect responses
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    // csrf: '',
    // 'Access-Control-Allow-Origin': '*',
    // 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    // 'Access-Control-Request-Method': 'GET/POST/OPTIONS',
  },
  withCredentials: true,
});

const clearAuthStorage = () => {
  const authKeys = [
    LocalStorageKey.USER,
    LocalStorageKey.USER_PROFILE,
    LocalStorageKey.USER_PHOTO,
    LocalStorageKey.Accounts,
    LocalStorageKey.WITHDRAWAL_TYPE,
    LocalStorageKey.USER_ORG,
    LocalStorageKey.MENU,
    LocalStorageKey.PURPOSES,
  ];

  authKeys.forEach((key) => storage.removeItem(key));
};

let isRedirectingToLogin = false;

const handleExpiredSession = (location = project === 'branch-refrences' ? '/logout' : '/api/logout') => {
  clearAuthStorage();

  if (typeof window === 'undefined' || isRedirectingToLogin) {
    return;
  }

  isRedirectingToLogin = true;
  window.location.assign(location || (project === 'branch-refrences' ? '/logout' : '/api/logout'));
};

const getRedirectedResponseUrl = (response) => {
  if (typeof window === 'undefined') {
    return null;
  }

  const responseUrl = response?.request?.responseURL;
  const requestUrl = response?.config?.url;

  if (!responseUrl || !requestUrl) {
    return null;
  }

  try {
    const requestedUrl = new URL(requestUrl, window.location.origin).href;
    const finalUrl = new URL(responseUrl, window.location.origin).href;

    return requestedUrl === finalUrl ? null : finalUrl;
  } catch {
    return null;
  }
};

// Add a request interceptor
client.interceptors.request.use(async (config) => {
  // Read 'XSRF-TOKEN' from cookies
  const xsrfToken = readFromCookieByKey('X-XSRF-TOKEN');
  const appConfig: any = storage.getItem(LocalStorageKey.CONFIG);

  // console.log('xsrfToken', xsrfToken);

  // Add 'X-XSRF-TOKEN' to headers
  config.headers['X-XSRF-TOKEN'] = xsrfToken;
  config.headers['Accept-Language'] = JSON.parse(appConfig).locale;
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

client.interceptors.response.use(
  (response) => {
    // Browsers automatically follow 302 responses before Axios receives them.
    // A redirect from an API request to an HTML page is an expired-session redirect.
    const redirectedResponseUrl = getRedirectedResponseUrl(response);
    const isRedirectedToHtmlPage =
      redirectedResponseUrl && String(response?.headers?.['content-type']).toLowerCase().includes('text/html');

    if (response?.status === 302 || response?.status === 402 || isRedirectedToHtmlPage) {
      handleExpiredSession(redirectedResponseUrl ?? (project === 'branch-refrences' ? '/logout' : '/api/logout'));
    }
    return response;
  },
  async (error) => {
    const originalConfig = error.config;
    // console.info('error axios', originalConfig.url);

    if (originalConfig?.url !== '/auth' && error.response) {
      if ([302, 401, 402, 307].includes(error.response.status)) {
        handleExpiredSession(error?.response?.data?.location);
      }

      if (originalConfig?.url?.endsWith('/profile')) {
        if (!window.location.href.endsWith('/server-error')) {
          // console.log('loc', window.location);
          window.location.href = '/server-error';
        }
      }
    }
    return Promise.reject(error);
  }
);

export default client;
