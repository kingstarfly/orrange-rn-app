import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "redux/store";
import { MarkedDates } from "types";

// Define a type for the slice state
interface DatePickerState {
  selected: MarkedDates;
}

// Define the initial state using that type
const initialState: DatePickerState = {
  selected: {},
};

export const DatePickerSlice = createSlice({
  name: "DatePicker",
  initialState,
  reducers: {
    setSelected: (state, action: PayloadAction<MarkedDates>) => {
      state.selected = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSelected } = DatePickerSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectedDates = (state: RootState) => state.DatePicker.selected;

const DatePickerReducer = DatePickerSlice.reducer;
export default DatePickerReducer;
