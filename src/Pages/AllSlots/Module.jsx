import { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import useAuth from "../../Hook/useAuth";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import PropTypes from "prop-types";

const Module = ({ slotDetails, onClose }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { date, time, timesOfDay, _id, advance, bkash, nogod, availableSlots,slotOwner } = slotDetails;

  const [bookingInfo, setBookingInfo] = useState({
    customer: {
      name: user?.displayName || "",
      email: user?.email || "",
      image: user?.photoURL || "",
    },
    slotsId: _id,
    phone: "",
    transactionId: "",
    paymentMethod: "",
    date,
    time,
    timesOfDay,
    advance,
    slotOwner:slotOwner?.email,
    status: "pending",
  });

  const [loading, setLoading] = useState(false); // লোডিং স্টেট

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePaymentMethodChange = (method) => {
    setBookingInfo((prev) => ({
      ...prev,
      paymentMethod: method,
    }));
  };

  const handleBooking = async () => {
    setLoading(true);
    try {
      await axiosSecure.post("/bookings", bookingInfo);
      await axiosSecure.patch(`/bookings/availableSlots/${_id}`, { availableSlotsToUpdate: availableSlots,status:'decrease' });

      alert("Booking successful!");
      onClose();
    } catch (error) {
      console.error("Error booking slot:", error);
      alert("There was an error booking the slot. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleBooking();
  };

  return (
    <Dialog open={true} as="div" className="relative z-10" onClose={onClose}>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
        <DialogPanel className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
          <DialogTitle className="text-lg font-semibold text-gray-800">
            Confirm Booking
          </DialogTitle>
          <p className="mt-2 text-gray-600">
            Are you sure you want to book the slot on{" "}
            <span className="font-semibold text-gray-900">{date}</span> at{" "}
            <span className="font-semibold text-gray-900">{time}</span> (
            {timesOfDay})?
          </p>

          {/* Booking Form */}
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            {/* Phone Number */}
            <div>
              <label className="block text-gray-600">Phone Number</label>
              <input
                type="tel"
                name="phone"
                placeholder="Your Phone Number"
                className="w-full p-2 border rounded"
                value={bookingInfo.phone}
                onChange={handleChange}
                required
              />
            </div>

            {/* Transaction ID */}
            <div>
              <label className="block text-gray-600">Transaction ID</label>
              <input
                type="text"
                name="transactionId"
                placeholder="Transaction ID"
                className="w-full p-2 border rounded"
                value={bookingInfo.transactionId}
                onChange={handleChange}
                required
              />
            </div>

            {/* Payment Method Selection */}
            <div>
              <label className="block text-gray-600">Payment Method</label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="bKash"
                    checked={bookingInfo.paymentMethod === "bKash"}
                    onChange={() => handlePaymentMethodChange("bKash")}
                    className="text-blue-500"
                  />
                  <span>bKash</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Nagad"
                    checked={bookingInfo.paymentMethod === "Nagad"}
                    onChange={() => handlePaymentMethodChange("Nagad")}
                    className="text-blue-500"
                  />
                  <span>Nagad</span>
                </label>
              </div>
            </div>

            {/* Display Bkash and Nagad Numbers */}
            <div>
              <label className="block text-gray-600">Bkash Number</label>
              <input
                type="text"
                value={bkash}
                className="w-full p-2 border rounded bg-gray-100"
                disabled
              />
            </div>

            <div>
              <label className="block text-gray-600">Nagad Number</label>
              <input
                type="text"
                value={nogod}
                className="w-full p-2 border rounded bg-gray-100"
                disabled
              />
            </div>

            {/* Display Advance */}
            <div>
              <label className="block text-gray-600">Advance Amount</label>
              <input
                type="text"
                value={`৳${advance}`}
                className="w-full p-2 border rounded bg-gray-100"
                disabled
              />
            </div>

            {/* Display Time of Day */}
            <div>
              <label className="block text-gray-600">Time of Day</label>
              <input
                type="text"
                value={timesOfDay}
                className="w-full p-2 border rounded bg-gray-100"
                disabled
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition flex items-center"
                disabled={loading}
              >
                {loading ? (
                  <span className="loading loading-infinity loading-lg"></span>
                ) : (
                  `Confirm ৳${advance} BDT`
                )}
              </button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

// ✅ PropTypes Validation (ESLint Warning Fix)
Module.propTypes = {
  slotDetails: PropTypes.shape({
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    timesOfDay: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    advance: PropTypes.number.isRequired,
    bkash: PropTypes.string.isRequired,
    nogod: PropTypes.string.isRequired,
    slotOwner: PropTypes.string.isRequired,
    availableSlots: PropTypes.number.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Module;
