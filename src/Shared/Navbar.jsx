import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../Hook/useAuth";
import useRole from "../Hook/useRole";
import { FaSignInAlt, FaSignOutAlt, FaHome, FaInfoCircle, FaPlusCircle, FaList, FaEdit, FaCalendarAlt } from "react-icons/fa";
import { MdEventAvailable } from "react-icons/md";
import Swal from "sweetalert2";
import sidebarLogo from '../../src/assets/logo/logo.jpg';

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [role] = useRole();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

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

      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-opacity-40 z-40" onClick={toggleSidebar}></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 shadow-lg p-5 bg-[#fcf7ee] text-black
          transform ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          transition-transform duration-300 ease-in-out z-50`}
      >
        <button className="btn btn-sm btn-circle absolute top-3 right-3" onClick={toggleSidebar}>
          ✕
        </button>

        <div className="flex items-center mb-5">
          <img src={sidebarLogo} alt="Logo" className="w-10 h-10 mr-3 rounded-full" />
          <div className="text-lg font-semibold text-black">𝑯𝒊𝒈𝒉𝒘𝒂𝒚-𝑻𝒖𝒓𝒇</div>
        </div>

        <ul className="menu space-y-3 mt-10 text-black">
          <li>
            <NavLink to="/" className={({ isActive }) => isActive ? "text-black font-semibold" : "text-black hover:text-blue-600 transition"}>
              <FaHome className="inline mr-2" /> Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/all-slots" className={({ isActive }) => isActive ? "text-black font-semibold" : "text-black hover:text-blue-600 transition"}>
              <FaCalendarAlt className="inline mr-2" /> All Slots
            </NavLink>
          </li>

          {role === "admin" && (
            <>
              <li>
                <NavLink to="/add-slot" className={({ isActive }) => isActive ? "text-black font-semibold" : "text-black hover:text-blue-600 transition"}>
                  <FaPlusCircle className="inline mr-2" /> Add Slots
                </NavLink>
              </li>
              <li>
                <NavLink to="/my-slot-list" className={({ isActive }) => isActive ? "text-black font-semibold" : "text-black hover:text-blue-600 transition"}>
                  <FaList className="inline mr-2" /> My Slots List
                </NavLink>
              </li>
              <li>
                <NavLink to="/manage-slot" className={({ isActive }) => isActive ? "text-black font-semibold" : "text-black hover:text-blue-600 transition"}>
                  <FaEdit className="inline mr-2" /> Manage Slots
                </NavLink>
              </li>
            </>
          )}

          {role === "customer" && (
            <li>
              <NavLink to="/my-slot" className={({ isActive }) => isActive ? "text-black font-semibold" : "text-black hover:text-blue-600 transition"}>
                <MdEventAvailable className="inline mr-2" /> My Slots
              </NavLink>
            </li>
          )}

          <li>
            <NavLink to="/about" className={({ isActive }) => isActive ? "text-black font-semibold" : "text-black hover:text-blue-600 transition"}>
              <FaInfoCircle className="inline mr-2" /> About
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Navbar */}
      <div className="navbar bg-[#fcf7ee] text-black top-0 w-full z-30 border-b border-gray-200 ">
        <div className="navbar-start">
          <button className="btn btn-ghost btn-circle" onClick={toggleSidebar}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </button>
        </div>

        <div className="navbar-center">
          <Link to="/" className="btn btn-ghost text-xl text-black">𝑯𝒊𝒈𝒉𝒘𝒂𝒚-𝑻𝒖𝒓𝒇</Link>
        </div>

        <div className="navbar-end">
          {user ? (
            <button onClick={handleLogout} className="text-black text-xl hover:text-blue-600 transition">
              <FaSignOutAlt />
            </button>
          ) : (
            <NavLink to="/login" className="text-black text-xl hover:text-blue-600 transition">
              <FaSignInAlt />
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
