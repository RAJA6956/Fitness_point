import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../components/Input.jsx';
import Button from '../components/Button.jsx';
import { validateEmail, validatePassword } from '../utils/validation.js';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();
    const validation = {};
    if (!validateEmail(email)) validation.email = 'Enter a valid email address';
    if (!validatePassword(password)) validation.password = 'Password must be at least 6 characters';
    setErrors(validation);
    if (Object.keys(validation).length) return;

    const users = JSON.parse(localStorage.getItem('fitness_users') || '[]');
    const foundUser = users.find((item) => item.email === email && item.password === password);
    if (foundUser) {
      login(foundUser);
      navigate('/dashboard');
    } else {
      setMessage('No matching user found. Please sign up or check credentials.');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Login</h2>
        <p>Access your fitness dashboard with secure frontend validation.</p>
        <form onSubmit={handleSubmit}>
          <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} />
          <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} error={errors.password} />
          {message && <p className="form-message">{message}</p>}
          <Button type="submit">Login</Button>
        </form>
        <p className="auth-switch">
          New user? <Link to="/signup">Create an account</Link>
        </p>
      </div>
    </div>
  );
}
