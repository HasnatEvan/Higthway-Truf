import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import SlotsTable from "./SlotsTable";
import {  FaSpinner } from "react-icons/fa"; 

const AllSlots = () => {
    const { data: slots, isLoading, isError } = useQuery({
        queryKey: ["slots"],
        queryFn: async () => {
            const { data } = await axios.get("https://highway-turf-server.vercel.app/slots");
            return data;
        },
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
    
    
    if (isError) {
        return <div className="text-center text-red-500 py-4">Error loading slots!</div>;
    }

    return (
        <div className="w-full p-4 sm:p-6 lg:p-8 bg-[#fffaf2] text-gray-700 border-2 border-gray-300 s   min-h-screen   ">
            <h2 className="text-2xl font-bold text-center mb-4 lg:-mt-6">Available Slots</h2>

            {slots.length > 0 ? (
                <div className="w-full">
                    {/* Mobile: Card view */}
                    <div className="grid gap-4 sm:hidden">
                        {slots.map((slot) => (
                            <SlotsTable key={slot._id} slot={slot} isCardView={true} />
                        ))}
                    </div>

                    {/* Desktop: Table view */}
                    <div className="hidden sm:block overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-300 shadow-md text-sm md:text-base">
                            <thead>
                                <tr className="text-center text-black  border-gray-300 bg-[#fcf7ee] shadow-md">
                                    <th className="border px-2 py-2">Date</th>
                                    <th className="border px-2 py-2">Time</th>
                                    <th className="border px-2 py-2">Time Period</th>
                                    <th className="border px-2 py-2">Price</th>
                                    <th className="border px-2 py-2">Advance</th>
                                    <th className="border px-2 py-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {slots.map((slot) => (
                                    <SlotsTable key={slot._id} slot={slot} isCardView={false} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="text-center text-gray-500">No slots available</div>
            )}
        </div>
    );
};

export default AllSlots;
