import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { imageUpload } from "../Api/utiles";
import useAuth from "../Hook/useAuth";
import Swal from "sweetalert2";
import axios from "axios";
import GoogleLogin from "../Shared/GoogleLogin";

const SignUp = () => {
  const { createUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';  // If the location state exists, get the previous path, else default to home page.
  
  const [loading, setLoading] = useState(false); // Track loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const image = form.image.files[0];

    try {
      setLoading(true); // Start loading

      // Upload image to ImgBB
      const photoUrl = await imageUpload(image);
      console.log(photoUrl);

      // Create user with email and password
      const result = await createUser(email, password);
      if (!result?.user) throw new Error("User creation failed!");

      // Update user profile
      await updateUserProfile(name, photoUrl);
      console.log('User successfully created and profile updated');

      // Send name, email, and image to the backend using axios
      const userData = {
        name,
        email,
        photoUrl, // Send image URL from ImgBB
      };

      // Make a POST request to the backend
      const response = await axios.post(`http://localhost:5000/users/${email}`, userData);
      console.log("User data sent to the backend:", response.data);

      // Show success message
      Swal.fire({
        title: 'Success!',
        text: 'User created successfully!',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        // Navigate to the previous page if redirected, otherwise to the Home page
        navigate(from, { replace: true });
      });
    } catch (error) {
      console.error("Error during sign-up: ", error);

      // Show error message
      Swal.fire({
        title: 'Error!',
        text: error.message || 'Something went wrong!',
        icon: 'error',
        confirmButtonText: 'Try Again'
      });
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

        <form onSubmit={handleSubmit}>
          {/* Name Input */}
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              className="w-full p-2 border rounded mt-1"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              className="w-full p-2 border rounded mt-1"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Photo Upload */}
          <div className="mb-4">
            <label className="block text-gray-700">Upload Photo</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              className="w-full p-2 border rounded mt-1"
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              className="w-full p-2 border rounded mt-1"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            disabled={loading} // Disable button while loading
          >
            {loading ? (
              <span className="loading loading-infinity loading-lg"></span> // Show loading spinner
            ) : (
              'Sign Up'
            )}
          </button>
          <div className="flex justify-center mt-2">
            <GoogleLogin />
          </div>
        </form>

        {/* Login Redirect */}
        <p className="mt-4 text-center">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
