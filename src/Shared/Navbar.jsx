import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../Hook/useAuth";
import useRole from "../Hook/useRole";
import Swal from "sweetalert2"; // Import SweetAlert2
import sidebarLogo from '../../src/assets/logo/logo.jpg'; // Import logo image

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [role] = useRole();
  const [isOpen, setIsOpen] = useState(false);

  // Sidebar Toggle Function
  const toggleSidebar = () => setIsOpen(!isOpen);

  // Logout Confirmation
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, log me out!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        logOut();
        Swal.fire("Logged out!", "You have been logged out successfully.", "success");
      }
    });
  };

  return (
    <div className="relative">
      {/* Overlay when Sidebar is Open */}
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-opacity-50 z-90" onClick={toggleSidebar}></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-base-100 shadow-lg p-5 
        transform ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        transition-transform duration-300 ease-in-out z-100`}
      >
        {/* Sidebar Close Button */}
        <button className="btn btn-sm btn-circle absolute top-3 right-3" onClick={toggleSidebar}>
          ✕
        </button>

        {/* Sidebar Header with Logo and Text */}
        <div className="flex items-center mb-5">
          <img src={sidebarLogo} alt="Logo" className="w-10 h-10 mr-3 rounded-full" />
          <div className="text-lg font-semibold text-lime-500">
            𝑯𝒊𝒈𝒉𝒘𝒂𝒚-𝑻𝒖𝒓𝒇
          </div>
        </div>

        {/* Sidebar Menu */}
        <ul className="menu space-y-3 mt-10">
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? "text-lime-500 font-bold" : "")}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/all-slots" className={({ isActive }) => (isActive ? "text-lime-500 font-bold" : "")}>
              All Slots
            </NavLink>
          </li>

          {/* Admin Links */}
          {role === "admin" && (
            <>
              <li>
                <NavLink to="/add-slot" className={({ isActive }) => (isActive ? "text-lime-500 font-bold" : "")}>
                  Add Slots
                </NavLink>
              </li>
              <li>
                <NavLink to="/my-slot-list" className={({ isActive }) => (isActive ? "text-lime-500 font-bold" : "")}>
                  My Slots List
                </NavLink>
              </li>
              <li>
                <NavLink to="/manage-slot" className={({ isActive }) => (isActive ? "text-lime-500 font-bold" : "")}>
                  Manage Slots
                </NavLink>
              </li>
            </>
          )}

          {/* Customer Links */}
          {role === "customer" && (
            <li>
              <NavLink to="/my-slot" className={({ isActive }) => (isActive ? "text-lime-500 font-bold" : "")}>
                My Slots
              </NavLink>
            </li>
          )}

          {/* Common Links */}
          <li>
            <NavLink to="/about" className={({ isActive }) => (isActive ? "text-lime-500 font-bold" : "")}>
              About
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Navbar (Static) */}
      <div className="navbar bg-gradient-to-r from-lime-400 to-lime-500 text-white  top-0 w-full z-50">
        <div className="navbar-start">
          {/* Sidebar Toggle Button */}
          <button className="btn btn-ghost btn-circle" onClick={toggleSidebar}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </button>
        </div>
        
        <div className="navbar-center">
          <Link to={'/'} className="btn btn-ghost text-xl">𝑯𝒊𝒈𝒉𝒘𝒂𝒚-𝑻𝒖𝒓𝒇</Link>
        </div>
        
        <div className="navbar-end">
          {user ? (
            <button onClick={handleLogout} className="btn bg-gradient-to-r from-lime-600 to-lime-700 text-white">
              Logout
            </button>
          ) : (
            <NavLink
              to="/login"
              className="btn bg-gradient-to-r from-lime-600 to-lime-700 text-white"
            >
              Login
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
