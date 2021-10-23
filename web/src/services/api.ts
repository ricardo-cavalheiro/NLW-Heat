import axios from 'axios';

export const api = axios.create({
  baseURL: `http://${import.meta.env.VITE_LOCAL_IP}:4000`,
});
