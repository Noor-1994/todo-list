import { useState } from 'react';
import { AuthContext } from './AuthContext';

const savedAuth = sessionStorage.getItem('todo-auth');

const initialAuth = savedAuth
  ? JSON.parse(savedAuth)
  : {
      name: '',
      email: '',
      token: '',
    };

export function AuthProvider({ children }) {
  const [name, setName] = useState(initialAuth.name);
  const [email, setEmail] = useState(initialAuth.email);
  const [token, setToken] = useState(initialAuth.token);

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
        setName(data.name);
        setEmail(email);
        setToken(data.csrfToken);

        sessionStorage.setItem(
          'todo-auth',
          JSON.stringify({
            name: data.name,
            email,
            token: data.csrfToken,
          })
        );

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
    } catch {
      return {
        success: false,
        error: 'Unable to sign in. Please try again.',
      };
    }
  }

  async function logout() {
    try {
      const response = await fetch('/api/user/logoff', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'X-CSRF-TOKEN': token,
        },
      });

      const data = await response.json();

      setName('');
      setEmail('');
      setToken('');
      sessionStorage.removeItem('todo-auth');

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
    } catch {
      setName('');
      setEmail('');
      setToken('');
      sessionStorage.removeItem('todo-auth');

      return {
        success: false,
        error: 'Unable to log out. Please try again.',
      };
    }
  }

  const value = {
    name,
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