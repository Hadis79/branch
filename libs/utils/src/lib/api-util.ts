import { readFromCookieByKey } from './util';
const token = process.env['NEXT_PUBLIC_AUTH_TOKEN'];

export const ApiUtil = {
  downloadFile: function (data, type, extension, preferredName?) {
    const blob = new Blob([data], { type: type });
    const downloadUrl = URL.createObjectURL(blob);

    if (/(iP)/g.test(navigator.userAgent)) {
      alert('Your device do not support files downloading. Please try again in desktop browser.');
      return false;
    }
    const link = document.createElement('a');
    link.href = downloadUrl;
    if (link.download !== undefined) {
      if (!preferredName) {
        link.download = downloadUrl.substring(downloadUrl.lastIndexOf('/') + 1, downloadUrl.length) + '.' + extension;
      } else link.download = preferredName;
    }
    if (document.createEvent) {
      const e = document.createEvent('MouseEvents');
      e.initEvent('click', true, false);
      link.dispatchEvent(e);
      return true;
    }

    return false;
  },
  getFile: function (serviceURL: string, params?: any, options?: any) {
    const { method = 'GET', encodeQuery = true, contentType = 'application/octet-stream' } = options ?? {};

    const xsrfTokenKey = 'XSRF-TOKEN';
    const xsrfToken = readFromCookieByKey(xsrfTokenKey) as string;

    const xhr = new XMLHttpRequest();
    if (params && typeof params === 'object' && encodeQuery) {
      serviceURL = serviceURL + '?' + this.encodeQueryData(params);
    }

    return new Promise(function (resolve, reject) {
      xhr.open(method, `/${serviceURL}`, true);
      xhr.responseType = 'blob';
      xhr.setRequestHeader('Content-type', contentType);
      xhr.setRequestHeader('X-XSRF-TOKEN', xsrfToken);
      if (token) {
        xhr.setRequestHeader('Authorization', `Bearer ${token}`);
      }

      if (method === 'POST' && !encodeQuery) {
        // If method is POST and encodeQuery is false, send params in the request body
        xhr.send(JSON.stringify(params));
      } else {
        xhr.send();
      }

      xhr.onload = function (e) {
        try {
          if (xhr.readyState === 4 && xhr.status === 200) {
            resolve(xhr.response);
          } else {
            reject(e);
          }
        } catch (e) {
          reject(e);
        }
      };

      xhr.onerror = (error) => {
        reject(error);
      };
    });
  },
  encodeQueryData: function (data) {
    const ret: any[] = [];
    for (const d in data) {
      if (encodeURIComponent(data[d]) !== 'null') {
        ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
      }
    }
    return ret.join('&');
  },
  getErrorMessage: function (reason) {
    if (!reason) {
      return null;
    }

    let errorMessage: any = {};
    try {
      if (reason.response.data.subErrors && reason.response.data.subErrors.length !== 0) {
        errorMessage = {
          txt: reason.response.data.localizedMessage,
          type: 'error',
          shouldTranslate: false,
          subErrors: reason.response.data.subErrors,
        };
      } else if (reason.response.data.localizedMessage) {
        errorMessage = {
          txt: reason.response.data.localizedMessage,
          type: 'error',
          shouldTranslate: false,
        };
      } else if (reason.response.data.localMessage) {
        errorMessage = {
          txt: reason.response.data.localMessage,
          type: 'error',
          shouldTranslate: false,
        };
      } /*else {
            errorMessage = {
                txt: "unknown-error", type: 'error',
                shouldTranslate: true,
            };
        }*/
    } catch (e) {
    } finally {
      if (!errorMessage?.txt && !errorMessage?.type) {
        errorMessage = {
          txt: 'error.unknown_error',
          type: 'error',
          shouldTranslate: true,
        };
      }
    }

    return errorMessage;
  },
};
