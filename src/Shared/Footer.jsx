import { NavLink } from "react-router-dom";
import useRole from "../Hook/useRole";
import { FaFacebook, FaTwitter, FaWhatsapp } from "react-icons/fa";
import logo from '../../src/assets/logo/logo.jpg';

const Footer = () => {
  const [role] = useRole();

  return (
    <footer className="bg-[#fcf7ee] text-black p-10 ">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">

        {/* Logo & Info */}
        <div className="flex flex-col items-center md:items-start space-y-2">
          <img src={logo} alt="Highway Turf Logo" className="w-12 h-12 rounded-full" /> {/* Logo Image */}
          <p className="text-2xl">
          𝑯𝒊𝒈𝒉𝒘𝒂𝒚-𝑻𝒖𝒓𝒇
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col space-y-2 lg:ml-36">
          <NavLink to="/all-slots" className="hover:text-lime-400">All Slots</NavLink>

          {/* Admin Links */}
          {role === "admin" && (
            <>
              <NavLink to="/add-slot" className="hover:text-lime-400">Add Slots</NavLink>
              <NavLink to="/my-slot-list" className="hover:text-lime-400">My Slots List</NavLink>
              <NavLink to="/manage-slot" className="hover:text-lime-400">Manage Slots</NavLink>
            </>
          )}

          {/* Customer Links */}
          {role === "customer" && (
            <NavLink to="/my-slot" className="hover:text-lime-400">My Slots</NavLink>
          )}

          {/* Common Links */}
          <NavLink to="/about" className="hover:text-lime-400">About</NavLink>
        </div>

        {/* Social Media Links */}
        <div className="flex justify-center md:justify-start space-x-6 lg:ml-44">
          <a href="https://www.facebook.com/highwayturf" target="_blank" rel="noopener noreferrer">
            <FaFacebook size={30} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter size={30} className="" />
          </a>
          <a href="https://wa.me/01814197707" target="_blank" rel="noopener noreferrer">
            <FaWhatsapp size={30} className="" />
          </a>
        </div>

      </div>

      {/* Developer Name and Copyright */}
      <div className="text-center text-sm text-black mt-6">
        <p>
          Developed by{" "}
          <a href="https://neon-crepe-750faf.netlify.app/" target="_blank" rel="noopener noreferrer" className="hover:text-lime-400">
            Hasnat Evan
          </a>
        </p>

        <p>&copy; {new Date().getFullYear()} Highway Turf. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
