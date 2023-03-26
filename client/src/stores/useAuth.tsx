import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { setAccessToken, setRefreshToken } from 'utils/jwt';

interface IAuthState {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: number | null;
  login: (email: string, password: string) => void;
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
        login: async (email, password) => {
          const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });

          const { user, access_token, refresh_token } = await response.json();
          set({ isAuthenticated: true, user });
          setAccessToken(access_token);
          setRefreshToken(refresh_token);
        },
        logout: () => {
          set({ isAuthenticated: false, user: null });
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
