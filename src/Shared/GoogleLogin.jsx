import { FcGoogle } from 'react-icons/fc';
import useAuth from '../Hook/useAuth';
import Swal from 'sweetalert2';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const GoogleLogin = () => {
    const { signInWithGoogle, loading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const handleGoogleLogIn = async () => {
        try {
            const result = await signInWithGoogle();
            const { displayName, email, photoURL } = result.user;

            const userData = {
                name: displayName,
                email,
                photoUrl: photoURL,
            };

            await axios.post(`https://highway-turf-server.vercel.app/users/${email}`, userData);
          


            Swal.fire({
                title: 'Success!',
                text: 'Logged in with Google successfully.',
                icon: 'success',
                confirmButtonText: 'OK',
            }).then(() => {
                navigate(from, { replace: true });
            });
        } catch (error) {
            console.error('Google login failed: ', error);
            Swal.fire({
                title: 'Error!',
                text: 'Google login failed. Please try again.',
                icon: 'error',
                confirmButtonText: 'Try Again',
            });
        }
    };

    return (
        <div className="flex justify-center">
            <button
                onClick={handleGoogleLogIn}
                className="flex items-center justify-center w-full max-w-xs md:max-w-sm px-5 py-3 bg-white border border-gray-300 rounded-lg shadow-md hover:shadow-lg hover:border-gray-400 transition duration-300 ease-in-out focus:outline-none disabled:opacity-50"
                disabled={loading}
            >
                {loading ? (
                    <span className="animate-spin h-5 w-5 border-t-2 border-gray-500 rounded-full"></span>
                ) : (
                    <>
                        <FcGoogle className="text-2xl mr-3" />
                        <span className="text-gray-700 font-medium">Sign in with Google</span>
                    </>
                )}
            </button>
        </div>
    );
};

export default GoogleLogin;
