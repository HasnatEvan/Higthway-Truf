import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hook/useAxiosSecure";

const ManageSlotsTable = ({ booking, refetch }) => {
    const { _id, customer, email, image, name, date, paymentMethod, phone, price, time, timesOfDay, transactionId, slotsId } = booking;
    const axiosSecure = useAxiosSecure();

    // Status update local state
    const [currentStatus, setCurrentStatus] = useState(booking.status);

    // Handle status change and update via API
    const handleStatusChange = async (newStatus) => {
        setCurrentStatus(newStatus);

        try {
            const response = await axiosSecure.patch(`/update-bookings-status/${_id}`, { status: newStatus });

            if (response.data.success) {
                Swal.fire("Success!", "Booking status updated successfully!", "success");
            } else {
                Swal.fire("Error!", response.data.message || "Failed to update status", "error");
            }
        } catch (error) {
            console.error("Error updating status:", error);
            Swal.fire("Error!", "Something went wrong. Try again!", "error");
        }
    };

    // Handle booking cancellation (works for "Pending" and "Canceled" statuses)
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
                    // Delete booking
                    const response = await axiosSecure.delete(`/bookings/${_id}`);

                    // Update available slots
                    await axiosSecure.patch(`/bookings/availableSlots/${slotsId}`, {
                        availableSlotsToUpdate: 1,
                        status: 'increase'
                    });

                    if (response.data.deletedCount > 0) {
                        Swal.fire("Cancelled!", "Your booking has been cancelled.", "success");

                        // ✅ Refresh table after deletion
                        if (typeof refetch === "function") {
                            refetch();
                        }
                    }
                } catch (error) {
                    Swal.fire("Error!", "Failed to cancel booking. Try again!", "error");
                }
            }
        });
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                <thead>
                    <tr className="bg-gray-200 text-gray-700">
                        <th className="p-3 border">Customer</th>
                        <th className="p-3 border">Email</th>
                        <th className="p-3 border">Name</th>
                        <th className="p-3 border">Phone</th>
                        <th className="p-3 border">Slot Date</th>
                        <th className="p-3 border">Time</th>
                        <th className="p-3 border">Price</th>
                        <th className="p-3 border">Payment Method</th>
                        <th className="p-3 border">Transaction ID</th>
                        <th className="p-3 border">Status</th>
                        <th className="p-3 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="text-center">
                        <td className="p-3 border flex items-center space-x-2">
                            <img src={customer?.image} alt="Customer" className="w-10 h-10 rounded-full" />
                            <span>{name}</span>
                        </td>
                        <td className="p-3 border">{customer?.email}</td>
                        <td className="p-3 border">{customer?.name}</td>
                        <td className="p-3 border">{phone}</td>
                        <td className="p-3 border">{date}</td>
                        <td className="p-3 border">{time} ({timesOfDay})</td>
                        <td className="p-3 border">${price}</td>
                        <td className="p-3 border">{paymentMethod}</td>
                        <td className="p-3 border">{transactionId}</td>
                        <td className="p-3 border">
                            <select
                                className={`p-2 rounded 
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
                        <td className="p-3 border flex justify-center space-x-2">
                            <button 
                                onClick={handleCancelBooking} 
                                className={`px-3 py-1 rounded text-white 
                                    ${currentStatus === "Pending" || currentStatus === "Canceled" 
                                        ? "bg-red-500 hover:bg-red-600" 
                                        : "bg-gray-400 cursor-not-allowed"}`}
                                disabled={!(currentStatus === "Pending" || currentStatus === "Canceled")}  // Enable for Pending and Canceled
                            >
                                Cancel
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default ManageSlotsTable;
