import { Link } from 'react-router';
import { useAuth } from '../contexts/useAuth';

function NotFoundPage() {
  const { isAuthenticated } = useAuth();

  return (
    <main className="page-container not-found-page">
      <section className="not-found-card">
        <p className="eyebrow">Error 404</p>

        <h1>Page Not Found</h1>

        <p className="not-found-description">
          Sorry, the page you are looking for does not exist.
        </p>

        <p className="not-found-question">
          Where would you like to go?
        </p>

        <nav
          className="not-found-navigation"
          aria-label="404 navigation"
        >
          <Link className="secondary-button" to="/">
            Home
          </Link>

          <Link className="secondary-button" to="/about">
            About
          </Link>

          {isAuthenticated && (
            <>
              <Link
                className="secondary-button"
                to="/todos"
              >
                Todos
              </Link>

              <Link
                className="secondary-button"
                to="/profile"
              >
                Profile
              </Link>
            </>
          )}

          {!isAuthenticated && (
            <Link
              className="primary-button not-found-login"
              to="/login"
            >
              Log In
            </Link>
          )}
        </nav>
      </section>
    </main>
  );
}

export default NotFoundPage;