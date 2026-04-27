import { useEffect, useState } from 'react';
import Button from '../components/Button.jsx';
import Card from '../components/Card.jsx';
import Input from '../components/Input.jsx';
import WorkoutCard from '../components/WorkoutCard.jsx';
import Modal from '../components/Modal.jsx';
import { getWorkoutData, saveWorkoutData } from '../utils/localStorage.js';

const categories = ['Cardio', 'Strength', 'Yoga', 'HIIT'];

export default function WorkoutTracker() {
  const [workouts, setWorkouts] = useState(getWorkoutData());
  const [form, setForm] = useState({ name: '', category: 'Cardio', duration: '', calories: '' });
  const [errors, setErrors] = useState({});
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    saveWorkoutData(workouts);
  }, [workouts]);

  const resetForm = () => setForm({ name: '', category: 'Cardio', duration: '', calories: '' });

  const handleSubmit = (event) => {
    event.preventDefault();
    const validation = {};
    if (!form.name.trim()) validation.name = 'Workout name is required';
    if (!form.duration) validation.duration = 'Duration is required';
    if (!form.calories) validation.calories = 'Calories burned is required';
    setErrors(validation);
    if (Object.keys(validation).length) return;

    if (editing) {
      setWorkouts((prev) => prev.map((item) => (
        item.id === editing.id ? { ...item, ...form } : item
      )));
      setEditing(null);
    } else {
      setWorkouts((prev) => [
        ...prev,
        { id: Date.now(), ...form, completed: false },
      ]);
    }

    resetForm();
  };

  const handleToggle = (id) => {
    setWorkouts((prev) => prev.map((item) => item.id === id ? { ...item, completed: !item.completed } : item));
  };

  const handleEdit = (workout) => {
    setForm({ name: workout.name, category: workout.category, duration: workout.duration, calories: workout.calories });
    setEditing(workout);
  };

  const handleDelete = (id) => {
    setWorkouts((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="tracker-page">
      <div className="tracker-header">
        <div>
          <span className="eyebrow">Workout Tracker</span>
          <h1>Manage your training routines with clear stats.</h1>
          <p>Add workouts, update session details, and mark completion instantly.</p>
        </div>
      </div>

      <Card className="tracker-form-card" title={editing ? 'Edit Workout' : 'Add Workout'}>
        <form className="form-grid" onSubmit={handleSubmit}>
          <Input label="Workout Name" type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} error={errors.name} />
          <label className="input-group">
            <span>Category</span>
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
              {categories.map((category) => <option key={category} value={category}>{category}</option>)}
            </select>
          </label>
          <Input label="Duration (min)" type="number" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} error={errors.duration} />
          <Input label="Calories Burned" type="number" value={form.calories} onChange={(e) => setForm({ ...form, calories: e.target.value })} error={errors.calories} />
          <Button type="submit">{editing ? 'Update Workout' : 'Add Workout'}</Button>
        </form>
      </Card>

      <div className="tracker-list">
        {workouts.length ? workouts.map((workout) => (
          <WorkoutCard key={workout.id} workout={workout} onToggle={handleToggle} onEdit={handleEdit} onDelete={handleDelete} />
        )) : (
          <Card>No workouts added yet. Add a workout to begin tracking.</Card>
        )}
      </div>
    </div>
  );
}
