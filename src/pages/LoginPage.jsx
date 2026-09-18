import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useAuth } from '../contexts/useAuth';

function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from =
    location.state?.from?.pathname || '/todos';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isLoggingOn, setIsLoggingOn] = useState(false);

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
      setIsLoggingOn(false);
      return;
    }

    setAuthError(result.error);
    setIsLoggingOn(false);
  };

  return (
    <main className="login-page">
      <section
        className="login-card"
        aria-labelledby="login-title"
      >
        <div className="login-intro">
          <span className="login-badge">
            Welcome back
          </span>

          <h1 id="login-title">
            Log in to your account
          </h1>

          <p>
            Sign in to manage your tasks and stay
            organized.
          </p>
        </div>

        {authError && (
          <div
            className="login-error"
            role="alert"
          >
            {authError}
          </div>
        )}

        <form
          className="login-form"
          onSubmit={handleSubmit}
        >
          <div className="login-field">
            <label htmlFor="email">
              Email address
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              autoComplete="email"
              required
            />
          </div>

          <div className="login-field">
            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              autoComplete="current-password"
              required
            />
          </div>

          <button
            className="login-button"
            type="submit"
            disabled={isLoggingOn}
          >
            {isLoggingOn
              ? 'Logging in...'
              : 'Log In'}
          </button>
        </form>
      </section>
    </main>
  );
}

export default LoginPage;