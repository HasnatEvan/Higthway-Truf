import Swal from "sweetalert2";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import PropTypes from "prop-types";
import { FaTrashAlt } from "react-icons/fa";

const MySlotListTable = ({ slot, refetch }) => {
    const { 
        _id,
        time, 
        timesOfDay, 
        date, 
        availableSlots, 
        price, 
        advance,
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
                refetch(); 
                Swal.fire('Deleted!', 'Your item has been deleted.', 'success');
            } catch (error) {
                console.error('Error deleting item:', error);
                Swal.fire('Error!', 'Something went wrong!', 'error');
            }
        }
    };

    return (
        <tr className="border-b text-center bg-[#fffaf2]">
            <td className="p-3 whitespace-nowrap">{time}</td>
            <td className="p-3">{timesOfDay}</td>
            <td className="p-3 whitespace-nowrap">{date}</td>
            <td className="p-3 hidden sm:table-cell">{availableSlots}</td>
            <td className="p-3 hidden md:table-cell">{price} BDT</td>
            <td className="p-3 hidden lg:table-cell">{advance} BDT</td>
            <td className="p-3 hidden lg:table-cell">{bkash} / {nogod}</td>
            <td className="p-3 whitespace-nowrap">
                <button 
                    onClick={handleDelete}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 flex items-center gap-1 mx-auto"
                >
                    <FaTrashAlt className="text-white" /> 
                </button>
            </td>
        </tr>
    );
};

MySlotListTable.propTypes = {
    slot: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        time: PropTypes.string.isRequired,
        timesOfDay: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        availableSlots: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        advance: PropTypes.number.isRequired,
        bkash: PropTypes.string.isRequired,
        nogod: PropTypes.string.isRequired,
    }).isRequired,
    refetch: PropTypes.func.isRequired,
};

export default MySlotListTable;
