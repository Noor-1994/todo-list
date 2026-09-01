import { useState } from 'react';
import { useAuth } from '../contexts/useAuth';

function Logon() {
  const { setEmail, setToken } = useAuth();

  const [email, setLocalEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isLoggingOn, setIsLoggingOn] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setAuthError('');
    setIsLoggingOn(true);

    try {
      const response = await fetch('/api/users/logon', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (
        response.status === 200 &&
        data.name &&
        data.csrfToken
      ) {
        setEmail(data.name);
        setToken(data.csrfToken);
      } else {
        setAuthError(
          `Authentication failed: ${
            data?.message || 'Unknown error'
          }`
        );
      }
    } catch (error) {
      setAuthError(
        `Error: ${error.name} | ${error.message}`
      );
    } finally {
      setIsLoggingOn(false);
    }
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
            setLocalEmail(event.target.value)
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