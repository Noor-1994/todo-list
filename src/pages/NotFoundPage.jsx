import { Link } from 'react-router';
import { useAuth } from '../contexts/useAuth';

function NotFoundPage() {
  const { isAuthenticated } = useAuth();

  return (
    <main>
      <h2>404 - Page Not Found</h2>

      <p>
        Sorry, the page you are looking for does not exist.
      </p>

      <p>Where would you like to go?</p>

      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/about">About</Link>
        </li>

        {isAuthenticated && (
          <>
            <li>
              <Link to="/todos">Todos</Link>
            </li>

            <li>
              <Link to="/profile">Profile</Link>
            </li>
          </>
        )}

        {!isAuthenticated && (
          <li>
            <Link to="/login">Log In</Link>
          </li>
        )}
      </ul>
    </main>
  );
}

export default NotFoundPage;