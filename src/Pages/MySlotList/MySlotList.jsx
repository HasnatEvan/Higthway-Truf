import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import MySlotListTable from "./MySlotListTable";
import Swal from "sweetalert2";
import { FaSpinner, FaTrashAlt } from "react-icons/fa";
import { FaClock, FaCalendarAlt,  FaMoneyBillWave, FaWallet, } from "react-icons/fa";

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
         return (
             <div className="flex justify-center items-center h-screen">
                 <div className="text-center">
                     <FaSpinner className="animate-spin text-4xl text-blue-500 mx-auto mb-2" />
                     <div className="text-gray-600">Loading ...</div>
                 </div>
             </div>
         );
     }

    return (
        <div className="p-4 border-2 border-gray-300 text-gray-700 min-h-screen bg-[#fffaf2] ">
            <h2 className="text-3xl font-bold text-center mb-2">My Slots List</h2>

            {/* Table View for Desktop */}
            <div className="overflow-x-auto hidden sm:block">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr className="border-gray-300 bg-[#fcf7ee] shadow-md whitespace-nowrap text-black">
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

            {/* Card View for Mobile */}
            <div className="sm:hidden space-y-4">
    {slots.map((slot) => (
        <div key={slot._id} className="bg-[#fcf7ee] border border-gray-200 rounded-xl p-4 shadow space-y-2">
            <div className="flex justify-between items-center text-sm text-gray-700">
                <span className="flex items-center gap-2"><FaClock className="text-orange-500" /> Time</span>
                <span>{slot.time}</span>
            </div>

            <div className="flex justify-between items-center text-sm text-gray-700">
                <span className="flex items-center gap-2"><FaCalendarAlt className="text-blue-500" /> Date</span>
                <span>{slot.date}</span>
            </div>

            <div className="flex justify-between items-center text-sm text-gray-700">
                <span className="flex items-center gap-2"><FaClock className="text-purple-500" /> Times of Day</span>
                <span>{slot.timesOfDay}</span>
            </div>

            <div className="flex justify-between items-center text-sm text-gray-700">
                <span className="flex items-center gap-2"><FaMoneyBillWave className="text-yellow-500" /> Price</span>
                <span>{slot.price} BDT</span>
            </div>

            <div className="flex justify-between items-center text-sm text-gray-700">
                <span className="flex items-center gap-2"><FaWallet className="text-pink-500" /> Advance</span>
                <span>{slot.advance} BDT</span>
            </div>

            <div className="flex justify-between items-center text-sm text-gray-700">
                <span className="font-semibold">Payment</span>
                <span className="text-xs text-gray-600">{slot.bkash} / {slot.nogod}</span>
            </div>

            <button
                onClick={async () => {
                    const result = await Swal.fire({
                        title: 'Are you sure?',
                        text: `You won't be able to revert this!`,
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#d33',
                        cancelButtonColor: '#3085d6',
                        confirmButtonText: 'Yes, delete it!',
                    });

                    if (result.isConfirmed) {
                        try {
                            await axiosSecure.delete(`/slots/${slot._id}`);
                            refetch();
                            Swal.fire('Deleted!', 'Your item has been deleted.', 'success');
                        } catch (error) {
                            console.error('Error deleting item:', error);
                            Swal.fire('Error!', 'Something went wrong!', 'error');
                        }
                    }
                }}
                className="bg-red-500 text-white px-4 py-2 mt-3 rounded hover:bg-red-600 flex items-center justify-center gap-2"
            >
                <FaTrashAlt /> 
            </button>
        </div>
    ))}
</div>
        </div>
    );
};

export default MySlotList;
