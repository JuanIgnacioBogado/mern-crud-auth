import { clientAxios } from './axios';

export const registerRequest = user => clientAxios.post('/register', user);

export const loginRequest = user => clientAxios.post('/login', user);

export const logoutRequest = () => clientAxios.post('/logout');

export const refreshTokenRequest = () => clientAxios.get('/refresh-token');
