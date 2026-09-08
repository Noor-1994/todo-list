import { Link } from 'react-router';

function NotFoundPage() {
  return (
    <main>
      <h2>404 - Page Not Found</h2>

      <p>
        Sorry, the page you are looking for does not exist.
      </p>

      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Link to="/about">About</Link>
          </li>

          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>
    </main>
  );
}

export default NotFoundPage;