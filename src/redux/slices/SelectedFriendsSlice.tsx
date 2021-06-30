import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OtherUser } from "types/types";

// Define a type for the slice state
interface StateProps {
  selectedFriends: OtherUser[];
}

// Define the initial state using that type
const initialState: StateProps = {
  selectedFriends: [],
};

export const SelectedFriendsSlice = createSlice({
  name: "SelectedFriends",
  initialState,
  reducers: {
    onSelectFriend: (state, action: PayloadAction<OtherUser>) => {
      // Modify the selectedFriends array by deleting if already existing, or pushing if not exist.
      let index = state.selectedFriends.findIndex(
        (elt) => elt.uid === action.payload.uid
      );
      // console.log(index);
      if (index !== -1) {
        state.selectedFriends.splice(index, 1); // delete the item from array
      } else {
        state.selectedFriends.push(action.payload); // push to end of array
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { onSelectFriend } = SelectedFriendsSlice.actions;

const SelectedFriendsReducer = SelectedFriendsSlice.reducer;
export default SelectedFriendsReducer;
