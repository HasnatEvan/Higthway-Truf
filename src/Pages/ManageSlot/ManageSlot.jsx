import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hook/useAuth";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import ManageSlotsTable from "./ManageSlotsTable";

const ManageSlot = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    // Fetch bookings data
    const { data: bookings = [],  refetch } = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/admin-bookings/${user?.email}`);
            return data.reverse();  // Showing the latest order first
        }
    });

  

    return (
        <div>
            <h1 className="text-3xl font-semibold text-center mb-2 ">𝑴𝒂𝒏𝒂𝒈𝒆 𝑺𝒍𝒐𝒕𝒔</h1> {/* Added title */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                    <thead>
                        <tr className="bg-gray-200 bg-gradient-to-r from-lime-400 to-lime-500 text-white text-xs md:text-sm">
                            <th className="p-2 md:p-4 border">#</th>
                            <th className="p-2 md:p-4 border">Customer</th>
                            <th className="p-2 md:p-4 border">Email</th>
                            <th className="p-2 md:p-4 border">Name</th>
                            <th className="p-2 md:p-4 border">Phone</th>
                            <th className="p-2 md:p-4 border">Slot Date</th>
                            <th className="p-2 md:p-4 border">Time</th>
                            <th className="p-2 md:p-4 border">Price</th>
                            <th className="p-2 md:p-4 border">Payment Method</th>
                            <th className="p-2 md:p-4 border">Transaction ID</th>
                            <th className="p-2 md:p-4 border">Status</th>
                            <th className="p-2 md:p-4 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking, index) => (
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
