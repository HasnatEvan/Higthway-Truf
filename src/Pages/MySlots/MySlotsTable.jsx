import PropTypes from 'prop-types';
import useAxiosSecure from "../../Hook/useAxiosSecure";
import Swal from "sweetalert2";
import { useEffect, useState } from 'react';

const MySlotsTable = ({ booking, index }) => {
    const { _id, date, paymentMethod, phone, price, status, time, timesOfDay, transactionId, slotsId } = booking;
    const axiosSecure = useAxiosSecure();

    const [currentStatus, setCurrentStatus] = useState(status);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setCurrentStatus(status);  // Update the status when prop changes
    }, [status]);

    const handleCancelBooking = async () => {
        setLoading(true);
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
                await axiosSecure.patch(`/bookings/availableSlots/${slotsId}`, { availableSlotsToUpdate: 1, status: 'increase' });

                if (response.status === 200) {
                    Swal.fire({
                        icon: "success",
                        title: "Booking Cancelled",
                        text: "Your booking has been successfully cancelled.",
                        confirmButtonText: "OK",
                    });
                    setCurrentStatus('canceled');
                }
            } catch {
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
    const statusColorClass = currentStatus === 'Pending' ? 'text-yellow-600' :
                            currentStatus === 'Processing' ? 'text-blue-600' :
                            currentStatus === 'Confirm' ? 'text-green-600' :
                            currentStatus === 'Canceled' ? 'text-red-600' : 'text-gray-600';

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 bg-white shadow-md">
                <thead>
                    <tr className="bg-gray-200 bg-gradient-to-r from-lime-400 to-lime-500 text-white whitespace-nowrap">
                        <th className="p-2 border text-xs sm:text-sm md:text-base">#</th>
                        <th className="p-2 border text-xs sm:text-sm md:text-base">Date</th>
                        <th className="p-2 border text-xs sm:text-sm md:text-base">Payment Method</th>
                        <th className="p-2 border text-xs sm:text-sm md:text-base">Phone</th>
                        <th className="p-2 border text-xs sm:text-sm md:text-base">Price</th>
                        <th className="p-2 border text-xs sm:text-sm md:text-base">Status</th>
                        <th className="p-2 border text-xs sm:text-sm md:text-base">Time</th>
                        <th className="p-2 border text-xs sm:text-sm md:text-base">Times of Day</th>
                        <th className="p-2 border text-xs sm:text-sm md:text-base">Transaction ID</th>
                        <th className="p-2 border text-xs sm:text-sm md:text-base">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="text-center whitespace-nowrap">
                        <td className="p-2 border">{index}</td>
                        <td className="p-2 border">{date}</td>
                        <td className="p-2 border">{paymentMethod}</td>
                        <td className="p-2 border">{phone}</td>
                        <td className="p-2 border">{price} BDT</td>
                        <td className={`p-2 border ${statusColorClass}`}>
                            {currentStatus}
                        </td>
                        <td className="p-2 border">{time}</td>
                        <td className="p-2 border">{timesOfDay}</td>
                        <td className="p-2 border">{transactionId}</td>
                        <td className="px-4 py-2">
                            {(currentStatus === "Pending" || currentStatus === "Canceled") && (
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
    index: PropTypes.number.isRequired,
};

export default MySlotsTable;
