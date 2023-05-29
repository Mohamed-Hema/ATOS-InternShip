import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ isAuthenticated }) => {
  const renderAuthButtons = () => {
    if (isAuthenticated) {
      return (
        <>
          <Link to="/create-admin" className="btn btn-primary me-2">
            Create Admin
          </Link>
          <button className="btn btn-outline-light" onClick={handleLogout}>
            Logout
          </button>
        </>
      );
    } else {
      return (
        <>
          <Link to="/login" className="btn btn-outline-light me-2">
            Login
          </Link>
          <Link to="/signup" className="btn btn-outline-light">
            Signup
          </Link>
        </>
      );
    }
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    // Navigate to the login page
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark container-fluid">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Quiz Bank
        </Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">{renderAuthButtons()}</li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

export default Navbar;
