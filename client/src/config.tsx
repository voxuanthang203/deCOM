import { PATH_AUTH, PATH_DASHBOARD } from './routes/paths';

export const HOST_API: string =
  import.meta.env.VITE_REACT_APP_HOST_API || 'http://localhost:5173';
export const PATH_AFTER_LOGIN: string = PATH_DASHBOARD.root;
export const PATH_AFTER_404: string = PATH_AUTH.login;
