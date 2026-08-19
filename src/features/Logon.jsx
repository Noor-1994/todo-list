import { useState } from 'react';

function Logon({ onSetToken }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);
    setError('');

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

      if (response.status === 200 && data.name && data.csrfToken) {
        onSetToken(data.csrfToken);
      } else {
        setError(`Authentication failed: ${data?.message || 'Invalid credentials'}`);
      }
    } catch (error) {
      setError(`Error: ${error.name} | ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Log In</h1>

      {error && <p>{error}</p>}

      <label htmlFor="email">
        Email:
      </label>

      <input
        id="email"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
      />

      <label htmlFor="password">
        Password:
      </label>

      <input
        id="password"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        required
      />

      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Log In'}
      </button>
    </form>
  );
}

export default Logon;