export default function Button({ children, type = 'button', variant = 'primary', ...props }) {
  return (
    <button className={`button ${variant}`} type={type} {...props}>
      {children}
    </button>
  );
}
