import { useAuth } from '../contexts/useAuth';
import Logoff from './Logoff';

function Header() {
  const { email, isAuthenticated } = useAuth();

  return (
    <header>
      <h1>Todo List</h1>

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