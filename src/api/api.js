import axios from "axios";

const BASE_URL = "http://interview.agileengine.com";

const transport = axios.create({ withCredentials: false })

transport.interceptors.request.use(
  request => {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken)
      request.headers.common['Authorization'] = 'Bearer ' + accessToken;

    return request;
  },
  error => {
    return Promise.reject(error);
  }
);

transport.interceptors.response.use((response) => {
  // every OK response gets forwarded
  return response;
}, (error) => {
  return Promise.reject(error);
});


class API {
  static get(route, queryParams) {
    const config = {
      params: queryParams
    }
    return transport.get(BASE_URL + route, config);
  }

  static post(route, body, headers) {
    return transport.post(BASE_URL + route, body, {
      headers: headers
    });
  }
}
export default API;