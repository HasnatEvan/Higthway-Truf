import { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import useAuth from "../../Hook/useAuth";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import PropTypes from "prop-types";
import bkashLogo from '../../assets/Images/th.jpeg';
import nagadLogo from '../../assets/Images/th (1).jpeg';
import Swal from "sweetalert2";

const Module = ({ slotDetails, onClose }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate(); // Initialize navigate
  const { date, time, timesOfDay, _id, advance, bkash, nogod, availableSlots, slotOwner } = slotDetails;

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
    slotOwner: slotOwner?.email,
    status: "pending",
  });

  const [loading, setLoading] = useState(false);
  const [phoneError, setPhoneError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingInfo((prev) => ({ ...prev, [name]: value }));

    if (name === "phone" && value.length !== 11) {
      setPhoneError("Phone number must be 11 digits.");
    } else {
      setPhoneError("");
    }
  };

  const handlePaymentMethodChange = (method) => {
    setBookingInfo((prev) => ({ ...prev, paymentMethod: method }));
  };

  const handleBooking = async () => {
    setLoading(true);
    try {
      await axiosSecure.post("/bookings", bookingInfo);
      await axiosSecure.patch(`/bookings/availableSlots/${_id}`, { availableSlotsToUpdate: availableSlots, status: 'decrease' });

      Swal.fire({ 
        title: "Booking Successful!", 
        text: "Your slot has been booked.", 
        icon: "success", 
        confirmButtonText: "Okay" 
      });
      onClose();
      navigate("/my-slot"); // Navigate to my-slot page after successful booking
    } catch {
      Swal.fire({ 
        title: "Error!", 
        text: "There was an error booking the slot. Please try again.", 
        icon: "error", 
        confirmButtonText: "Okay" 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!bookingInfo.paymentMethod) {
      Swal.fire({ 
        title: "Please Select a Payment Method", 
        text: "Choose either bKash or Nagad for the payment.", 
        icon: "warning", 
        confirmButtonText: "Okay" 
      });
      return;
    }

    if (phoneError) {
      Swal.fire({ 
        title: "Invalid Phone Number", 
        text: "Please enter a valid phone number with 11 digits.", 
        icon: "error", 
        confirmButtonText: "Okay" 
      });
    } else {
      handleBooking();
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    Swal.fire({ 
      title: "Copied to Clipboard", 
      text, 
      icon: "info", 
      confirmButtonText: "Okay" 
    });
  };

  return (
    <Dialog open={true} as="div" className="relative z-10" onClose={onClose}>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md sm:max-w-lg lg:max-w-xl bg-white text-gray-700 rounded-lg shadow-lg p-6 overflow-auto max-h-[80vh]">
          <DialogTitle className="text-lg font-semibold text-gray-800 text-center">
            𝑪𝒐𝒏𝒇𝒊𝒓𝒎 𝑩𝒐𝒐𝒌𝒊𝒏𝒈
          </DialogTitle>
          <p className="mt-2 text-gray-600 text-center">
            Are you sure you want to book the slot on{" "}
            <span className="font-semibold text-gray-900">{date}</span> at{" "}
            <span className="font-semibold text-gray-900">{time}</span> ({timesOfDay})?
          </p>

          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
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
                maxLength={11}
              />
              {phoneError && <p className="text-red-500 text-sm">{phoneError}</p>}
            </div>

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

            <div>
              <label className="block text-gray-600">Payment Method</label>
              <div className="flex flex-wrap items-center gap-4">
                {[{ name: "bKash", logo: bkashLogo }, { name: "Nagad", logo: nagadLogo }].map(({ name, logo }) => (
                  <label key={name} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={name}
                      checked={bookingInfo.paymentMethod === name}
                      onChange={() => handlePaymentMethodChange(name)}
                    />
                    <img src={logo} alt={name} className="w-10 h-10" />
                    <span>{name}</span>
                  </label>
                ))}
              </div>
            </div>

            {[{ name: "bKash", value: bkash, logo: bkashLogo }, { name: "Nagad", value: nogod, logo: nagadLogo }].map(({ name, value, logo }) => (
              <div key={name} className="flex items-center gap-2">
                <img src={logo} alt={`${name} Logo`} className="w-8 h-8" />
                <input type="text" value={value} className="w-full p-2 border rounded bg-gray-100" disabled />
                <button type="button" onClick={() => handleCopy(value)} className="px-2 py-1 rounded bg-gray-200">
                  📋 Copy
                </button>
              </div>
            ))}

            <div>
              <label className="block text-gray-600">Advance Amount</label>
              <input type="text" value={`৳${advance}`} className="w-full p-2 border rounded bg-gray-100" disabled />
            </div>

            <div className="flex justify-end gap-2">
              <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-400 text-white rounded">
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-lime-600 to-lime-700 text-white rounded flex items-center"
                disabled={loading || phoneError}
              >
                {loading ? <span className="loading loading-infinity loading-lg"></span> : `Confirm ৳${advance} BDT`}
              </button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

Module.propTypes = { 
  slotDetails: PropTypes.object.isRequired, 
  onClose: PropTypes.func.isRequired 
};

export default Module;
