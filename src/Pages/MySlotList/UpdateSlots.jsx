import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import Swal from "sweetalert2";

const UpdateSlots = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const [slotData, setSlotData] = useState({
        date: "",
        time: "",
        timesOfDay: "",
        availableSlots: "",
        price: "",
        advance: "",
        nogod: "",
        bkash: "",
        description: "",
    });

    // 🔹 API থেকে ডাটা লোড করা
    useEffect(() => {
        const fetchSlot = async () => {
            try {
                const response = await axiosSecure.get(`/slots/${id}`);
                setSlotData(response.data);
            } catch (error) {
                console.error("Error fetching slot data:", error);
            }
        };
        fetchSlot();
    }, [id, axiosSecure]);

    // 🔹 ফর্ম সাবমিট হ্যান্ডলার
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axiosSecure.put(`/slots/${id}`, slotData);
            console.log("Response:", response.data); // 🔹 Debugging
    
            if (response.data.message === "Slot updated successfully!") {
                Swal.fire({
                    title: "Success!",
                    text: response.data.message,
                    icon: "success",
                    timer: 2000,
                    showConfirmButton: false,
                });
            } else {
                console.warn("No modifications detected!");
            }
        } catch (error) {
            console.error("Error updating slot:", error);
            Swal.fire({
                title: "Error!",
                text: "Something went wrong!",
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    };
    

    // 🔹 ইনপুট পরিবর্তন হ্যান্ডলার
    const handleChange = (event) => {
        const { name, value } = event.target;
        setSlotData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold text-center mb-6">Update Slot</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Date</label>
                        <input
                            type="date"
                            name="date"
                            value={slotData.date}
                            onChange={handleChange}
                            className="w-full p-2 border rounded mt-1"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Time</label>
                        <select
                            name="time"
                            value={slotData.time}
                            onChange={handleChange}
                            className="w-full p-2 border rounded mt-1"
                            required
                        >
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
                        <select
                            name="timesOfDay"
                            value={slotData.timesOfDay}
                            onChange={handleChange}
                            className="w-full p-2 border rounded mt-1"
                            required
                        >
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
                            value={slotData.availableSlots}
                            onChange={handleChange}
                            className="w-full p-2 border rounded mt-1"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Price</label>
                        <input
                            type="number"
                            name="price"
                            value={slotData.price}
                            onChange={handleChange}
                            className="w-full p-2 border rounded mt-1"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Advance for Booking</label>
                        <input
                            type="number"
                            name="advance"
                            value={slotData.advance}
                            onChange={handleChange}
                            className="w-full p-2 border rounded mt-1"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Nogod Number</label>
                        <input
                            type="text"
                            name="nogod"
                            value={slotData.nogod}
                            onChange={handleChange}
                            className="w-full p-2 border rounded mt-1"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Bkash Number</label>
                        <input
                            type="text"
                            name="bkash"
                            value={slotData.bkash}
                            onChange={handleChange}
                            className="w-full p-2 border rounded mt-1"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Description</label>
                        <textarea
                            name="description"
                            value={slotData.description}
                            onChange={handleChange}
                            className="w-full p-2 border rounded mt-1"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    >
                        Update Slot
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateSlots;
