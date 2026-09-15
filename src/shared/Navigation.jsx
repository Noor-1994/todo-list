import { NavLink } from 'react-router';

function Navigation() {
  return (
    <nav className="main-navigation" aria-label="Main navigation">
      <ul className="navigation-list">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
          >
            Home
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
          >
            About
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/todos"
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
          >
            Todos
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
          >
            Profile
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
