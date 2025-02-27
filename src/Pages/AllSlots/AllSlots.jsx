import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import SlotsTable from "./SlotsTable";


const AllSlots = () => {
    const { data: slots, isLoading, isError } = useQuery({
        queryKey: ["slots"],
        queryFn: async () => {
            const { data } = await axios.get("http://localhost:5000/slots");
            return data;
        },
    });

    if (isLoading) {
        return <div className="text-center py-4">Loading...</div>;
    }

    if (isError) {
        return <div className="text-center text-red-500 py-4">Error loading slots!</div>;
    }

    return (
        <div className="w-full p-4 sm:p-6 lg:p-8">
            <h2 className="text-2xl font-bold text-center mb-4 ">𝑨𝒗𝒂𝒊𝒍𝒂𝒃𝒍𝒆 𝑺𝒍𝒐𝒕𝒔</h2>

            {slots.length > 0 ? (
                <div className="w-full overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300 shadow-md text-xs sm:text-sm md:text-base ">
                        <thead>
                            <tr className="bg-gray-100 text-center  bg-gradient-to-r from-lime-400 to-lime-500 text-white">
                                <th className="border px-2 py-2">Date</th>
                                <th className="border px-2 py-2">Time</th>
                                <th className="border px-2 py-2">Time Period</th>
                                <th className="border px-2 py-2">Available Slots</th>
                                <th className="border px-2 py-2">Price</th>
                                <th className="border px-2 py-2">Advance</th>
                                <th className="border px-2 py-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {slots.map((slot) => (
                                <SlotsTable key={slot._id} slot={slot} />
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="text-center text-gray-500">No slots available</div>
            )}
        </div>
    );
};

export default AllSlots;
