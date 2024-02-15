import axios from 'axios';
import IRequestLogin from '../interfaces/requestLogin';

const api = axios.create({
  baseURL: `http://localhost:3001`,
});

export const setToken = (token: SVGStringList) => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const requestData = async (endpoint: string) => {
  const { data } = await api.get(endpoint);
  return data;
};

export const postRequest = async (endpoint: string, body: IRequestLogin) => {
  const { data } = await api.post(endpoint, body);
  return data;
};
 
export default api;