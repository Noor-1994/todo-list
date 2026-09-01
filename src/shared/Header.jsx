import { useAuth } from '../contexts/useAuth';
import Logoff from './Logoff';

function Header() {
  const { email, token } = useAuth();

  return (
    <header>
      <h1>Todo List</h1>

      {token && (
        <div>
          <p>Logged in as: {email}</p>
          <Logoff />
        </div>
      )}
    </header>
  );
}

export default Header;