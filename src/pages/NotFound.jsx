import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="text-center py-5">
      <h1 className="display-5">404 – Page not found</h1>
      <p className="text-body-secondary">The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn btn-primary">Go to products</Link>
    </div>
  );
}
