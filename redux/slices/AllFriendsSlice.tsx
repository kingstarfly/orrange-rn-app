import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PalDetails } from "types/types";

// Define a type for the slice state
interface StateProps {
  allFriends: PalDetails[];
}

// Define the initial state using that type
const initialState: StateProps = {
  allFriends: [],
};

export const AllFriendsSlice = createSlice({
  name: "AllFriends",
  initialState,
  reducers: {
    toggleSelectedState: (state, action: PayloadAction<PalDetails>) => {
      // Toggle the 'selected' key of the object in allFriends
      let indexToChange = state.allFriends.findIndex(
        (elt) => elt.id === action.payload.id
      );

      let before = state.allFriends.slice(0, indexToChange);
      let contactToChange = state.allFriends[indexToChange];
      let after = state.allFriends.slice(indexToChange + 1);

      state.allFriends = [
        ...before,
        {
          ...contactToChange,
          selected: !contactToChange.selected, // toggle the selected key
        },
        ...after,
      ];
    },
    setAllFriends: (state, action: PayloadAction<PalDetails[]>) => {
      state.allFriends = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleSelectedState, setAllFriends } = AllFriendsSlice.actions;

const AllFriendsReducer = AllFriendsSlice.reducer;
export default AllFriendsReducer;
