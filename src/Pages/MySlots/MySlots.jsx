import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { FaSpinner } from "react-icons/fa"; // 🔁 Spinner Icon
import useAuth from "../../Hook/useAuth";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import MySlotsTable from "./MySlotsTable";

const MySlots = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: bookings = [], isLoading } = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/customers-bookings/${user?.email}`);
            return data;
        },
        enabled: !!user?.email, // Wait until email is available
    });

    useEffect(() => {
        document.title = "My Bookings | Highway-Turf";
    }, []);

    // 🔁 Show loading spinner while data is fetching
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-center">
                    <FaSpinner className="animate-spin text-4xl text-blue-500 mx-auto mb-2" />
                    <div className="text-gray-600">Loading your bookings...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#fffaf2] text-black p-4 min-h-screen border-b border-gray-200">
            <h1 className="text-3xl font-semibold text-center mb-6">My Bookings</h1>

            {bookings.length > 0 ? (
                <>
                    {/* 👉 Desktop Table View */}
                    <div className="overflow-x-auto hidden md:block">
                        <table className="min-w-full border border-gray-300 bg-[#fcf7ee] shadow-md">
                            <thead>
                                <tr className="bg-[#fcf7ee] text-black whitespace-nowrap">
                                    <th className="p-2 border text-xs sm:text-sm md:text-base">#</th>
                                    <th className="p-2 border text-xs sm:text-sm md:text-base">Date</th>
                                    <th className="p-2 border text-xs sm:text-sm md:text-base">Payment Method</th>
                                    <th className="p-2 border text-xs sm:text-sm md:text-base">Phone</th>
                                    <th className="p-2 border text-xs sm:text-sm md:text-base">Price</th>
                                    <th className="p-2 border text-xs sm:text-sm md:text-base">Status</th>
                                    <th className="p-2 border text-xs sm:text-sm md:text-base">Time</th>
                                    <th className="p-2 border text-xs sm:text-sm md:text-base">Times of Day</th>
                                    <th className="p-2 border text-xs sm:text-sm md:text-base">Transaction ID</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map((booking, index) => (
                                    <MySlotsTable
                                        key={booking._id}
                                        booking={booking}
                                        index={index + 1}
                                        view="table"
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* 👉 Mobile Card View */}
                    <div className="md:hidden space-y-4">
                        {bookings.map((booking, index) => (
                            <MySlotsTable
                                key={booking._id}
                                booking={booking}
                                index={index + 1}
                                view="card"
                            />
                        ))}
                    </div>
                </>
            ) : (
                <p className="text-center text-gray-500">No bookings found.</p>
            )}
        </div>
    );
};

export default MySlots;
