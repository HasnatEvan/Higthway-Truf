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

    // লোডিং মেসেজ
    if (isLoading) {
        return <div className="text-center py-4">Loading...</div>;
    }

    // এরর মেসেজ
    if (isError) {
        return <div className="text-center text-red-500 py-4">Error loading slots!</div>;
    }

    return (
        <div className="max-w-5xl mx-auto p-4">
            <h2 className="text-2xl font-bold text-center mb-4">Available Slots</h2>
            {slots.length > 0 ? (
                <table className="w-full border-collapse border border-gray-300 shadow-md">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-2">Date</th>
                            <th className="border p-2">Time</th>
                            <th className="border p-2">Time Period</th>
                            <th className="border p-2">Available Slots</th>
                            <th className="border p-2">Price ($)</th>
                            <th className="border p-2">Advance ($)</th>
                            <th className="border p-2">Description</th>
                            <th className="border p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {slots.map((slot) => (
                            <SlotsTable key={slot.id} slot={slot} />
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="text-center text-gray-500">No slots available</div>
            )}
        </div>
    );
};

export default AllSlots;