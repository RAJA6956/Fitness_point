import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../components/Input.jsx';
import Button from '../components/Button.jsx';
import { validateEmail, validatePassword, validateName } from '../utils/validation.js';
import { useAuth } from '../context/AuthContext.jsx';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();
    const validation = {};
    if (!validateName(name)) validation.name = 'Enter a valid name';
    if (!validateEmail(email)) validation.email = 'Enter a valid email address';
    if (!validatePassword(password)) validation.password = 'Password must be at least 6 characters';
    if (password !== confirmPassword) validation.confirmPassword = 'Passwords must match';
    setErrors(validation);
    if (Object.keys(validation).length) return;

    const users = JSON.parse(localStorage.getItem('fitness_users') || '[]');
    if (users.some((item) => item.email === email)) {
      setMessage('An account with this email already exists.');
      return;
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      age: 22,
      height: 170,
      weight: 70,
      fitnessLevel: 'Intermediate',
      fitnessGoal: 'Build muscle',
    };
    users.push(newUser);
    localStorage.setItem('fitness_users', JSON.stringify(users));
    login(newUser);
    navigate('/dashboard');
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Sign Up</h2>
        <p>Create your Fitness Management account and begin tracking your progress.</p>
        <form onSubmit={handleSubmit}>
          <Input label="Name" type="text" value={name} onChange={(e) => setName(e.target.value)} error={errors.name} />
          <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} />
          <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} error={errors.password} />
          <Input label="Confirm Password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} error={errors.confirmPassword} />
          {message && <p className="form-message">{message}</p>}
          <Button type="submit">Sign Up</Button>
        </form>
        <p className="auth-switch">
          Already registered? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}
