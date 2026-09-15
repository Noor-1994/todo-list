import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/useAuth';

function ProfilePage() {
  const { name, email, token, isAuthenticated } =
    useAuth();

  const [todoStats, setTodoStats] = useState({
    total: 0,
    completed: 0,
    active: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

        const todos = await response.json();

        const total = todos.tasks.length;

        const completed = todos.tasks.filter(
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
          (todoStats.completed /
            todoStats.total) *
            100
        )
      : 0;

  if (loading) {
    return (
      <main className="page-container simple-page">
        <section className="simple-page-card">
          <p className="eyebrow">Your account</p>

          <h1>Profile</h1>

          <p className="loading-message">
            Loading profile...
          </p>
        </section>
      </main>
    );
  }

  if (error) {
    return (
      <main className="page-container simple-page">
        <section className="simple-page-card">
          <p className="eyebrow">Your account</p>

          <h1>Profile</h1>

          <div
            className="error-message"
            role="alert"
          >
            <p>{error}</p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="page-container simple-page">
      <section className="simple-page-card">
        <p className="eyebrow">Your account</p>

        <h1>Profile</h1>

        <div className="profile-section">
          <h2>Account Information</h2>

          <div className="profile-info">
            <p>
              <strong>Name:</strong>{' '}
              {name || 'Not available'}
            </p>

            <p>
              <strong>Email:</strong>{' '}
              {email || 'Not available'}
            </p>

            <p>
              <strong>Status:</strong>{' '}
              {isAuthenticated
                ? 'Authenticated'
                : 'Not authenticated'}
            </p>
          </div>
        </div>

        <div className="profile-section">
          <h2>Todo Statistics</h2>

          <div className="profile-stats">
            <div className="profile-stat">
              <span>Total</span>
              <strong>{todoStats.total}</strong>
            </div>

            <div className="profile-stat">
              <span>Completed</span>
              <strong>
                {todoStats.completed}
              </strong>
            </div>

            <div className="profile-stat">
              <span>Active</span>
              <strong>{todoStats.active}</strong>
            </div>

            <div className="profile-stat">
              <span>Completion</span>
              <strong>
                {completionPercentage}%
              </strong>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ProfilePage;