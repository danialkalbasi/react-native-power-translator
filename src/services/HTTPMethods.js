/**
 * A class to handle the http methods.
 * This class is Singleton.
 */
class HTTPMethods {
    headers = {};
    caches = [];

    constructor() {
      this.setDefaultHeaders();
    }

    baseGet(url, headers) {
      return fetch(url, headers).then((result) => {
        if (result.ok) {
          return result;
        }
        return Promise.reject(this.handleError(url, 'Generic error'));
      }).catch(error => Promise.reject(this.handleError(url, error)));
    }

    get(url, cache = false, headers) {
      const getHeaders = headers || this.headers;

      if (cache) {
        const urlkey = this.getUrlKey(url);
        const cached = this.caches[urlkey];

        if (cached) {
          const responsePromise = new Promise((resolve) => {
            resolve(cached);
          });
          return responsePromise;
        }
        return this
          .baseGet(url, getHeaders)
          .then(this.toJson)
          .catch(error => Promise.reject(this.handleError(url, error)));
      }
      return this
        .baseGet(url, getHeaders)
        .then(this.toJson)
        .catch(error => Promise.reject(this.handleError(url, error)));
    }

    post(url, data, headers) {
      return fetch(url, {
        method: 'POST',
        headers: headers || this.headers,
        body: JSON.stringify(data),
      }).then(this.toJson);
    }

    handleError(url, error) {
      const errorMessage = `The URL: ${url}, Error: ${error}`;
      throw new Error(errorMessage);
    }

    setDefaultHeaders() {
      this.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        token: '',
      };
    }

    toJson(data) {
      let isJson = true;
      if (typeof data === 'boolean' || typeof data === 'number') {
        isJson = false;
      }
      if (data.headers.get('Content-Type').includes('application/xml;')) {
        isJson = false;
      }

      return isJson ? data.json() : data;
    }

    getUrlKey(url) {
      return url.replace(/[^\w\s]/gi, '');
    }
}

export default new HTTPMethods();
