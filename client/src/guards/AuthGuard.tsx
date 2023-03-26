import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from 'stores/useAuth';
import Login from 'pages/auth/Login';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [requestedLocation, setRequestedLocation] = useState<string | null>(
    null
  );

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return <Login />;
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    navigate(requestedLocation, { replace: true });
  }

  return <>{children}</>;
}
