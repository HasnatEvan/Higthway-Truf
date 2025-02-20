import Swal from "sweetalert2";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { Link } from "react-router-dom";

const MySlotListTable = ({ slot, refetch }) => {
    const { 
        _id,
        time, 
        timesOfDay, 
        date, 
        availableSlots, 
        price, 
        advance, 
        description, 
        bkash, 
        nogod 
    } = slot;
    const axiosSecure = useAxiosSecure();

    const handleDelete = async () => {
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
                await axiosSecure.delete(`/slots/${_id}`);
                refetch(); // ✅ ডাটা রিফ্রেশ হবে
                Swal.fire('Deleted!', 'Your item has been deleted.', 'success');
            } catch (error) {
                console.error('Error deleting item:', error);
                Swal.fire('Error!', 'Something went wrong!', 'error');
            }
        }
    };

    return (
        <tr className="border-b text-center">
            <td className="p-3">{time}</td>
            <td className="p-3">{timesOfDay}</td>
            <td className="p-3">{date}</td>
            <td className="p-3">{availableSlots}</td>
            <td className="p-3">{price} BDT</td>
            <td className="p-3">{advance} BDT</td>
            <td className="p-3">{bkash} / {nogod}</td>
            <td className="p-3">{description}</td>
            <td className="p-3 space-x-2">
                <Link to={`/update-slots/${_id}`}>  
                <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                    Update
                </button>
                </Link>
                <button 
                    onClick={handleDelete}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                    Delete
                </button>
            </td>
        </tr>
    );
};

export default MySlotListTable;
