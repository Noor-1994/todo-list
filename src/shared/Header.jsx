import Navigation from './Navigation';
import Logoff from '../features/Logoff';
import { useAuth } from '../contexts/useAuth';

function Header() {
  const { isAuthenticated } = useAuth();

  return (
    <header className="app-header">
      <div className="header-inner">
        <a className="app-logo" href="/">
          Todo List
        </a>

        <div className="header-actions">
          <Navigation />
          {isAuthenticated && <Logoff />}
        </div>
      </div>
    </header>
  );
}

export default Header;
