import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useAuth } from '../contexts/useAuth';

function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isLoggingOn, setIsLoggingOn] = useState(false);

  const from =
    location.state?.from?.pathname || '/todos';

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setAuthError('');
    setIsLoggingOn(true);

    const result = await login(email, password);

    if (result.success) {
      navigate(from, { replace: true });
      return;
    }

    setAuthError(result.error);
    setIsLoggingOn(false);
  };

  return (
    <main>
      <h2>Log In</h2>

      {authError && <p>{authError}</p>}

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">
          Email:
        </label>

        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) =>
            setEmail(event.target.value)
          }
          required
        />

        <label htmlFor="password">
          Password:
        </label>

        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) =>
            setPassword(event.target.value)
          }
          required
        />

        <button
          type="submit"
          disabled={isLoggingOn}
        >
          {isLoggingOn ? 'Logging in...' : 'Log On'}
        </button>
      </form>
    </main>
  );
}

export default LoginPage;