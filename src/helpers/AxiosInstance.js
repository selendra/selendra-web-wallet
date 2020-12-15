import axios from 'axios';
import Cookie from 'js-cookie';

export default () => {
  const baseURL = process.env.REACT_APP_API;

  let headers = {};

  if(Cookie.get('token')) {
    headers.Authorization = `Bearer ${Cookie.get('token')}`;
  }

  const axiosInstance = axios.create({
    baseURL: baseURL,
    headers,
  });

  // Axios auth Interceptor (to check authentication error from the server)
  axiosInstance.interceptors.response.use(
    (response) =>
      new Promise((resolve, reject) => {
        resolve(response);
      }),
      (error) => {
        if (!error.response) {
          return new Promise((resolve, reject) => {
            reject(error);
          });
        }
        if (error.response.status >= 400) {
          Cookie.remove("token");
          window.location = "/login";
        } 
        else {
          window.location = "/login";
        }
      }
  );
  return axiosInstance;
}