import axios from 'axios';
import KeycloakContext from 'contexts/KeycContext';
import { useContext } from 'react';

const useAxios = () => {
  const keycloak = useContext(KeycloakContext);
  const access_token = keycloak.token;

  const updateToken = async () => {
    try {
      await keycloak.updateToken(300);
    } catch (error) {
      keycloak.login();
    }
  };

  const axiosInstance = axios.create({
    baseURL: 'https://api.accalberta.ca/api/v1/'
  });

  axiosInstance.interceptors.request.use(async (config) => {
    if (!access_token) {
      await updateToken();
    }
    config.headers.Authorization = `Bearer ${access_token}`;
    return config;
  });

  return axiosInstance;
};

export default useAxios;
