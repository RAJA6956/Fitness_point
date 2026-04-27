import Card from './Card.jsx';

export default function ChartCard({ title, items }) {
  const max = Math.max(...items.map((item) => item.value), 1);

  return (
    <Card title={title} className="chart-card">
      <div className="chart-grid">
        {items.map((item) => (
          <div key={item.label} className="chart-item">
            <span>{item.label}</span>
            <div className="chart-bar-container">
              <div className="chart-bar" style={{ width: `${(item.value / max) * 100}%` }} />
            </div>
            <strong>{item.value}</strong>
          </div>
        ))}
      </div>
    </Card>
  );
}
