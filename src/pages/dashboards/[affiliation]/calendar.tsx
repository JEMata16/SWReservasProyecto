import { useState } from 'react';
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import AffiliateSidebarLayout from '~/layouts/AffiliateSidebarLayout';
interface Props {
    isClearable?: boolean;
    onChange: (date: Date) => any;
    selectedDate: Date | undefined;
    showPopperArrow?: boolean;
}
const ReactDatePickerComponent = ({
    selectedDate,
    onChange,
    isClearable = false,
    showPopperArrow = false,
    ...props
}: Props ) => {
    return (
        <>
            <ReactDatePicker
                selected={selectedDate}
                onChange={onChange}
                isClearable={isClearable}
                showPopperArrow={showPopperArrow}
                className="react-datapicker__input-text text-lg p-2 border border-gray-300 rounded-lg"
                dateFormat="MM/dd/yyyy"

            />

        </>
    );
};


const Calendar = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [selectedDates, setSelectedDates] = useState<Date[]>([]);
    const handleDateChange = (date: Date) => {
        setSelectedDate(date);
    };

    const handleAddDate = () => {
        setSelectedDates([...selectedDates, endDate]);
    };
    return (
        <>
            <AffiliateSidebarLayout>
                <div className='flex flex-col items-center justify-center h-screen'>
                    <div className='mb-4'>
                        <h2 className='text-2xl mb-4 text-center '>This is the availability calendar</h2>
                        <p>This will show the availability of the hotel to the end client via your email</p>
                    </div>
                    <div className='mb-4'>
                        <ReactDatePickerComponent selectedDate={endDate} onChange={setEndDate} />
                        <button
                            onClick={handleAddDate}
                            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
                        >
                            Add Date
                        </button>
                    </div>
                    <table className="border-collapse border border-gray-300">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 p-2">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedDates.map((date, index) => (
                                <tr key={index}>
                                    <td className="border border-gray-300 p-2">{date.toDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </AffiliateSidebarLayout>
        </>
    )
}

export default Calendar;