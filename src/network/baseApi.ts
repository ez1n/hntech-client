import axios, { AxiosInstance } from 'axios';

axios.defaults.withCredentials = true;

const baseApi: AxiosInstance = axios.create({
  baseURL: `http://13.125.250.39`,
});

export default baseApi;