import { useState } from 'react';
import { AuthContext } from './AuthContext';

export function AuthProvider({ children }) {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');

  function login(name, csrfToken) {
    setEmail(name);
    setToken(csrfToken);
  }

  function logout() {
    setEmail('');
    setToken('');
  }

  const value = {
    email,
    token,
    isAuthenticated: Boolean(token),
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}