import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/useAuth';

function ProfilePage() {
  const { name, email, token, isAuthenticated } = useAuth();

  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchTodos() {
      try {
        setIsLoading(true);
        setError('');

        const response = await fetch('/api/tasks', {
          headers: {
            'X-CSRF-TOKEN': token,
          },
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to load todo statistics.');
        }

        const data = await response.json();

        const todoData = Array.isArray(data)
          ? data
          : data.tasks || [];

        setTodos(todoData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    if (isAuthenticated) {
      fetchTodos();
    }
  }, [isAuthenticated, token]);

  const totalTodos = todos.length;
  const completedTodos = todos.filter(
    (todo) => todo.isCompleted
  ).length;
  const activeTodos = totalTodos - completedTodos;

  const completionPercentage =
    totalTodos > 0
      ? Math.round((completedTodos / totalTodos) * 100)
      : 0;

  if (isLoading) {
    return (
      <main>
        <h2>Profile</h2>
        <p>Loading profile...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <h2>Profile</h2>
        <p>{error}</p>
      </main>
    );
  }

  return (
    <main>
      <h2>Profile</h2>

      <section>
        <h3>Account Information</h3>
        <p>Name: {name}</p>
        <p>Email: {email}</p>
        <p>Status: {isAuthenticated ? 'Logged in' : 'Logged out'}</p>
      </section>

      <section>
        <h3>Todo Statistics</h3>
        <p>Total todos: {totalTodos}</p>
        <p>Completed todos: {completedTodos}</p>
        <p>Active todos: {activeTodos}</p>

        {totalTodos > 0 && (
          <p>Completion: {completionPercentage}%</p>
        )}
      </section>
    </main>
  );
}

export default ProfilePage;