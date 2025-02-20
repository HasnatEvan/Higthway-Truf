import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hook/useAuth";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import ManageSlotsTable from "./ManageSlotsTable";

const ManageSlot = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    // Fetch bookings data
    const { data: bookings = [], isLoading, refetch } = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/admin-bookings/${user?.email}`);
            return data;
        }
    });
    console.log(bookings)

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {
                bookings.map(booking => (
                    <ManageSlotsTable key={booking._id} booking={booking} />
                ))
            }
        </div>
    );
};

export default ManageSlot;
