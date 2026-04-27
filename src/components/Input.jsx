export default function Input({ label, error, ...props }) {
  return (
    <label className="input-group">
      <span>{label}</span>
      <input {...props} />
      {error && <span className="input-error">{error}</span>}
    </label>
  );
}
