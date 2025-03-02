import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import PropTypes from 'prop-types'


const ManageSlotsTable = ({ booking, serial, refetch }) => {
    const { _id, customer, name, phone, date, paymentMethod, price, time, timesOfDay, transactionId, slotsId } = booking;
    const axiosSecure = useAxiosSecure();

    // Local state for status
    const [currentStatus, setCurrentStatus] = useState(booking.status);

    // Handle status change
    const handleStatusChange = async (newStatus) => {
        setCurrentStatus(newStatus);
        try {
            const response = await axiosSecure.patch(`/update-bookings-status/${_id}`, { status: newStatus });

            if (response.data.success) {
                Swal.fire("Success!", "Booking status updated successfully!", "success");
                refetch();  // Refresh data
            } else {
                Swal.fire("Error!", response.data.message || "Failed to update status", "error");
            }
        } catch {
            Swal.fire("Error!", "Something went wrong. Try again!", "error");
        }
    };

    // Handle cancel booking
    const handleCancelBooking = async () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, cancel it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axiosSecure.delete(`/bookings/${_id}`);

                    await axiosSecure.patch(`/bookings/availableSlots/${slotsId}`, {
                        availableSlotsToUpdate: 1,
                        status: 'increase'
                    });

                    if (response.data.deletedCount > 0) {
                        Swal.fire("Cancelled!", "Your booking has been cancelled.", "success");
                        refetch();
                    }
                } catch {
                    Swal.fire("Error!", "Failed to cancel booking. Try again!", "error");
                }
            }
        });
    };

    return (
        <tr className="text-center whitespace-nowrap text-xs md:text-sm">
            <td className="p-2 md:p-4 border">{serial}</td>
            <td className="p-2 md:p-4 flex items-center justify-start space-x-2">
                <img src={customer?.image} alt="Customer" className="w-8 h-8 md:w-12 md:h-12 rounded-full" />
                <span className="hidden md:inline">{name}</span>
            </td>
            <td className="p-2 md:p-4 border">{customer?.email}</td>
            <td className="p-2 md:p-4 border">{customer?.name}</td>
            <td className="p-2 md:p-4 border">{phone}</td>
            <td className="p-2 md:p-4 border">{date}</td>
            <td className="p-2 md:p-4 border">{time} ({timesOfDay})</td>
            <td className="p-2 md:p-4 border">{price}</td>
            <td className="p-2 md:p-4 border">{paymentMethod}</td>
            <td className="p-2 md:p-4 border text-red-500">{transactionId}</td>
            <td className="p-2 md:p-4 border">
                <select
                    className={`p-2 rounded-md text-xs md:text-sm 
                        ${currentStatus === "Pending" ? "bg-yellow-300 text-black"
                            : currentStatus === "Processing" ? "bg-blue-300 text-black"
                                : currentStatus === "Confirm" ? "bg-green-300 text-black"
                                    : "bg-red-300 text-white"}`}
                    value={currentStatus}
                    onChange={(e) => handleStatusChange(e.target.value)}
                >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Start Processing</option>
                    <option value="Confirm">Confirm</option>
                    <option value="Canceled">Canceled</option>
                </select>
            </td>
            <td className="p-2 md:p-4 border text-center">
                <button
                    onClick={handleCancelBooking}
                    className={`w-full p-2 md:p-4 rounded-md text-white text-xs md:text-sm 
            ${currentStatus === "Pending" || currentStatus === "Canceled"
                            ? "bg-red-500 hover:bg-red-600"
                            : "bg-gray-400 cursor-not-allowed"}`}
                    disabled={!(currentStatus === "Pending" || currentStatus === "Canceled")}
                >
                    Cancel
                </button>
            </td>

        </tr>
    );
};
ManageSlotsTable.propTypes = {
    booking: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        customer: PropTypes.shape({
            image: PropTypes.string,
            email: PropTypes.string,
            name: PropTypes.string,
        }).isRequired,
        email: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        paymentMethod: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        time: PropTypes.string.isRequired,
        timesOfDay: PropTypes.string.isRequired,
        transactionId: PropTypes.string.isRequired,
        slotsId: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
    }).isRequired,
    serial: PropTypes.number.isRequired,
    refetch: PropTypes.func.isRequired,
};


export default ManageSlotsTable;
