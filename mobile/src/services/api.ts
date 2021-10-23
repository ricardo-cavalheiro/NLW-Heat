import axios from 'axios';
import Constants from 'expo-constants';

export const api = axios.create({
  baseURL: `http://${Constants.manifest?.extra!.LOCAL_IP}:4000`,
});
