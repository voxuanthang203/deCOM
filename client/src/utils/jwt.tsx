import jwtDecode, { JwtPayload } from 'jwt-decode';
import axios from './axios';

const isValidToken = (accessToken: string) => {
  if (!accessToken) {
    return false;
  }

  const decoded = jwtDecode<JwtPayload>(accessToken);
  const currentTime = Date.now() / 1000;

  return typeof decoded.exp === 'number' && decoded.exp > currentTime;
};

const setAccessToken = (accessToken?: string) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem('accessToken');
    delete axios.defaults.headers.common.Authorization;
  }
};

const setRefreshToken = (refreshToken?: string) => {
  if (refreshToken) {
    localStorage.setItem('refreshToken', refreshToken);
  } else {
    localStorage.removeItem('refreshToken');
  }
};

export { isValidToken, setAccessToken, setRefreshToken };
