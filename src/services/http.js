import axios from 'axios'
import store from '../store'

axios.defaults.headers['Access-Control-Allow-Origin'] = '*'
axios.defaults.headers.common.Accept = 'application/json'
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN'
axios.defaults.xsrfCookieName = 'csrftoken'

export class BaseHttp {
  BASE_URL = ''
  API_URL = ''
  HTTP_AUTHORIZATION_HEADER = ''
  token = ''

  constructor() {
    this.token = ''
    this.requests = {}
  }

  /**
   *
   * @param {String} resource Resource
   * @param {String} path     Extended path
   */
  getUrl(resource, path = '') {
    return `${this.API_URL}/${resource}/${path}`
  }

  /**
   * Returns the current token
   */
  getToken() {
    return this.token
  }

  /**
   * Sets the token
   * @param {String} token The token
   */
  setToken(token) {
    this.token = token
  }

  /**
   * Default request error handler
   */
  handleError() {

  }

  /**
   * Returns a axios configuration object given the following parameters
   * @param {String} method       HTTP Method
   * @param {String} url          Target URL
   * @param {Object} data         [Optional]: Body of the HTTP Post request
   * @param {Object} params       [Optional]: HTTP GET Parameters
   * @param {Object} extraConfig  [Optional]: Extra Axios configuration
   * @param {Object} headers      [Optional]: HTTP requests headers
   * @param {String} token        [Optional]: JWT Token
   *
   * @returns {Object}            Axios configuration object
   */
  _makeAxiosConfig(method, url, { data = {}, params = {}, extraConfig = {}, headers = {}, token = ''}) {
    let newHeaders = headers
    if (token) {
      newHeaders = { ...headers, 'x-auth': token }
    }

    return { method, url, params, data, headers: newHeaders, ...extraConfig }
  }

  /**
   * Makes a HTTP request
   * @param {String} method             HTTP Method
   * @param {String} url                Target URL
   * @param {Object} data               [Optional]: Body of the HTTP Post request
   * @param {Object} params             [Optional]: HTTP GET Parameters
   * @param {Object} extraConfig        [Optional]: Extra Axios configuration
   * @param {Object} headers            [Optional]: HTTP requests headers
   * @param {String} token              [Optional]: JWT Token
   * @param {String} responseProperty   [Optional]: Response property to return
   *
   * @returns {Object}            Response data from the server
   * @throws                      Exception to be captured
   */
  async request(method, url, { data = {}, params = {}, config = {}, headers = {}, token = '', responseProperty = 'data' }) {
    this.abort(this.requests[url])
    const cancelToken = axios.CancelToken.source()
    this.requests = { ...this.requests, [url]: cancelToken }
    const axiosConfig = this._makeAxiosConfig(method, url, { data, params, extraConfig: { ...config, cancelToken: cancelToken.token }, headers, token })
    try {
      const response = await axios(axiosConfig)
      return response[responseProperty]
    } catch (error) {
      this.handleError(error)
      throw error
    }
  }

  async abort(source) {
    if (source) {
      source.cancel({ isCancelled: true, reason: 'Duplicate request found' })
    }
  }

  getBaseUrl() {
    return this.API_URL
  }
}

export default class Http extends BaseHttp {
  BASE_URL = process.env.VUE_APP_BASE_URL
  API_URL = `${process.env.VUE_APP_API_URL}:${process.env.VUE_APP_HTTP_PORT}`
  HTTP_AUTHORIZATION_HEADER = 'x-auth'
  LOGIN_URL = `${this.API_URL}/auth/login`
  SIGN_UP_URL = `${this.API_URL}/auth/sign-up`
  CHANGE_PASSWORD_URL = `${this.API_URL}/auth/password/change`
  GET_ME = `${this.API_URL}/auth/me`
  RESET_PASSWORD = `${this.API_URL}/auth/password/reset`

  getToken() {
    return store.state.auth.user ? store.state.auth.user.token : ''
  }

  handleError(error) {
    if (error.response && error.response.status === 401) {
      // store.dispatch('logout')
    }
  }

  /**
   * Gets a specified item
   * @param {Object} item
   */
  async get(resource, id, params) {
    const options = {
      token: this.getToken(),
      params
    }
    const url = this.getUrl(resource, id)

    return this.request('GET', url, options)
  }

  /**
   * Creates a new resource
   * @param {Object} data
   */
  async post(resource, data) {
    const options = { data, token: this.getToken() }
    const url = this.getUrl(resource)

    return this.request('POST', url, options)
  }

  /**
   * Updates a specified item
   * @param id Item id
   * @param {Object} data
   */
  async put(resource, id, data) {
    const options = { data, token: this.getToken() }
    const url = this.getUrl(resource, id)

    return this.request('PUT', url, options)
  }

  /**
   * Deletes a specified item
   * @param {Object} item
   */
  async delete(resource, id) {
    const options = { token: this.getToken() }
    const url = this.getUrl(resource, id)

    return this.request('DELETE', url, options)
  }

  /**
   * Returns a resource item list
   *
   * @param {Object} filters Filters applied
   */
  async list(resource, params = {}) {
    const options = { params, token: this.getToken() }
    const url = this.getUrl(resource)

    return this.request('GET', url, options)
  }

  /**
   * Uploads a file
   * @param {File} file     The file to upload
   * @param {String} url    [Optional]: endpoint url
   */
  async upload(file, url) {
    const data = new FormData()
    data.append('file', file, file.name)
    const options = {
      data,
      token: this.getToken(),
      headers: {
        'Content-Disposition': `attachment; filename=${file.name}`
      }
    }

    return this.request('POST', url, options)
  }

  /**
   * Returns blob data
   * @param {String} id       Resource id
   * @param {String} type     File type
   */
  async download(url, params = {}, headers = {}) {
    const options = { token: this.getToken(), params, config: { responseType: 'blob' }, headers }
    return this.request('GET', url, options)
  }

  /**
   * Log in a user
   * @param {String}      email Username
   * @param {String}      password Password
   *
   * @returns {String}    Response data
   */
  async login(email, password) {
    const options = {
      data: { 
        email, 
        password
      }
    }

    return this.request('POST', this.LOGIN_URL, options)
  }
}
