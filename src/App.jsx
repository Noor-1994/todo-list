import { useEffect, useState } from 'react';
import TodosPage from './features/Todos/TodosPage';

function App() {
  const [token, setToken] = useState('');

  useEffect(() => {
    async function fetchToken() {
      try {
        const response = await fetch('/api/auth/csrf-token', {
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch CSRF token');
        }

        const data = await response.json();

        setToken(data.token);
      } catch (error) {
        console.error(error);
      }
    }

    fetchToken();
  }, []);

  return <TodosPage token={token} />;
}

export default App;