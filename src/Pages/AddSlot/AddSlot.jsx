import Swal from "sweetalert2";
import useAuth from "../../Hook/useAuth";
import useAxiosSecure from "../../Hook/useAxiosSecure";

const AddSlot = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const date = form.date.value;
        const time = form.time.value;
        const timesOfDay = form.timesOfDay.value;
        const availableSlots = form.availableSlots.value;
        const price = form.price.value;
        const advance = form.advance.value;
        const bkash = form.bkash.value;
        const nogod = form.nogod.value;
        const description = form.description.value;

        const slotOwner = {
            name: user?.displayName,
            image: user?.photoURL,
            email: user?.email,
        };

        const slotData = {
            date,
            time,
            timesOfDay,
            availableSlots: parseInt(availableSlots),
            price: parseFloat(price),
            advance: parseFloat(advance),
            bkash,
            nogod,
            description,
            slotOwner
        };

        try {
            // Save to Database
            await axiosSecure.post('/slots', slotData);

            // Show success message
            Swal.fire({
                title: 'Success!',
                text: 'Slot added successfully!',
                icon: 'success',
                confirmButtonText: 'OK'
            });

            // Optionally, you can clear the form here if needed
            form.reset();
        } catch {
            // Show error message
            Swal.fire({
                title: 'Error!',
                text: 'Failed to add slot. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold text-center mb-6">Add Slot</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Date</label>
                        <input
                            type="date"
                            name="date"
                            className="w-full p-2 border rounded mt-1"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Time</label>
                        <select name="time" className="w-full p-2 border rounded mt-1" required>
                            <option value="">Select Time</option>
                            <option value="12:00 AM - 1:00 AM">12:00 AM - 1:00 AM (Night)</option>
                            <option value="1:00 AM - 2:00 AM">1:00 AM - 2:00 AM (Night)</option>
                            <option value="2:00 AM - 3:00 AM">2:00 AM - 3:00 AM (Night)</option>
                            <option value="3:00 AM - 4:00 AM">3:00 AM - 4:00 AM (Night)</option>
                            <option value="4:00 AM - 5:00 AM">4:00 AM - 5:00 AM (Night)</option>
                            <option value="5:00 AM - 6:00 AM">5:00 AM - 6:00 AM (Morning)</option>
                            <option value="6:00 AM - 7:00 AM">6:00 AM - 7:00 AM (Morning)</option>
                            <option value="7:00 AM - 8:00 AM">7:00 AM - 8:00 AM (Morning)</option>
                            <option value="8:00 AM - 9:00 AM">8:00 AM - 9:00 AM (Morning)</option>
                            <option value="9:00 AM - 10:00 AM">9:00 AM - 10:00 AM (Morning)</option>
                            <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM (Noon)</option>
                            <option value="11:00 AM - 12:00 PM">11:00 AM - 12:00 PM (Noon)</option>
                            <option value="12:00 PM - 1:00 PM">12:00 PM - 1:00 PM (Noon)</option>
                            <option value="1:00 PM - 2:00 PM">1:00 PM - 2:00 PM (Noon)</option>
                            <option value="2:00 PM - 3:00 PM">2:00 PM - 3:00 PM (Evening)</option>
                            <option value="3:00 PM - 4:00 PM">3:00 PM - 4:00 PM (Evening)</option>
                            <option value="4:00 PM - 5:00 PM">4:00 PM - 5:00 PM (Evening)</option>
                            <option value="5:00 PM - 6:00 PM">5:00 PM - 6:00 PM (Evening)</option>
                            <option value="6:00 PM - 7:00 PM">6:00 PM - 7:00 PM (Evening)</option>
                            <option value="7:00 PM - 8:00 PM">7:00 PM - 8:00 PM (Night)</option>
                            <option value="8:00 PM - 9:00 PM">8:00 PM - 9:00 PM (Night)</option>
                            <option value="9:00 PM - 10:00 PM">9:00 PM - 10:00 PM (Night)</option>
                            <option value="10:00 PM - 11:00 PM">10:00 PM - 11:00 PM (Night)</option>
                            <option value="11:00 PM - 12:00 AM">11:00 PM - 12:00 AM (Night)</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Select Time Period</label>
                        <select name="timesOfDay" className="w-full p-2 border rounded mt-1" required>
                            <option value="">Select Time Period</option>
                            <option value="Morning">Morning</option>
                            <option value="Afternoon">Afternoon</option>
                            <option value="Evening">Evening</option>
                            <option value="Night">Night</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Available Slots</label>
                        <input
                            type="number"
                            name="availableSlots"
                            className="w-full p-2 border rounded mt-1"
                            placeholder="Enter number of slots"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Price</label>
                        <input
                            type="number"
                            name="price"
                            className="w-full p-2 border rounded mt-1"
                            placeholder="Enter price"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Advance for Booking</label>
                        <input
                            type="number"
                            name="advance"
                            className="w-full p-2 border rounded mt-1"
                            placeholder="Enter advance price"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Nogod Number</label>
                        <input type="text" name="nogod" className="w-full p-2 border rounded mt-1" placeholder="Enter Nogod Number" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Bkash Number</label>
                        <input type="text" name="bkash" className="w-full p-2 border rounded mt-1" placeholder="Enter Bkash Number" required />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Description</label>
                        <textarea
                            name="description"
                            className="w-full p-2 border rounded mt-1"
                            placeholder="Enter a brief description"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    >
                        Add Slot
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddSlot;
