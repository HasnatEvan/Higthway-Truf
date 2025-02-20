import { useState } from "react";
import { NavLink } from "react-router-dom";
import useAuth from "../Hook/useAuth";
import useRole from "../Hook/useRole";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [role] = useRole();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logOut();
  };

  return (
    <div className="relative">
      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full w-64 bg-base-100 shadow-lg p-5 transform ${isOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out`}
      >
        <button
          className="btn btn-sm btn-circle absolute top-3 right-3"
          onClick={() => setIsOpen(false)}
        >
          ✕
        </button>
        <ul className="menu space-y-3 mt-10">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/all-slots">All Slots</NavLink>
          </li>

          {/* Admin Links */}
          {role === 'admin' && (
            <>
              <li>
                <NavLink to="/add-slot">Add Slot</NavLink>
              </li>
              <li>
                <NavLink to="/my-slot-list">My Slot List</NavLink>
              </li>
              <li>
                <NavLink to="/manage-slot">Manage Slot</NavLink>
              </li>
            </>
          )}

          {/* Customer Links */}
          {role === 'customer' && (
            <li>
              <NavLink to="/my-slot">My Slot</NavLink>
            </li>
          )}

          {/* Common Links */}
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
        </ul>
      </div>

      {/* Navbar */}
      <div className="navbar bg-base-100 shadow-md">
        <div className="navbar-start">
          <button
            className="btn btn-ghost btn-circle"
            onClick={() => setIsOpen(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </button>
        </div>
        <div className="navbar-center">
          <a className="btn btn-ghost text-xl">daisyUI</a>
        </div>
        <div className="navbar-end">
          {user ? (
            <button onClick={handleLogout} className="btn">
              Logout
            </button>
          ) : (
            <NavLink to="/login" className="btn">
              Login
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
