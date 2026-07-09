import { Link } from "react-router-dom";
import { FaTriangleExclamation } from "react-icons/fa6";

const NotFound = () => {
  return (
    <div className="notfound-wrapper page-container">
      <div className="notfound-content" data-aos="zoom-in">
        <div className="error-code">404</div>
        <FaTriangleExclamation className="error-icon" />
        <h2>Oops! Page Not Found</h2>
        <p>
          It looks like you've taken a wrong turn. <br />
          Don't worry, let's get you back to class!
        </p>
        <Link to="/" className="browse-btn">
          Back to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
