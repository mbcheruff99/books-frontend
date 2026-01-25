import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import { SiBookalope } from "react-icons/si";

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  
  async function handleLogout() {
    try {
      await api.delete("/sessions");
    } catch (err) {
      console.error(err);
    }
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container d-flex align-items-baseline">
       <Link to="/" className="navbar-brand fs-2 lh-1">
          <span className="d-inline-flex align-items-center">
            <SiBookalope className="fs-2 text-white align-text-bottom" />
            <span>ookShelf</span>
          </span>
        </Link>


        <button className="navbar-toggler" type="button" onClick={() => setOpen(!open)}>
          <span className="navbar-toggler-icon" />
        </button>

        <div className={`collapse navbar-collapse ${open ? "show" : ""}`}>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/books">
                Browse Books
              </Link>
            </li>

            {user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/shelves">
                    My Shelves
                  </Link>
                </li>

                <li className="nav-item">
                  <span className="nav-link text-light">{user.email}</span>
                </li>

                <li className="nav-item">
                  <button
                    className="nav-link btn btn-link"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/signup">
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}