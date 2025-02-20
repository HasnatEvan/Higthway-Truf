import { useState } from "react";
import Module from "./Module"; // Modal কম্পোনেন্ট ইম্পোর্ট

const SlotsTable = ({ slot }) => {
  const { date, time, timesOfDay, availableSlots, price, advance, description,bkash } = slot;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBooking = () => {
    if (availableSlots > 0) {
      setIsModalOpen(true); // Modal ওপেন করা
    }
  };

  return (
    <>
      <tr className="hover:bg-gray-50">
        <td className="border p-2 text-center">{date}</td>
        <td className="border p-2 text-center">{time}</td>
        <td className="border p-2 text-center">{timesOfDay}</td>
        <td className="border p-2 text-center">{availableSlots}</td>
        <td className="border p-2 text-center">৳{price}</td>
        <td className="border p-2 text-center">৳{advance}</td>
        <td className="border p-2 text-center">{description}</td>
        <td className="border p-2 text-center">
          <button
            onClick={handleBooking}
            className={`px-3 py-1 rounded transition ${
              availableSlots > 0
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            disabled={availableSlots === 0}
          >
            {availableSlots > 0 ? "Book Now" : "Already Booked"}
          </button>
        </td>
      </tr>

      {/* Modal ওপেন হবে যখন isModalOpen === true */}
      {isModalOpen && (
        <Module
          slotDetails={slot}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default SlotsTable;
