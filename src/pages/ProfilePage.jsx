import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/useAuth';

function ProfilePage() {
  const { name, email, token, isAuthenticated } = useAuth();

  const [todoStats, setTodoStats] = useState({
    total: 0,
    completed: 0,
    active: 0,
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTodoStats() {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError('');

        const response = await fetch('/api/tasks', {
          method: 'GET',
          headers: {
            'X-CSRF-TOKEN': token,
          },
          credentials: 'include',
        });

        if (response.status === 401) {
          throw new Error('Unauthorized');
        }

        if (!response.ok) {
          throw new Error('Failed to fetch todos');
        }

        const data = await response.json();
        const todos = data.tasks;

        const total = todos.length;

        const completed = todos.filter(
          (todo) => todo.isCompleted
        ).length;

        const active = total - completed;

        setTodoStats({
          total,
          completed,
          active,
        });
      } catch (err) {
        setError(
          `Error loading statistics: ${err.message}`
        );
      } finally {
        setLoading(false);
      }
    }

    fetchTodoStats();
  }, [token]);

  const completionPercentage =
    todoStats.total > 0
      ? Math.round(
          (todoStats.completed / todoStats.total) * 100
        )
      : 0;

  if (loading) {
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

        <p>
          Name: {name || 'Not available'}
        </p>

        <p>
          Email: {email || 'Not available'}
        </p>

        <p>
          Status:{' '}
          {isAuthenticated
            ? 'Authenticated'
            : 'Not authenticated'}
        </p>
      </section>

      <section>
        <h3>Todo Statistics</h3>

        <p>
          Total: {todoStats.total}
        </p>

        <p>
          Active: {todoStats.active}
        </p>

        <p>
          Completed: {todoStats.completed}
        </p>

        <p>
          Completion: {completionPercentage}%
        </p>
      </section>
    </main>
  );
}

export default ProfilePage;