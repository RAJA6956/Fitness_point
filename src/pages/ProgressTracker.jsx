import { useEffect, useMemo, useState } from 'react';
import Button from '../components/Button.jsx';
import Input from '../components/Input.jsx';
import Card from '../components/Card.jsx';
import { getProgressData, saveProgressData } from '../utils/localStorage.js';

export default function ProgressTracker() {
  const [entries, setEntries] = useState(getProgressData());
  const [form, setForm] = useState({ date: '', weight: '', chest: '', waist: '', hips: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    saveProgressData(entries);
  }, [entries]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const validation = {};
    if (!form.date) validation.date = 'Date is required';
    if (!form.weight) validation.weight = 'Weight is required';
    setErrors(validation);
    if (Object.keys(validation).length) return;

    setEntries((prev) => [...prev, { id: Date.now(), ...form }]);
    setForm({ date: '', weight: '', chest: '', waist: '', hips: '' });
  };

  const chartData = useMemo(() => entries.slice(-7).map((entry) => ({ label: entry.date, value: Number(entry.weight) })), [entries]);

  return (
    <div className="progress-page">
      <div className="tracker-header">
        <div>
          <span className="eyebrow">Progress Tracking</span>
          <h1>Measure your gains with weight and measurement history.</h1>
          <p>Build weekly and monthly momentum through consistent tracking.</p>
        </div>
      </div>

      <Card title="Add Progress Entry" className="tracker-form-card">
        <form className="form-grid" onSubmit={handleSubmit}>
          <Input label="Date" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} error={errors.date} />
          <Input label="Weight (kg)" type="number" value={form.weight} onChange={(e) => setForm({ ...form, weight: e.target.value })} error={errors.weight} />
          <Input label="Chest (cm)" type="number" value={form.chest} onChange={(e) => setForm({ ...form, chest: e.target.value })} />
          <Input label="Waist (cm)" type="number" value={form.waist} onChange={(e) => setForm({ ...form, waist: e.target.value })} />
          <Input label="Hips (cm)" type="number" value={form.hips} onChange={(e) => setForm({ ...form, hips: e.target.value })} />
          <Button type="submit">Add Entry</Button>
        </form>
      </Card>

      <Card title="Weight Progress" className="progress-chart-card">
        <div className="line-chart">
          {chartData.length ? chartData.map((point) => (
            <div key={point.label} className="line-point" style={{ height: `${point.value * 1.5}px` }}>
              <span>{point.label}</span>
              <strong>{point.value} kg</strong>
            </div>
          )) : <p>No progress data available yet.</p>}
        </div>
      </Card>

      <div className="entry-list">
        {entries.length ? entries.map((entry) => (
          <Card key={entry.id} className="entry-card">
            <div className="entry-row">
              <div>
                <h4>{entry.date}</h4>
                <p>Weight: {entry.weight} kg</p>
              </div>
              <div className="entry-measurements">
                <span>Chest {entry.chest || '--'} cm</span>
                <span>Waist {entry.waist || '--'} cm</span>
                <span>Hips {entry.hips || '--'} cm</span>
              </div>
            </div>
          </Card>
        )) : <Card>No progress entries yet. Log your first measurement.</Card>}
      </div>
    </div>
  );
}
