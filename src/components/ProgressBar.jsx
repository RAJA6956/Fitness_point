export default function ProgressBar({ value, label }) {
  return (
    <div className="progress-bar-group">
      <div className="progress-bar-label">
        <span>{label}</span>
        <strong>{value}%</strong>
      </div>
      <div className="progress-bar-track">
        <div className="progress-bar-fill" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
