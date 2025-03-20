"use client"

import { removeBooking } from "@/redux/features/bookSlice"
import { AppDispatch, useAppSelector } from "@/redux/store"
import { useDispatch } from "react-redux"

export default function BookingList() {
    const venueItems = useAppSelector((state) => state.bookSlice.bookItems)
    const dispatch = useDispatch<AppDispatch>()

    // Check if there are no bookings
    if (venueItems.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-10 px-5 my-10 bg-white rounded-lg shadow-md">
                <div className="text-2xl font-medium text-gray-500 mb-2">No Venue Bookings</div>
                <p className="text-gray-400 text-center">You haven't made any reservations yet.</p>
            </div>
        )
    }

    return (
        <>
            {
                venueItems.map((bookingItem) => (
                    <div className="bg-slate-200 rounded px-5 mx-5 py-4 my-3 shadow-sm"
                        key={bookingItem.venue}>
                        <div className="text-xl font-medium mb-2">Venue Name: {bookingItem.venue}</div>
                        <div className="text-sm mb-1">Booking Date: {bookingItem.bookDate}</div>
                        <div className="text-sm mb-1">Name: {bookingItem.nameLastname}</div>
                        <div className="text-sm mb-3">Tel: {bookingItem.tel}</div>
                        <div>
                            <button 
                                name="Delete Reservation" 
                                className="block rounded-md bg-red-400 hover:bg-red-500 text-white px-4 py-2 shadow-sm transition-colors duration-200"
                                onClick={() => dispatch(removeBooking(bookingItem))}>
                                Delete Reservation
                            </button>
                        </div>
                    </div>
                ))
            }
        </>
    )
}