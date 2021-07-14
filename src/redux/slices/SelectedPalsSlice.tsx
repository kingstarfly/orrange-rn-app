import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OtherUser } from "types/types";

// Define a type for the slice state
interface StateProps {
  selectedPals: OtherUser[];
}

// Define the initial state using that type
const initialState: StateProps = {
  selectedPals: [],
};

export const SelectedPalsSlice = createSlice({
  name: "SelectedPals",
  initialState,
  reducers: {
    onSelectPal: (state, action: PayloadAction<OtherUser>) => {
      // Modify the selectedFriends array by deleting if already existing, or pushing if not exist.
      let index = state.selectedPals.findIndex(
        (elt) => elt.uid === action.payload.uid
      );
      // console.log(index);
      if (index !== -1) {
        state.selectedPals.splice(index, 1); // delete the item from array
      } else {
        state.selectedPals.push(action.payload); // push to end of array
      }
    },
    clearSelectedPals: (state) => {
      // console.log("Cleared Selected pals");
      return initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { onSelectPal, clearSelectedPals } = SelectedPalsSlice.actions;

const SelectedPalsReducer = SelectedPalsSlice.reducer;
export default SelectedPalsReducer;
