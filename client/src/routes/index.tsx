import AuthGuard from 'guards/AuthGuard';
import GuestGuard from 'guards/GuestGuard';
import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate, useLocation } from 'react-router-dom';
import LoadingScreen from 'routes/LoadingScreen';

const Loadable =
  (Component: React.ComponentType) =>
  (props: React.ComponentProps<typeof Component>) => {
    const { pathname } = useLocation();

    return (
      <Suspense
        fallback={
          <LoadingScreen isDashboard={pathname.includes('/dashboard')} />
        }
      >
        <Component {...props} />
      </Suspense>
    );
  };

// AUTHENTICATION
const Login = Loadable(lazy(() => import('pages/auth/Login')));
const Register = Loadable(lazy(() => import('pages/auth/Register')));
const ResetPassword = Loadable(lazy(() => import('pages/auth/ForgetPassword')));
const VerifyCode = Loadable(lazy(() => import('pages/auth/VerifyCode')));

// DASHBOARD
const Home = Loadable(lazy(() => import('pages/index')));
const Marketplace = Loadable(lazy(() => import('pages/Marketplace')));
const Manufacturer = Loadable(lazy(() => import('pages/Manufacturer')));

// MAIN
const NotFound = Loadable(lazy(() => import('pages/Page404')));

const router = createBrowserRouter([
  // Home
  { path: '/', element: <Home /> },

  // AUTHENTICATION
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        element: (
          <GuestGuard>
            <Login />
          </GuestGuard>
        ),
      },
      {
        path: 'register',
        element: (
          <GuestGuard>
            <Register />
          </GuestGuard>
        ),
      },
      { path: 'reset-password', element: <ResetPassword /> },
      { path: 'verify', element: <VerifyCode /> },
    ],
  },

  {
    path: '/marketplace',
    element: <Marketplace />
  },
  {
    path: '/manufacturer',
    element: <Manufacturer />
  },

  // MAIN
  { path: '/404', element: <NotFound /> },
  { path: '*', element: <Navigate to="/404" replace /> },
]);

export default router;
