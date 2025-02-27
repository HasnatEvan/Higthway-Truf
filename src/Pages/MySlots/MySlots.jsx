import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import useAuth from "../../Hook/useAuth";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import MySlotsTable from "./MySlotsTable";

const MySlots = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    // Fetch bookings data
    const { data: bookings = [] } = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/customers-bookings/${user?.email}`);
            return data;
        }
    });

    useEffect(() => {
        document.title = "My Bookings | Highway-Turf"; // Set the title
    }, []);

    return (
        <div>
            <h1 className="text-3xl font-semibold text-center mb-6 ">𝑴𝒚 𝑩𝒐𝒐𝒌𝒊𝒏𝒈𝒔</h1> {/* Added title */}

            {bookings.length > 0 ? (
                bookings.map((booking, index) => (
                    <MySlotsTable key={booking._id} booking={booking} index={index + 1} />
                ))
            ) : (
                <p className="text-center text-gray-500">No bookings found.</p>
            )}
        </div>
    );
};

export default MySlots;
