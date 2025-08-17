import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">Contact book</span>
        </Link>
        <div className="ml-auto d-flex gap-2">
          <Link to="/contacts">
            <button className="btn btn-secondary">Contact List</button>
          </Link>
        
        </div>
      </div>
    </nav>
  );
};