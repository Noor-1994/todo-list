import { useState } from 'react';
import { AuthContext } from './AuthContext';

export function AuthProvider({ children }) {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');

  const isAuthenticated = Boolean(token);

  async function login(email, password) {
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

        return {
          success: true,
          data,
        };
      }

      return {
        success: false,
        error:
          data?.message || 'Authentication failed',
      };
    } catch (error) {
      return {
        success: false,
        error: `Error: ${error.name} | ${error.message}`,
      };
    }
  }

  async function logout() {
    try {
      const response = await fetch('/api/users/logout', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'X-CSRF-Token': token,
        },
      });

      const data = await response.json();

      setEmail('');
      setToken('');

      if (!response.ok) {
        return {
          success: false,
          error: data?.message || 'Logout failed',
        };
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      setEmail('');
      setToken('');

      return {
        success: false,
        error: `Error: ${error.name} | ${error.message}`,
      };
    }
  }

  const value = {
    email,
    token,
    isAuthenticated,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}