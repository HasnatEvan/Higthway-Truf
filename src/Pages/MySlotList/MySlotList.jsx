import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import MySlotListTable from "./MySlotListTable";

const MySlotList = () => {
    const axiosSecure = useAxiosSecure();

    // Set Page Title
    useEffect(() => {
        document.title = "My Slots List | Admin Dashboard";
    }, []);

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
        <div className="p-4">
            <h2 className="text-3xl font-bold text-center  mb-2 ">𝑴𝒚 𝑺𝒍𝒐𝒕𝒔 𝑳𝒊𝒔𝒕</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200 whitespace-nowrap bg-gradient-to-r from-lime-400 to-lime-500 text-white">
                            <th className="p-3">Time</th>
                            <th className="p-3">TimesOfDay</th>
                            <th className="p-3">Date</th>
                            <th className="p-3 hidden sm:table-cell">Available</th>
                            <th className="p-3 hidden md:table-cell">Price</th>
                            <th className="p-3 hidden lg:table-cell">Advance</th>
                            <th className="p-3 hidden lg:table-cell">Payment</th>
                            <th className="p-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {slots.map((slot) => (
                            <MySlotListTable 
                                key={slot._id} 
                                slot={slot} 
                                refetch={refetch} 
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MySlotList;
