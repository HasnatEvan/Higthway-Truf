import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hook/useAuth";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import ManageSlotsTable from "./ManageSlotsTable";
import { useRef, useState } from "react";

const ManageSlot = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const tableRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [searchDate, setSearchDate] = useState("");
    const [searchEmail, setSearchEmail] = useState(""); // ✅ Customer Email state

    // Fetch bookings data
    const { data: bookings = [], refetch } = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/admin-bookings/${user?.email}`);
            return data.reverse(); // Showing the latest order first
        }
    });

    // Filter bookings by date & customer email
    const filteredBookings = bookings.filter(booking =>
        (searchDate ? booking.date?.includes(searchDate) : true) &&
        (searchEmail ? booking.customer?.email?.toLowerCase().includes(searchEmail.toLowerCase()) : true)
    );

    // Mouse Dragging Functions
    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - tableRef.current.offsetLeft);
        setScrollLeft(tableRef.current.scrollLeft);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - tableRef.current.offsetLeft;
        const walk = (x - startX) * 2; // Speed factor
        tableRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    return (
        <div className="p-4 bg-white text-gray-700">
            <h1 className="text-2xl md:text-3xl font-semibold text-center mb-4">𝑴𝒂𝒏𝒂𝒈𝒆 𝑺𝒍𝒐𝒕𝒔</h1>
            
            {/* Search Bar */}
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

            {/* Table */}
            <div
                className="overflow-x-auto cursor-grab active:cursor-grabbing"
                ref={tableRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >
                <table className="w-full min-w-[800px] bg-white border border-gray-300 rounded-lg shadow-md">
                    <thead>
                        <tr className="bg-gradient-to-r from-lime-400 to-lime-500 text-white text-xs md:text-sm">
                            <th className="p-2 md:p-3 border">#</th>
                            <th className="p-2 md:p-3 border">Customer</th>
                            <th className="p-2 md:p-3 border">Customer Email</th>
                            <th className="p-2 md:p-3 border">Name</th>
                            <th className="p-2 md:p-3 border">Phone</th>
                            <th className="p-2 md:p-3 border">Slot Date</th>
                            <th className="p-2 md:p-3 border">Time</th>
                            <th className="p-2 md:p-3 border">Price</th>
                            <th className="p-2 md:p-3 border">Payment Method</th>
                            <th className="p-2 md:p-3 border">Transaction ID</th>
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
        </div>
    );
};

export default ManageSlot;
