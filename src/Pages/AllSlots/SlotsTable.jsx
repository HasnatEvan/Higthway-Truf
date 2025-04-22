import { useState } from "react";
import PropTypes from "prop-types";
import Module from "./Module";
import { useNavigate } from "react-router-dom";
import useAuth from "../../Hook/useAuth";
import { FaCalendarAlt, FaClock, FaMoneyBill, FaCreditCard } from "react-icons/fa";
const SlotsTable = ({ slot, isCardView }) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { date, time, timesOfDay, availableSlots, price, advance } = slot;
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleBooking = () => {
        if (!user) {
            navigate("/login");
            return;
        }
        if (availableSlots > 0) {
            setIsModalOpen(true);
        }
    };

    if (isCardView) {
        // Card View for mobile
        return (
            <div className="rounded-2xl p-5 shadow-md bg-[#fcf7ee] text-sm border border-[#f1e3c6] transition duration-300 hover:shadow-lg space-y-3">

            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-[#d9ab3f]" />
                    <span className="font-medium">Date</span>
                </div>
                <p>{date}</p>
            </div>
        
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <FaClock className="text-[#d9ab3f]" />
                    <span className="font-medium">Time</span>
                </div>
                <p>{time}</p>
            </div>
        
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <span className="text-[#d9ab3f]">⏰</span>
                    <span className="font-medium">Time Period</span>
                </div>
                <p>{timesOfDay}</p>
            </div>
        
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <FaMoneyBill className="text-[#d9ab3f]" />
                    <span className="font-medium">Price</span>
                </div>
                <p>৳{price}</p>
            </div>
        
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <FaCreditCard className="text-[#d9ab3f]" />
                    <span className="font-medium">Advance</span>
                </div>
                <p>৳{advance}</p>
            </div>
        
            <button
                onClick={handleBooking}
                className={`mt-4 w-full py-2 rounded-lg font-medium text-sm tracking-wide transition-all duration-300 ${
                    availableSlots > 0
                        ? "bg-[#d9ab3f] hover:bg-[#c79836] text-white"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                disabled={availableSlots === 0}
            >
                {availableSlots > 0 ? "Book Now" : "Already Booked"}
            </button>
        
            {isModalOpen && <Module slotDetails={slot} onClose={() => setIsModalOpen(false)} />}
        </div>
        
        );
    }

    // Table Row for desktop
    return (
        <>
            <tr className="hover:bg-gray-50 text-center text-sm md:text-base">
                <td className="border px-2 py-2 whitespace-nowrap">{date}</td>
                <td className="border px-2 py-2 whitespace-nowrap">{time}</td>
                <td className="border px-2 py-2">{timesOfDay}</td>
                <td className="border px-2 py-2">৳{price}</td>
                <td className="border px-2 py-2">৳{advance}</td>
                <td className="border px-2 py-2">
                    <button
                        onClick={handleBooking}
                        className={`px-2 sm:px-3 py-1 rounded text-xs sm:text-sm transition ${
                            availableSlots > 0
                                ? "bg-[#d9ab3f] text-white"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                        disabled={availableSlots === 0}
                    >
                        {availableSlots > 0 ? "Book Now" : "Already Booked"}
                    </button>
                </td>
            </tr>

            {isModalOpen && <Module slotDetails={slot} onClose={() => setIsModalOpen(false)} />}
        </>
    );
};

SlotsTable.propTypes = {
    slot: PropTypes.shape({
        date: PropTypes.string.isRequired,
        time: PropTypes.string.isRequired,
        timesOfDay: PropTypes.string.isRequired,
        availableSlots: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        advance: PropTypes.number.isRequired,
    }).isRequired,
    isCardView: PropTypes.bool.isRequired,
};

export default SlotsTable;
