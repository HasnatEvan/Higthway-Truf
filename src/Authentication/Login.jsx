import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../Hook/useAuth";
import { useState } from "react";
import GoogleLogin from "../Shared/GoogleLogin";
import Lottie from "lottie-react";
import loginLottie from "../../src/assets/lotties/login.json"; // Lottie animation file

const Login = () => {
    const { signIn, resetPassword } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [isError, setIsError] = useState(false);
    const [emailForReset, setEmailForReset] = useState("");
    const [showResetModal, setShowResetModal] = useState(false);

    const from = location.state?.from?.pathname || "/";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);
        setIsError(false);

        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        try {
            setLoading(true);
            const result = await signIn(email, password);
            console.log(result);

            setMessage("Login successful! Redirecting...");
            setTimeout(() => {
                navigate(from, { replace: true });
            }, 1500);
        } catch (error) {
            console.error("Login failed: ", error);

            if (error.code === "auth/invalid-credential") {
                setMessage("Incorrect email or password! Please try again.");
            } else if (error.code === "auth/user-not-found") {
                setMessage("No account found with this email.");
            } else if (error.code === "auth/wrong-password") {
                setMessage("Incorrect password! Please try again.");
            } else {
                setMessage(error.message || "Login failed! Please try again.");
            }

            setIsError(true);
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordReset = async () => {
        if (!emailForReset) {
            setMessage("Please enter your email to reset the password.");
            setIsError(true);
            return;
        }

        try {
            await resetPassword(emailForReset);
            setMessage("Password reset email sent! Check your inbox.");
            setIsError(false);
            setShowResetModal(false);
        } catch (error) {
            console.error("Password Reset Error: ", error);
            setMessage("Failed to send reset email. Please try again.");
            setIsError(true);
        }
    };

    return (
        <div className={`flex flex-col md:flex-row border-b border-gray-200 items-center justify-around min-h-screen bg-[#fcf8f0] text-black px-4 ${showResetModal ? "backdrop-blur-md" : ""}`}>
            {/* Lottie Animation */}
            <div className="w-full md:w-1/2 flex justify-center mt-12 md:mt-0">
                <Lottie animationData={loginLottie} loop={true} className="w-3/4 md:w-full h-auto" />
            </div>

            {/* Login Form */}
            <div className="bg-[#fcf8f0] p-8 w-full max-w-md md:mt-0 -mt-[100px]">
                <h2 className="text-2xl font-bold text-center mb-6">Login Now</h2>

                <form onSubmit={handleSubmit}>
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

                    <div className="mb-4 text-right">
                        <button
                            type="button"
                            onClick={() => setShowResetModal(true)}
                            className="text-sm text-blue-500 hover:underline"
                        >
                            Forgot Password?
                        </button>
                    </div>

                    {message && (
                        <p className={`mb-4 text-center ${isError ? "text-red-500" : "text-green-500"}`}>
                            {message}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                        disabled={loading}
                    >
                        {loading ? <span className="loading loading-infinity loading-lg"></span> : "Login"}
                    </button>

                    <div className="flex justify-center mt-4">
                        <GoogleLogin />
                    </div>
                </form>

                <p className="mt-4 text-center">
                    Don&apos;t have an account?{" "}
                    <Link to="/register" className="text-blue-500 hover:underline">
                        Sign Up
                    </Link>
                </p>
            </div>

            {/* Password Reset Modal */}
            {showResetModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
                        <h3 className="text-xl font-bold text-center mb-4">Reset Password</h3>
                        <p className="text-center text-gray-600 mb-4">Enter your email to receive reset instructions.</p>
                        <input
                            type="email"
                            value={emailForReset}
                            onChange={(e) => setEmailForReset(e.target.value)}
                            className="w-full p-2 border rounded mb-4"
                            placeholder="Enter your email"
                        />
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setShowResetModal(false)}
                                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handlePasswordReset}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                Reset Password
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;
