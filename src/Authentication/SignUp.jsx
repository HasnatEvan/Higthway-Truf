import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { imageUpload } from "../Api/utiles";
import useAuth from "../Hook/useAuth";
import Swal from "sweetalert2";
import axios from "axios";
import GoogleLogin from "../Shared/GoogleLogin";
import Lottie from "lottie-react";
import signupLottie from "../../src/assets/lotties/signup.json";

const SignUp = () => {
  const { createUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const image = form.image.files[0];

    try {
      setLoading(true);
      setError("");

      const photoUrl = await imageUpload(image);

      const result = await createUser(email, password);
      if (!result?.user) throw new Error("User creation failed!");

      await updateUserProfile(name, photoUrl);

      const userData = { name, email, photoUrl };

      await axios.post(`https://highway-turf-server.vercel.app/users/${email}`, userData);

      Swal.fire({
        title: "Success!",
        text: "User created successfully!",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        navigate(from, { replace: true });
      });
    } catch (err) {
      console.error("Error during sign-up: ", err);

      let errorMessage = "Something went wrong. Please try again.";
      if (err.message.includes("auth/invalid-email")) {
        errorMessage = "Please enter a valid email address.";
      } else if (err.message.includes("auth/weak-password")) {
        errorMessage = "Password should be at least 6 characters.";
      } else if (err.message.includes("auth/email-already-in-use")) {
        errorMessage = "This email is already in use.";
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-around min-h-[80vh] bg-[#fcf8f0] p-4 border-b border-gray-200">
      {/* Lottie Animation (Responsive for All Devices) */}
      <div className="w-full md:w-1/3 flex justify-center mt-10">
        <Lottie animationData={signupLottie} loop={true} className="w-2/3 md:w-full h-auto" />
      </div>

      {/* Sign Up Form */}
      <div className="w-full md:w-[400px] bg-[#fcf8f0] text-gray-700 p-6 md:p-8  lg:mt-16">
        <h2 className="text-2xl font-bold text-center mb-6 ">Sign Up Now</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input type="text" name="name" className="w-full p-2 border rounded mt-1" placeholder="Enter your name" required />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input type="email" name="email" className="w-full p-2 border rounded mt-1" placeholder="Enter your email" required />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Upload Photo</label>
            <input type="file" name="image" accept="image/*" className="w-full p-2 border rounded mt-1" required />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input type="password" name="password" className="w-full p-2 border rounded mt-1" placeholder="Enter your password" required />
          </div>

          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600" disabled={loading}>
            {loading ? <span className="loading loading-infinity loading-lg"></span> : "Sign Up"}
          </button>

          {error && <p className="mt-4 text-red-500 text-center">{error}</p>}

          <div className="flex justify-center mt-2">
            <GoogleLogin />
          </div>
        </form>

        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link to={'/login'} className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
