import Card from './Card.jsx';
import ProgressBar from './ProgressBar.jsx';

export default function GoalCard({ goal, onEdit, onDelete }) {
  return (
    <Card className="goal-card">
      <div className="goal-card-header">
        <h4>{goal.title}</h4>
        <span className="badge">{goal.deadline}</span>
      </div>
      <p>Target: {goal.targetValue}</p>
      <ProgressBar value={goal.progress} label="Completion" />
      <div className="card-actions">
        <button className="ghost-button" onClick={() => onEdit(goal)}>Edit</button>
        <button className="danger-button" onClick={() => onDelete(goal.id)}>Delete</button>
      </div>
    </Card>
  );
}
