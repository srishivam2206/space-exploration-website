// Red box that shows what went wrong.
export default function ErrorMessage({ message }) {
  return (
    <div className="error-box" role="alert">
      <strong>Oops!</strong> {message}
    </div>
  );
}
