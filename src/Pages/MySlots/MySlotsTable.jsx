import PropTypes from 'prop-types';
import useAxiosSecure from "../../Hook/useAxiosSecure";
import Swal from "sweetalert2";
import { useEffect, useState } from 'react';

const MySlotsTable = ({ booking }) => {
    const { _id, date, paymentMethod, phone, price, status, time, timesOfDay, transactionId, slotsId } = booking;
    const axiosSecure = useAxiosSecure();

    const [currentStatus, setCurrentStatus] = useState(status);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setCurrentStatus(status);  // Update the status when prop changes
    }, [status]);

    const handleCancelBooking = async () => {
        setLoading(true);
        // Confirm with user before canceling
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'Do you really want to cancel this booking?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, cancel it!',
            cancelButtonText: 'No, keep it',
        });

        if (result.isConfirmed) {
            try {
                const response = await axiosSecure.delete(`/bookings/${_id}`);
                // Increment the available slots by 1
                await axiosSecure.patch(`/bookings/availableSlots/${slotsId}`, { availableSlotsToUpdate: 1, status: 'increase' });

                if (response.status === 200) {
                    // Success alert
                    Swal.fire({
                        icon: "success",
                        title: "Booking Cancelled",
                        text: "Your booking has been successfully cancelled.",
                        confirmButtonText: "OK",
                    });
                    // Change status after successful cancellation
                    setCurrentStatus('canceled');
                }
            } catch {
                // Error alert
                Swal.fire({
                    icon: "error",
                    title: "Failed to Cancel Booking",
                    text: "Something went wrong. Please try again later.",
                    confirmButtonText: "OK",
                });
            }
        }
        setLoading(false);
    };

    // Determine the status color dynamically
    const statusColorClass = currentStatus === 'pending' ? 'text-yellow-600' :
                            currentStatus === 'canceled' ? 'text-red-600' :
                            currentStatus === 'completed' ? 'text-green-600' : 'text-gray-600';

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 bg-white shadow-md">
                <thead>
                    <tr className="bg-gray-200 text-gray-700">
                        <th className="p-2 border">Date</th>
                        <th className="p-2 border">Payment Method</th>
                        <th className="p-2 border">Phone</th>
                        <th className="p-2 border">Price</th>
                        <th className="p-2 border">Status</th>
                        <th className="p-2 border">Time</th>
                        <th className="p-2 border">Times of Day</th>
                        <th className="p-2 border">Transaction ID</th>
                        <th className="p-2 border">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="text-center">
                        <td className="p-2 border">{date}</td>
                        <td className="p-2 border">{paymentMethod}</td>
                        <td className="p-2 border">{phone}</td>
                        <td className="p-2 border">{price} ৳</td>
                        <td className={`p-2 border ${statusColorClass}`}>
                            {currentStatus}
                        </td>
                        <td className="p-2 border">{time}</td>
                        <td className="p-2 border">{timesOfDay}</td>
                        <td className="p-2 border">{transactionId}</td>
                        <td className="px-4 py-2">
                            {(currentStatus.toLowerCase() === "pending" || currentStatus.toLowerCase() === "canceled") && (
                                <button
                                    onClick={handleCancelBooking}
                                    className={`py-1 px-4 rounded transition duration-300 ${loading
                                        ? "bg-gray-400 text-white cursor-not-allowed"
                                        : "bg-red-500 hover:bg-red-700 text-white"
                                        }`}
                                    disabled={loading}
                                >
                                    {loading ? "Cancelling..." : "Cancel"}
                                </button>
                            )}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

// Define PropTypes for validation
MySlotsTable.propTypes = {
    booking: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        paymentMethod: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        status: PropTypes.string.isRequired,
        time: PropTypes.string.isRequired,
        timesOfDay: PropTypes.string.isRequired,
        transactionId: PropTypes.string.isRequired,
        slotsId: PropTypes.string.isRequired,
    }).isRequired,
};

export default MySlotsTable;
