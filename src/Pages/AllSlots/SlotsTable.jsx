import { useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import Module from "./Module"; // Modal Component
import { useNavigate } from "react-router-dom"; // Import useNavigate
import useAuth from "../../Hook/useAuth";


const SlotsTable = ({ slot }) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { date, time, timesOfDay, availableSlots, price, advance } = slot;
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleBooking = () => {
        // যদি ইউজার না থাকে, তাহলে লগইন পেজে নিয়ে যাওয়া হবে
        if (!user) {
            navigate("/login");
            return;
        }

        // যদি ইউজার থাকে এবং availableSlots > 0, তাহলে Modal ওপেন হবে
        if (availableSlots > 0) {
            setIsModalOpen(true);
        }
    };

    return (
        <>
            <tr className="hover:bg-gray-50 text-xs sm:text-sm md:text-base text-center">
                <td className="border px-2 py-2 whitespace-nowrap">{date}</td>
                <td className="border px-2 py-2 whitespace-nowrap">{time}</td>
                <td className="border px-2 py-2">{timesOfDay}</td>
                <td className="border px-2 py-2">{availableSlots}</td>
                <td className="border px-2 py-2">৳{price}</td>
                <td className="border px-2 py-2">৳{advance}</td>
                <td className="border px-2 py-2">
                    <button
                        onClick={handleBooking}
                        className={`px-2 sm:px-3 py-1 rounded text-xs sm:text-sm transition ${
                            availableSlots > 0
                                ? "bg-gradient-to-r from-lime-600 to-lime-700 text-white"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                        disabled={availableSlots === 0}
                    >
                        {availableSlots > 0 ? "Book Now" : "Already Booked"}
                    </button>
                </td>
            </tr>

            {/* Modal */}
            {isModalOpen && (
                <Module slotDetails={slot} onClose={() => setIsModalOpen(false)} />
            )}
        </>
    );
};

// PropTypes ডিফাইন করা হয়েছে
SlotsTable.propTypes = {
    slot: PropTypes.shape({
        date: PropTypes.string.isRequired,
        time: PropTypes.string.isRequired,
        timesOfDay: PropTypes.string.isRequired,
        availableSlots: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        advance: PropTypes.number.isRequired,
    }).isRequired,
};

export default SlotsTable;
