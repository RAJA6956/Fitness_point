import { useEffect, useState } from 'react';
import Button from '../components/Button.jsx';
import Input from '../components/Input.jsx';
import GoalCard from '../components/GoalCard.jsx';
import Modal from '../components/Modal.jsx';
import { getGoalsData, saveGoalsData } from '../utils/localStorage.js';

export default function Goals() {
  const [goals, setGoals] = useState(getGoalsData());
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: '', targetValue: '', deadline: '', progress: 0 });
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    saveGoalsData(goals);
  }, [goals]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.title || !form.targetValue || !form.deadline) return;

    if (editing) {
      setGoals((prev) => prev.map((item) => item.id === editing.id ? { ...item, ...form } : item));
      setEditing(null);
    } else {
      setGoals((prev) => [...prev, { ...form, id: Date.now() }]);
    }
    setShowModal(false);
    setForm({ title: '', targetValue: '', deadline: '', progress: 0 });
  };

  const handleEdit = (goal) => {
    setEditing(goal);
    setForm(goal);
    setShowModal(true);
  };

  const handleDelete = (id) => setGoals((prev) => prev.filter((goal) => goal.id !== id));

  return (
    <div className="goals-page">
      <div className="tracker-header">
        <div>
          <span className="eyebrow">Goal Management</span>
          <h1>Stay focused with clear fitness targets and deadlines.</h1>
          <p>Create, update, and track your goals with completion metrics.</p>
        </div>
        <Button onClick={() => setShowModal(true)}>Add Goal</Button>
      </div>

      <div className="goal-grid">
        {goals.length ? goals.map((goal) => (
          <GoalCard key={goal.id} goal={goal} onEdit={handleEdit} onDelete={handleDelete} />
        )) : <div className="empty-state">No goals defined yet. Add a fitness goal to start.</div>}
      </div>

      <Modal open={showModal} title={editing ? 'Edit Goal' : 'Add Goal'} onClose={() => { setShowModal(false); setEditing(null); }}>
        <form className="form-grid" onSubmit={handleSubmit}>
          <Input label="Goal Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <Input label="Target Value" type="text" value={form.targetValue} onChange={(e) => setForm({ ...form, targetValue: e.target.value })} />
          <Input label="Deadline" type="date" value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })} />
          <Input label="Progress (%)" type="number" value={form.progress} onChange={(e) => setForm({ ...form, progress: Number(e.target.value) })} />
          <Button type="submit">Save Goal</Button>
        </form>
      </Modal>
    </div>
  );
}
