import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { setAccessToken, setRefreshToken } from 'utils/jwt';

interface IAuthState {
  isAuthenticated: boolean;
  isInitialized: boolean;
  login: (access_token: string, refresh_token: string) => void;
  logout: () => void;
  initialize: () => void;
}

const useAuth = create<IAuthState>()(
  devtools(
    persist(
      set => ({
        isAuthenticated: false,
        isInitialized: false,
        user: null,
        login: (access_token: string, refresh_token: string) => {
          set({ isAuthenticated: true });
          setAccessToken(access_token);
          setRefreshToken(refresh_token);
        },
        logout: () => {
          set({ isAuthenticated: false });
          setAccessToken();
          setRefreshToken();
        },
        initialize: () => {
          set({ isInitialized: true });
        },
      }),
      { name: 'auth' }
    )
  )
);

export default useAuth;
