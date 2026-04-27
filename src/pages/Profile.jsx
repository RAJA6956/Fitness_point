import { useState } from 'react';
import Button from '../components/Button.jsx';
import Input from '../components/Input.jsx';
import Card from '../components/Card.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const [profile, setProfile] = useState({
    name: user?.name || '',
    age: user?.age || '',
    height: user?.height || '',
    weight: user?.weight || '',
    fitnessLevel: user?.fitnessLevel || '',
    fitnessGoal: user?.fitnessGoal || '',
  });
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    updateProfile(profile);
    setMessage('Profile updated successfully.');
  };

  return (
    <div className="profile-page">
      <div className="tracker-header">
        <div>
          <span className="eyebrow">Profile</span>
          <h1>Manage your personal fitness profile.</h1>
          <p>Keep your weight, goals, and fitness level up to date.</p>
        </div>
      </div>

      <Card className="profile-card" title="Update Profile">
        <form className="form-grid" onSubmit={handleSubmit}>
          <Input label="Name" type="text" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
          <Input label="Age" type="number" value={profile.age} onChange={(e) => setProfile({ ...profile, age: e.target.value })} />
          <Input label="Height (cm)" type="number" value={profile.height} onChange={(e) => setProfile({ ...profile, height: e.target.value })} />
          <Input label="Weight (kg)" type="number" value={profile.weight} onChange={(e) => setProfile({ ...profile, weight: e.target.value })} />
          <Input label="Fitness Level" type="text" value={profile.fitnessLevel} onChange={(e) => setProfile({ ...profile, fitnessLevel: e.target.value })} />
          <Input label="Fitness Goal" type="text" value={profile.fitnessGoal} onChange={(e) => setProfile({ ...profile, fitnessGoal: e.target.value })} />
          <Button type="submit">Save Profile</Button>
          {message && <p className="form-message success">{message}</p>}
        </form>
      </Card>
    </div>
  );
}
