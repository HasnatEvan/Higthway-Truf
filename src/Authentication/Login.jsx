import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../Hook/useAuth";
import Swal from "sweetalert2";
import { useState } from "react";
import GoogleLogin from "../Shared/GoogleLogin";

const Login = () => {
    const { signIn } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();  // Initialize location to access the redirect state
    const [loading, setLoading] = useState(false); // Track loading state

    // If user was redirected from a protected route, get the previous path
    const from = location.state?.from?.pathname || '/';  // Default to home if no redirect

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        try {
            setLoading(true);  // Start loading spinner

            const result = await signIn(email, password);
            console.log(result); // Just for debugging

            // Show success message
            Swal.fire({
                title: 'Success!',
                text: 'Login successful!',
                icon: 'success',
                confirmButtonText: 'OK',
            }).then(() => {
                // Navigate to the page user came from (or home page if no redirect) after successful login
                navigate(from, { replace: true });
            });
        } catch (error) {
            console.error("Login failed: ", error);

            // Show error message
            Swal.fire({
                title: 'Error!',
                text: error.message || 'Login failed!',
                icon: 'error',
                confirmButtonText: 'Try Again',
            });
        } finally {
            setLoading(false);  // Stop loading spinner
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

                <form onSubmit={handleSubmit}>
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

                    {/* Forgot Password Link */}
                    <div className="mb-4 text-right">
                        <Link
                            to="/forgot-password"
                            className="text-sm text-blue-500 hover:underline"
                        >
                            Forgot Password?
                        </Link>
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                        disabled={loading} // Disable button while loading
                    >
                        {loading ? (
                            <span className="loading loading-infinity loading-lg"></span> // Show loading spinner
                        ) : (
                            'Login'
                        )}
                    </button>
                    <div className="flex justify-center mt-2">
                        <GoogleLogin></GoogleLogin>
                    </div>
                </form>

                {/* Sign Up Redirect */}
                <p className="mt-4 text-center">
                    Don&apos;t have an account?{" "}
                    <Link to="/register" className="text-blue-500 hover:underline">
                        Sign Up
                    </Link>
                </p>

            </div>
        </div>
    );
};

export default Login;
