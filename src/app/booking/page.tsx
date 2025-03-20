"use client"

import DateReserve from "@/components/DateReserve";
import { TextField } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { addBooking } from "@/redux/features/bookSlice";

export default function Booking(){
    const urlParam = useSearchParams();
    const vid = urlParam.get('id');
    const name = urlParam.get('name');
    const dispatch = useDispatch<AppDispatch>();

    // Extract venue value from full name (e.g., "The Bloom Pavilion" -> "Bloom")
    const getVenueValue = (fullName: string | null): string => {
        if (!fullName) return '';
        
        if (fullName.includes('Bloom')) return 'Bloom';
        if (fullName.includes('Spark')) return 'Spark';
        if (fullName.includes('Grand')) return 'GrandTable';
        
        return ''; // Default to empty when no match
    };

    const [reservationDate, setReservationDate] = useState<Dayjs | null>(null);
    const [venueName, setVenueName] = useState<string>(getVenueValue(name));
    const [nameLastname, setNameLastname] = useState<string>('');
    const [tel, setTel] = useState<string>('');

    const makeBooking = () => {
        if (venueName && reservationDate && nameLastname && tel){
            const item = {
                nameLastname: nameLastname,
                tel: tel,
                venue: venueName,
                bookDate: dayjs(reservationDate).format("YYYY/MM/DD")
            };
            dispatch(addBooking(item));
            console.log("Booking data:", item);
            alert("Booking successful!");
        }
        else{
            alert("Please fill in all fields");
        }
    };

    return(
        <main className="w-full max-w-2xl mx-auto mt-10 mb-16 px-4">
            <div className="text-2xl font-semibold text-center mb-8">New Venue Booking</div>
            {name && <div className="text-xl font-medium text-center mb-6">Venue: {name}</div>}
            
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-lg font-medium mb-4 text-gray-700">Select Date and Location</h2>
                <DateReserve 
                    initialVenue={venueName}
                    onDateChange={(value: Dayjs) => setReservationDate(value)} 
                    onLocationChange={(value: string) => setVenueName(value)}
                />
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-lg font-medium mb-4 text-gray-700">Contact Information</h2>
                <div className="space-y-4">
                    <TextField 
                        name="Name-Lastname" 
                        label="Full Name" 
                        variant="outlined" 
                        value={nameLastname}
                        onChange={(e) => setNameLastname(e.target.value)}
                        fullWidth
                        required
                    />
                    <TextField 
                        name="Contact-Number" 
                        label="Contact Number" 
                        variant="outlined" 
                        value={tel}
                        onChange={(e) => setTel(e.target.value)}
                        fullWidth
                        required
                    />
                </div>
            </div>
            
            <div className="flex justify-center">
                <button 
                    name="Book Venue" 
                    className="bg-cyan-600 hover:bg-cyan-700 text-white font-medium px-8 py-3 rounded-md shadow-sm transition-colors duration-200 w-full sm:w-auto sm:min-w-[200px]"
                    onClick={makeBooking}
                >
                    Book Venue
                </button>
            </div>
        </main>
    );
}