import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type BookState = {
  bookItems: BookingItem[]
}
const initialState: BookState = {bookItems: []}

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {

    addBooking: (state, action: PayloadAction<BookingItem>) => {
      const duplicateDateBookings = state.bookItems.filter(item => 
        item.bookDate === action.payload.bookDate
      );
      
      if (duplicateDateBookings.length > 0) {
        state.bookItems = state.bookItems.filter(item => 
          item.bookDate !== action.payload.bookDate
        );
      }
        state.bookItems.push(action.payload);
    },
    
    removeBooking: (state, action: PayloadAction<BookingItem>) => {
      state.bookItems = state.bookItems.filter(item => 
        !(item.nameLastname === action.payload.nameLastname && 
          item.tel === action.payload.tel &&
          item.venue === action.payload.venue &&
          item.bookDate === action.payload.bookDate)
      );
    }
  }
});

export const { addBooking, removeBooking } = bookSlice.actions;
export default bookSlice.reducer;