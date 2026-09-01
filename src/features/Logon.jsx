import { useState } from 'react';
import { useAuth } from '../contexts/useAuth';

function Logon() {
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isLoggingOn, setIsLoggingOn] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setAuthError('');
    setIsLoggingOn(true);

    const result = await login(email, password);

    if (!result.success) {
      setAuthError(result.error);
    }

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
          {isLoggingOn
            ? 'Logging in...'
            : 'Log On'}
        </button>
      </form>
    </main>
  );
}

export default Logon;