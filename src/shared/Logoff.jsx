import { useAuth } from '../contexts/useAuth';

function Logoff() {
  const { setEmail, setToken } = useAuth();

  function handleLogoff() {
    setEmail('');
    setToken('');
  }

  return (
    <button type="button" onClick={handleLogoff}>
      Log Off
    </button>
  );
}

export default Logoff;