import { useRef } from "react";
import useAuth from "../../Hook/useAuth";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2"; // Import SweetAlert2

const ContactForm = () => {
    const { user } = useAuth();
    const formRef = useRef();

    // Handle Form Submission
    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm(
                "service_vtjxlpi", // তোমার EmailJS Service ID
                "template_0del7ut", // তোমার Template ID
                formRef.current,
                "Hk3qLmG8wDXFYO38z" // তোমার Public Key
            )
            .then(
                (result) => {
                    console.log("SUCCESS!", result.text);
                    // Success message with SweetAlert
                    Swal.fire({
                        icon: "success",
                        title: "Message Sent!",
                        text: "Your message has been sent successfully.",
                    });
                    formRef.current.reset(); // ফর্ম রিসেট করবে
                },
                (error) => {
                    console.log("FAILED...", error.text);
                    // Error message with SweetAlert
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Something went wrong, please try again.",
                    });
                }
            );
    };

    return (
        <div className="max-w-lg mx-auto p-6">
            <h2 className="text-3xl font-semibold text-center mb-6">Contact Us</h2>
            <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
                {/* Name Field */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Name</label>
                    <input
                        type="text"
                        name="user_name"
                        value={user?.displayName || ""}
                        readOnly
                        className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-50 text-gray-600 focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                {/* Email Field */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Email</label>
                    <input
                        type="email"
                        name="user_email"
                        value={user?.email || ""}
                        readOnly
                        className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-50 text-gray-600 focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                {/* Message Field */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Message</label>
                    <textarea
                        name="message"
                        placeholder="Enter your message"
                        rows="5"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-50 text-gray-600 focus:ring-2 focus:ring-blue-400"
                    ></textarea>
                </div>

                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-lime-400 to-lime-500  text-white py-3 rounded-md transition ease-in-out duration-300"
                    >
                        Send Message
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ContactForm;
