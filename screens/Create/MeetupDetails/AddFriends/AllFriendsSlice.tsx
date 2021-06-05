import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ContactDetails } from "types/types";

// Define a type for the slice state
interface StateProps {
  allFriends: ContactDetails[];
}

// Define the initial state using that type
const initialState: StateProps = {
  allFriends: [],
};

export const AllFriendsSlice = createSlice({
  name: "AllFriends",
  initialState,
  reducers: {
    toggleSelectedState: (state, action: PayloadAction<ContactDetails>) => {
      // Toggle the 'selected' key of the object in allFriends
      let indexToChange = state.allFriends.findIndex(
        (elt) => elt.id === action.payload.id
      );

      let before = state.allFriends.slice(0, indexToChange);
      let contactToChange = state.allFriends[indexToChange];
      let after = state.allFriends.slice(indexToChange + 1);

      // console.log("payload");
      // console.log(action.payload);
      // console.log("state");
      // console.log(contactToChange);
      // console.log(
      //   `Changing from ${
      //     contactToChange.selected
      //   } to ${!contactToChange.selected}`
      // );

      state.allFriends = [
        ...before,
        {
          ...contactToChange,
          selected: !contactToChange.selected, // toggle the selected key
        },
        ...after,
      ];
    },
    setAllFriends: (state, action: PayloadAction<ContactDetails[]>) => {
      state.allFriends = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleSelectedState, setAllFriends } = AllFriendsSlice.actions;

const AllFriendsReducer = AllFriendsSlice.reducer;
export default AllFriendsReducer;
