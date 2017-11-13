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

    /**
     * For internal use only.
     * @param url is the http URL
     * @param url is the http URL
     * @returns promise response
     */
    baseGet(url, headers) {
      return fetch(url, headers).then((result) => {
        if (result.ok) {
          return result;
        }
        return Promise.reject(this.handleError(url, 'Generic error'));
      }).catch(error => Promise.reject(this.handleError(url, error)));
    }

    /**
     * Use the http get method
     * @param url is the http URL
     * @param cache whether do you need to cache the response
     * @param url is the http URL
     * @param headers is the http headers
     * @returns promise response
     */
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

    /**
     * Use the http post method
     * @param data is the data needs to post to the server
     * @param url is the http URL
     * @param headers is the http headers
     * @returns promise response
     */
    post(url, data, headers) {
      return fetch(url, {
        method: 'POST',
        headers: headers || this.headers,
        body: JSON.stringify(data),
      }).then(this.toJson);
    }

    /**
     * Show an error message when there is a response error
     * @param url the http url
     * @param error the promise error thrown by the http response
     */
    handleError(url, error) {
      const errorMessage = `The URL: ${url}, Error: ${error}`;
      throw new Error(errorMessage);
    }

    /**
     * Set default http headers for all requests
     */
    setDefaultHeaders() {
      this.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        token: '',
      };
    }

    /**
     * Convert response data to json
     * @param data is the response data
     * @returns json object
     */
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

    /**
     * Create an unique key from the url.
     * @param url is the http url
     * @returns string
     */
    getUrlKey(url) {
      return url.replace(/[^\w\s]/gi, '');
    }
}

export default new HTTPMethods();
