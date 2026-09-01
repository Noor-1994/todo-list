import { useAuth } from '../contexts/useAuth';

function Logoff() {
  const { logout } = useAuth();

  return (
    <button type="button" onClick={logout}>
      Log Off
    </button>
  );
}

export default Logoff;