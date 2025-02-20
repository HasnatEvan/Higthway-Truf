import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hook/useAuth";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import MySlotsTable from "./MySlotsTable";

const MySlots = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    // Fetch bookings data
    const { data: bookings = [], isLoading, refetch } = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/customers-bookings/${user?.email}`);
            return data;
        }
    });
    console.log(bookings)

    if (isLoading) {
        return <p className="text-center">Loading...</p>;
    }

    return (
        <div>
            {bookings.length > 0 ? (
                bookings.map((booking) => (
                    <MySlotsTable key={booking._id} booking={booking} />
                ))
            ) : (
                <p className="text-center text-gray-500">No bookings found.</p>
            )}
        </div>
    );
};

export default MySlots;
