import { useNavigate } from 'react-router-dom';
import { PATH_DASHBOARD } from 'routes/paths';
import useAuth from 'stores/useAuth';

export default function GuestGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated) {
    navigate(PATH_DASHBOARD.root);
  }

  return <>{children}</>;
}
