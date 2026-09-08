import { useAuth } from '../contexts/useAuth';
import Logoff from './Logoff';
import Navigation from './Navigation';

function Header() {
  const { email, isAuthenticated } = useAuth();

  return (
    <header>
      <h1>Todo List</h1>

      <Navigation />

      {isAuthenticated && (
        <div>
          <p>Logged in as: {email}</p>
          <Logoff />
        </div>
      )}
    </header>
  );
}

export default Header;