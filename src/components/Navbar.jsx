import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Workouts', path: '/workouts' },
  { label: 'Nutrition', path: '/nutrition' },
  { label: 'Goals', path: '/goals' },
];

export default function Navbar() {
  const location = useLocation();
  const { user, logout } = useAuth();

  return (
    <header className="navbar">
      <div className="navbar-brand">FitManage</div>
      <nav className="navbar-links">
        {navLinks.map((link) => (
          <Link key={link.path} to={link.path} className={location.pathname === link.path ? 'active' : ''}>
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="navbar-actions">
        {user ? (
          <>
            <span className="navbar-user">Hi, {user.name}</span>
            <button className="ghost-button" onClick={logout}>Logout</button>
          </>
        ) : (
          <Link to="/login" className="primary-button">Login</Link>
        )}
      </div>
    </header>
  );
}
