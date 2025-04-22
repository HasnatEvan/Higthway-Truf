import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hook/useAuth";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import ManageSlotsTable from "./ManageSlotsTable";
import { useRef, useState } from "react";
import Swal from "sweetalert2";
import { FaPhoneAlt, FaCalendarAlt, FaClock, FaMoneyBillAlt, FaCreditCard, FaHashtag, FaSpinner } from "react-icons/fa";
import { MdEmail, MdPerson } from "react-icons/md";
const ManageSlot = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const tableRef = useRef(null);

    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [searchDate, setSearchDate] = useState("");
    const [searchEmail, setSearchEmail] = useState("");

    const { data: bookings = [], isLoading, refetch } = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/admin-bookings/${user?.email}`);
            return data.reverse();
        }
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-center">
                    <FaSpinner className="animate-spin text-4xl text-blue-500 mx-auto mb-2" />
                    <div className="text-gray-600">Loading ...</div>
                </div>
            </div>
        );
    }

    const filteredBookings = bookings.filter(booking =>
        (searchDate ? booking.date?.includes(searchDate) : true) &&
        (searchEmail ? booking.customer?.email?.toLowerCase().includes(searchEmail.toLowerCase()) : true)
    );

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - tableRef.current.offsetLeft);
        setScrollLeft(tableRef.current.scrollLeft);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - tableRef.current.offsetLeft;
        const walk = (x - startX) * 2;
        tableRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUp = () => setIsDragging(false);

    return (
        <div className="p-4 bg-[#fffaf2] text-gray-700 min-h-screen">
            <h1 className="text-2xl md:text-3xl font-semibold text-center mb-4">Mange Slots</h1>

            <div className="mb-4 flex flex-col sm:flex-row gap-4">
                <input
                    type="date"
                    className="border p-2 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300 w-full sm:w-auto"
                    value={searchDate}
                    onChange={(e) => setSearchDate(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Search by Customer Email"
                    className="border p-2 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300 w-full sm:w-auto"
                    value={searchEmail}
                    onChange={(e) => setSearchEmail(e.target.value)}
                />
            </div>

            {/* Desktop Table View */}
            <div
                className="cursor-grab active:cursor-grabbing hidden sm:block"
                ref={tableRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >
                <table className="w-full min-w-[800px] bg-[#fffaf2] border border-gray-300 rounded-lg shadow-md">
                    <thead>
                        <tr className="bg-[#fffaf2] text-xs md:text-sm">
                            <th className="p-2 md:p-3 border">#</th>
                            <th className="p-2 md:p-3 border">Customer</th>
                            <th className="p-2 md:p-3 border">Email</th>
                            <th className="p-2 md:p-3 border">Phone</th>
                            <th className="p-2 md:p-3 border">Date</th>
                            <th className="p-2 md:p-3 border">Time</th>
                            <th className="p-2 md:p-3 border">Price</th>
                            <th className="p-2 md:p-3 border">Payment</th>
                            <th className="p-2 md:p-3 border">Transaction</th>
                            <th className="p-2 md:p-3 border">Status</th>
                            <th className="p-2 md:p-3 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredBookings.map((booking, index) => (
                            <ManageSlotsTable
                                key={booking._id}
                                booking={booking}
                                serial={index + 1}
                                refetch={refetch}
                            />
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Card View */}
            <div className="block sm:hidden space-y-4">
                {filteredBookings.map((booking) => (
                    <div key={booking._id} className="bg-[#fcf7ee] border border-[#f1e3c6] rounded-lg shadow p-4 text-sm">
                        <div className="flex items-center gap-2 mb-3">
                            <img src={booking.customer?.image} alt="Customer" className="w-10 h-10 rounded-full" />
                            <div>
                                <p className="font-medium flex items-center gap-1">
                                    <MdPerson className="text-purple-500" />
                                    {booking.customer?.name}
                                </p>
                                <p className="text-gray-500 text-xs flex items-center gap-1">
                                    <MdEmail className="text-blue-500" />
                                    {booking.customer?.email}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <div className="flex justify-between items-center">
                                <span className="flex items-center gap-1 font-medium">
                                    <FaPhoneAlt className="text-green-600" /> Phone:
                                </span>
                                {booking.phone}
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="flex items-center gap-1 font-medium">
                                    <FaCalendarAlt className="text-indigo-600" /> Date:
                                </span>
                                {booking.date}
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="flex items-center gap-1 font-medium">
                                    <FaClock className="text-orange-500" /> Time:
                                </span>
                                {booking.time} ({booking.timesOfDay})
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="flex items-center gap-1 font-medium">
                                    <FaMoneyBillAlt className="text-emerald-600" /> Price:
                                </span>
                                {booking.price}
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="flex items-center gap-1 font-medium">
                                    <FaCreditCard className="text-blue-600" /> Payment:
                                </span>
                                {booking.paymentMethod}
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="flex items-center gap-1 font-medium">
                                    <FaHashtag className="text-red-500" /> Transaction:
                                </span>
                                <span className="text-red-500">{booking.transactionId}</span>
                            </div>
                        </div>

                        <div className="mt-3">
                            <label className="block mb-1 text-xs font-semibold">Status</label>
                            <select
                                className={`w-full p-2 rounded-md text-xs font-medium
                        ${booking.status === "Pending" ? "bg-yellow-100 text-yellow-800"
                                        : booking.status === "Processing" ? "bg-blue-100 text-blue-800"
                                            : booking.status === "Confirm" ? "bg-green-100 text-green-800"
                                                : "bg-red-100 text-red-800"
                                    }`}
                                value={booking.status}
                                onChange={(e) => {
                                    const newStatus = e.target.value;
                                    axiosSecure.patch(`/update-bookings-status/${booking._id}`, { status: newStatus })
                                        .then(res => {
                                            if (res.data.success) {
                                                Swal.fire("Success", "Booking updated", "success");
                                                refetch();
                                            }
                                        });
                                }}
                            >
                                <option value="Pending">⏳ Pending</option>
                                <option value="Processing">🔧 Processing</option>
                                <option value="Confirm">✅ Confirmed</option>
                                <option value="Canceled">❌ Canceled</option>
                            </select>
                        </div>

                        <button
                            className={`mt-3 w-full p-2 rounded-md text-white ${booking.status === "Pending" || booking.status === "Canceled"
                                ? "bg-red-500 hover:bg-red-600"
                                : "bg-gray-400 cursor-not-allowed"
                                }`}
                            disabled={!(booking.status === "Pending" || booking.status === "Canceled")}
                            onClick={async () => {
                                const result = await Swal.fire({
                                    title: "Are you sure?",
                                    text: "You won't be able to revert this!",
                                    icon: "warning",
                                    showCancelButton: true,
                                    confirmButtonColor: "#d33",
                                    cancelButtonColor: "#3085d6",
                                    confirmButtonText: "Yes, cancel it!"
                                });

                                if (result.isConfirmed) {
                                    try {
                                        const res = await axiosSecure.delete(`/bookings/${booking._id}`);
                                        await axiosSecure.patch(`/bookings/availableSlots/${booking.slotsId}`, {
                                            availableSlotsToUpdate: 1,
                                            status: 'increase'
                                        });
                                        if (res.data.deletedCount > 0) {
                                            Swal.fire("Cancelled!", "Your booking has been cancelled.", "success");
                                            refetch();
                                        }
                                    } catch {
                                        Swal.fire("Error!", "Failed to cancel booking. Try again!", "error");
                                    }
                                }
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                ))}
            </div>


        </div>
    );
};

export default ManageSlot;
