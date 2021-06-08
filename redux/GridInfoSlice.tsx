import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface GridInfo {
  x?: number;
  y?: number;
  timeString?: string;
}

// Define the initial state using that type
const initialState: GridInfo[] = [];

export const GridInfoSlice = createSlice({
  name: "Grid",
  initialState,
  reducers: {
    addGridInfo: (state, action: PayloadAction<GridInfo>) => {
      state.push(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addGridInfo } = GridInfoSlice.actions;

const GridInfoReducer = GridInfoSlice.reducer;
export default GridInfoReducer;
