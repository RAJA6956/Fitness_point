import Card from '../components/Card.jsx';
import ChartCard from '../components/ChartCard.jsx';
import ProgressBar from '../components/ProgressBar.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useMemo } from 'react';

const weeklyActivity = [
  { label: 'Mon', value: 60 },
  { label: 'Tue', value: 75 },
  { label: 'Wed', value: 50 },
  { label: 'Thu', value: 90 },
  { label: 'Fri', value: 70 },
  { label: 'Sat', value: 100 },
  { label: 'Sun', value: 40 },
];

const goals = [
  { title: 'Run 5K', progress: 80 },
  { title: 'Lose 3kg', progress: 45 },
  { title: 'Daily Yoga', progress: 60 },
];

export default function Dashboard() {
  const { user } = useAuth();
  const totalWorkouts = weeklyActivity.reduce((sum, item) => sum + (item.value > 0 ? 1 : 0), 0);
  const caloriesBurned = weeklyActivity.reduce((sum, item) => sum + item.value * 5, 0);
  const bmiValue = useMemo(() => {
    const heightInMeters = user?.height / 100 || 1;
    return ((user?.weight || 70) / (heightInMeters * heightInMeters)).toFixed(1);
  }, [user]);

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <span className="eyebrow">Dashboard</span>
          <h1>Welcome back, {user?.name || 'Athlete'}</h1>
          <p>Track your workouts, calories, goals, and progress in one professional space.</p>
        </div>
      </div>

      <div className="summary-grid">
        <Card title="Total Workouts">
          <div className="metric-value">{totalWorkouts}</div>
          <p>Sessions completed this week</p>
        </Card>
        <Card title="Calories Burned">
          <div className="metric-value">{caloriesBurned} kcal</div>
          <p>Active energy output</p>
        </Card>
        <Card title="Current Weight">
          <div className="metric-value">{user?.weight} kg</div>
          <p>Latest body weight entry</p>
        </Card>
        <Card title="BMI">
          <div className="metric-value">{bmiValue}</div>
          <p>{bmiValue < 18.5 ? 'Underweight' : bmiValue < 25 ? 'Normal' : bmiValue < 30 ? 'Overweight' : 'Obese'}</p>
        </Card>
      </div>

      <div className="dashboard-grid">
        <ChartCard title="Weekly Activity" items={weeklyActivity} />
        <Card title="Goal Progress" className="goal-progress-card">
          {goals.map((goal) => (
            <ProgressBar key={goal.title} value={goal.progress} label={goal.title} />
          ))}
        </Card>
      </div>
    </div>
  );
}
