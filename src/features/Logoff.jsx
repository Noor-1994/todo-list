import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/useAuth';

function Logoff() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [logoutError, setLogoutError] = useState('');
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLogoutError('');
    setIsLoggingOut(true);

    const result = await logout();

    if (result.success) {
      navigate('/login');
    } else {
      setLogoutError(result.error);
      setIsLoggingOut(false);
    }
  };

  return (
    <div>
      {logoutError && <p>{logoutError}</p>}

      <button
        type="button"
        onClick={handleLogout}
        disabled={isLoggingOut}
      >
        {isLoggingOut ? 'Logging out...' : 'Log Off'}
      </button>
    </div>
  );
}

export default Logoff;