import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Alert } from 'react-native';

import { BASE_URL } from '../utils/constants';

const api = axios.create({ baseURL: BASE_URL });

api.interceptors.request.use(async (config) => {
    if (!config.url.endsWith('sessions') || !config.url.endsWith('users')
      || !config.url.endsWith('recovery')) {
      try {
        const token = await AsyncStorage.getItem('token');

        config.headers.Authorization = `Bearer ${token}`;
      } catch (error) {
        console.log('error saving data');

        return Alert.alert(
          'Error',
          'Error trying to authenticate',
          [{
            text: 'Okay',
            onPress: async () => await AsyncStorage.removeItem('token'),
            style: 'cancel'
          }],
          { cancelable: false }
        );
      }
    }

    return config;
});

api.interceptors.response.use((response) => response, (error) => {
  if(!error.response)
    return Promise.reject(error);

  const { config, status } = error.response;

  if (!config.url.endsWith('sessions') && !config.url.endsWith('users')
    && !config.url.endsWith('recovery') && status === 401) {
      return Alert.alert(
        'Session Expired',
        'Your session has expired! Please sign in again to continue using the system',
        [{
          text: 'Okay',
          onPress: async () => await AsyncStorage.removeItem('token'),
          style: 'cancel'
        }],
        { cancelable: false }
      );
  }

  return Promise.reject(error);
});

export default api;