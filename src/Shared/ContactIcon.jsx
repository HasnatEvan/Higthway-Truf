import { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";

const ContactIcon = () => {
    // State to manage visibility and contacting status
    const [isVisible, setIsVisible] = useState(false);
    const [isContacting, setIsContacting] = useState(false);

    // Function to handle WhatsApp link
    const handleWhatsapp = () => {
        setIsContacting(true); // Set contacting state to true
        window.location.href = `https://wa.me/8801824481881`; // Redirect to WhatsApp
    };

    // Function to scroll to the top of the page
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth", // Smooth scroll to the top
        });
    };

    // Effect to show the contact icon after 5 seconds of scroll
    useEffect(() => {
        const handleScroll = () => {
            // Delay showing the icon by 5 seconds after the scroll event
            setTimeout(() => {
                setIsVisible(true);
            }, 5000); // 5 seconds delay
        };

        // Add scroll event listener
        window.addEventListener("scroll", handleScroll);

        // Cleanup the event listener when component is unmounted
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        isVisible && (
            <div className="fixed bottom-0 left-0 w-full flex justify-between  items-center px-4 md:px-14 py-4 md:py-6 z-50 ">
                {/* WhatsApp Icon on the Left */}
                <div className="flex items-center space-x-3 transform transition-all duration-300">
                    <div
                        className={`bg-green-600 text-white p-3 rounded-full shadow-xl cursor-pointer animate-bounce`}
                        onClick={handleWhatsapp} // Redirect to WhatsApp on click
                    >
                        <FaWhatsapp className="w-6 h-6" />
                        {/* Display status when contacting */}
                        {isContacting && (
                            <span className="text-xs absolute bottom-0 right-0 bg-white text-green-600 rounded-full px-2 py-1">
                                Contacting...
                            </span>
                        )}
                    </div>
                </div>

                {/* Scroll to Top Button on the Right */}
                <button
                    onClick={scrollToTop} // Scroll to the top when clicked
                    className="bg-orange-600 text-white p-3 rounded-full shadow-xl hover:animate-pulse"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                    </svg>
                </button>
            </div>
        )
    );
};

export default ContactIcon;
