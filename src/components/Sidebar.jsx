import { NavLink } from 'react-router-dom';

const navItems = [
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Workouts', path: '/workouts' },
  { label: 'Nutrition', path: '/nutrition' },
  { label: 'Progress', path: '/progress' },
  { label: 'Goals', path: '/goals' },
  { label: 'BMI', path: '/bmi' },
  { label: 'Profile', path: '/profile' },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-heading">Quick Access</div>
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink key={item.path} to={item.path} className={({ isActive }) => (isActive ? 'active' : '')}>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
