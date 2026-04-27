import Card from './Card.jsx';

export default function WorkoutCard({ workout, onToggle, onEdit, onDelete }) {
  return (
    <Card className={`workout-card ${workout.completed ? 'completed' : ''}`}>
      <div className="workout-card-header">
        <h4>{workout.name}</h4>
        <span className="badge">{workout.category}</span>
      </div>
      <p>Duration: {workout.duration} min</p>
      <p>Calories: {workout.calories} kcal</p>
      <div className="card-actions">
        <button className="ghost-button" onClick={() => onToggle(workout.id)}>
          {workout.completed ? 'Mark Incomplete' : 'Mark Complete'}
        </button>
        <button className="ghost-button" onClick={() => onEdit(workout)}>Edit</button>
        <button className="danger-button" onClick={() => onDelete(workout.id)}>Delete</button>
      </div>
    </Card>
  );
}
