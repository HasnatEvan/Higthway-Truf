import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { FaCalendarAlt, FaCreditCard, FaPhoneAlt, FaDollarSign, FaClock, FaRegListAlt, FaCircle } from "react-icons/fa"

const MySlotsTable = ({ booking, index, view }) => {
    const { date, paymentMethod, phone, price, status, time, timesOfDay, transactionId } = booking;
    const [currentStatus, setCurrentStatus] = useState(status);

    useEffect(() => {
        setCurrentStatus(status);
    }, [status]);

    const formattedDate = new Date(date).toLocaleDateString();

    const statusColorClass =
        currentStatus === 'Pending' ? 'text-yellow-600' :
            currentStatus === 'Processing' ? 'text-blue-600' :
                currentStatus === 'Confirm' ? 'text-green-600' :
                    currentStatus === 'Canceled' ? 'text-red-600' : 'text-gray-600';

    if (view === 'table') {
        return (
            <tr className="text-center whitespace-nowrap">
                <td className="p-2 border">{index}</td>
                <td className="p-2 border">{formattedDate}</td>
                <td className="p-2 border">{paymentMethod}</td>
                <td className="p-2 border">{phone}</td>
                <td className="p-2 border">{price} BDT</td>
                <td className={`p-2 border ${statusColorClass}`}>{currentStatus}</td>
                <td className="p-2 border">{time}</td>
                <td className="p-2 border">{timesOfDay}</td>
                <td className="p-2 border">{transactionId}</td>
            </tr>
        );
    }

    // Card view for mobile
    return (


        <div className="bg-[#fcf7ee] text-black rounded-xl shadow-md p-4 border border-gray-200 space-y-2">
            <div className="flex justify-between text-sm font-medium">
                <div className="flex items-center gap-2">
                    <FaRegListAlt className="text-gray-500" />
                    <span>#</span>
                </div>
                <span>{index}</span>
            </div>

            <div className="flex justify-between text-sm font-medium">
                <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-blue-500" />
                    <span>Date</span>
                </div>
                <span>{formattedDate}</span>
            </div>

            <div className="flex justify-between text-sm font-medium">
                <div className="flex items-center gap-2">
                    <FaCreditCard className="text-green-500" />
                    <span>Payment Method</span>
                </div>
                <span>{paymentMethod}</span>
            </div>

            <div className="flex justify-between text-sm font-medium">
                <div className="flex items-center gap-2">
                    <FaPhoneAlt className="text-purple-500" />
                    <span>Phone</span>
                </div>
                <span>{phone}</span>
            </div>

            <div className="flex justify-between text-sm font-medium">
                <div className="flex items-center gap-2">
                    <FaDollarSign className="text-yellow-500" />
                    <span>Price</span>
                </div>
                <span>{price} BDT</span>
            </div>

            <div className="flex justify-between text-sm font-medium">
                <div className="flex items-center gap-2">
                    <FaCircle className={`text-xs ${statusColorClass}`} />
                    <span>Status</span>
                </div>
                <span className={`font-semibold px-2 py-1 rounded-full text-xs ${statusColorClass} bg-opacity-10 ${statusColorClass.replace("text-", "bg-")} ${currentStatus === "Confirm" ? "text-white" : ""}`}>
                    {currentStatus}
                </span>
            </div>


            <div className="flex justify-between text-sm font-medium">
                <div className="flex items-center gap-2">
                    <FaClock className="text-orange-500" />
                    <span>Time</span>
                </div>
                <span>{time}</span>
            </div>

            <div className="flex justify-between text-sm font-medium">
                <div className="flex items-center gap-2">
                    <FaClock className="text-teal-500" />
                    <span>Times of Day</span>
                </div>
                <span>{timesOfDay}</span>
            </div>

            <div className="flex justify-between text-sm font-medium">
                <div className="flex items-center gap-2">
                    <FaRegListAlt className="text-gray-500" />
                    <span>Transaction ID</span>
                </div>
                <p className="break-words">{transactionId}</p>
            </div>
        </div>

    );
};

MySlotsTable.propTypes = {
    booking: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        paymentMethod: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        status: PropTypes.string.isRequired,
        time: PropTypes.string.isRequired,
        timesOfDay: PropTypes.string.isRequired,
        transactionId: PropTypes.string.isRequired,
    }).isRequired,
    index: PropTypes.number.isRequired,
    view: PropTypes.oneOf(['table', 'card']).isRequired,
};

export default MySlotsTable;
