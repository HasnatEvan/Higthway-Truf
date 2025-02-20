import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import MySlotListTable from "./MySlotListTable";

const MySlotList = () => {
    const axiosSecure = useAxiosSecure();
    
    const { data: slots = [], isLoading, refetch } = useQuery({
        queryKey: ['slots'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/slots/admin');
            return data;
        }
    });

    if (isLoading) {
        return <p className="text-center text-lg font-semibold">Loading...</p>;
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-3">Time</th>
                        <th className="p-3">TimesOfDay</th>
                        <th className="p-3">Date</th>
                        <th className="p-3">Available</th>
                        <th className="p-3">Price</th>
                        <th className="p-3">Advance</th>
                        <th className="p-3">Payment</th>
                        <th className="p-3">Description</th>
                        <th className="p-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {slots.map((slot) => (
                        <MySlotListTable 
                            key={slot._id} 
                            slot={slot} 
                            refetch={refetch} // ✅ রিফ্রেশ ফাংশন পাঠানো হলো
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MySlotList;
