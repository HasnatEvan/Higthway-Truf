import Swal from "sweetalert2";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { Link } from "react-router-dom";
import PropTypes from "prop-types"; // Import PropTypes

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
        <tr className="border-b text-center ">
            <td className="p-3 whitespace-nowrap">{time}</td>
            <td className="p-3">{timesOfDay}</td>
            <td className="p-3 whitespace-nowrap">{date}</td>
            <td className="p-3 hidden sm:table-cell">{availableSlots}</td>
            <td className="p-3 hidden md:table-cell">{price} BDT</td>
            <td className="p-3 hidden lg:table-cell">{advance} BDT</td>
            <td className="p-3 hidden lg:table-cell">{bkash} / {nogod}</td>

            <td className="p-3 space-x-2 whitespace-nowrap">
                <Link to={`/update-slots/${_id}`}>  
                    <button className="bg-gradient-to-r from-lime-600 to-lime-700 text-white px-3 py-1 rounded">
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
// PropTypes validation for `slot` and `refetch`
MySlotListTable.propTypes = {
    slot: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        time: PropTypes.string.isRequired,
        timesOfDay: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired, // Validate that `date` is a string
        availableSlots: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        advance: PropTypes.number.isRequired,
        bkash: PropTypes.string.isRequired,
        nogod: PropTypes.string.isRequired,
    }).isRequired,
    refetch: PropTypes.func.isRequired, // Ensure `refetch` is a function
};

export default MySlotListTable;
