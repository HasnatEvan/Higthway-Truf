import { FcGoogle } from 'react-icons/fc';  // Importing the Google icon
import useAuth from '../Hook/useAuth';
import Swal from 'sweetalert2';  // Import SweetAlert
import { useNavigate, useLocation } from 'react-router-dom';  // Import useNavigate and useLocation for navigation
import axios from 'axios';  // Import axios to send data to the backend

const GoogleLogin = () => {
    const { signInWithGoogle, loading } = useAuth();
    const navigate = useNavigate();  // Initialize the navigate function
    const location = useLocation();  // Initialize location to access the redirect state
    const from = location.state?.from?.pathname || '/';  // If redirected, get the previous path, else default to home page

    // Handle Google login
    const handleGoogleLogIn = async () => {
        try {
            // Sign in with Google and get the result
            const result = await signInWithGoogle();

            // Get user data from the result
            const { displayName, email, photoURL } = result.user;

            // Prepare the data to be sent to the backend
            const userData = {
                name: displayName,
                email,
                photoUrl: photoURL,
            };

            // Send the user data to the backend
            await axios.post(`http://localhost:5000/users/${email}`, userData);  // Change backend URL if necessary

            // Show success message with SweetAlert
            Swal.fire({
                title: 'Success!',
                text: 'Logged in with Google successfully.',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                // Navigate to the page user came from (or home page if no redirect) after clicking OK in SweetAlert
                navigate(from, { replace: true });
            });
        } catch (error) {
            console.error("Google login failed: ", error);
            // Show error message with SweetAlert
            Swal.fire({
                title: 'Error!',
                text: 'Google login failed. Please try again.',
                icon: 'error',
                confirmButtonText: 'Try Again'
            });
        }
    };

    return (
        <div>
            <button
                onClick={handleGoogleLogIn}
                className="flex items-center px-17 py-3 bg-white border border-gray-300 rounded-lg shadow-md hover:shadow-lg hover:border-gray-400 transition duration-300 ease-in-out focus:outline-none"
                disabled={loading} // Disable button when loading
            >
                <FcGoogle className="text-2xl mr-3" /> {/* Google Icon */}
                <span className="text-gray-700 font-medium">Sign in with Google</span>
            </button>
        </div>
    );
};

export default GoogleLogin;
