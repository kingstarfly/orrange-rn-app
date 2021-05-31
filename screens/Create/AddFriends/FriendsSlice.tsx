import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ContactDetails } from "types/types";

// Define a type for the slice state
interface Contacts {
  selectedFriends: ContactDetails[];
  allFriends: ContactDetails[];
}

// Define the initial state using that type
const initialState: Contacts = {
  selectedFriends: [],
  allFriends: [],
};

export const FriendsSlice = createSlice({
  name: "Friends",
  initialState,
  reducers: {
    onSelectFriend: (state, action: PayloadAction<ContactDetails>) => {
      // Modify the selectedFriends array by deleting if already existing, or pushing if not exist.

      let index = state.selectedFriends.findIndex(
        (elt) => elt.id === action.payload.id
      );
      // console.log(index);
      if (index !== -1) {
        state.selectedFriends.splice(index, 1); // delete the item from array
      } else {
        state.selectedFriends.push(action.payload); // push to end of array
      }

      // Also, toggle the 'selected' key of the object in allFriends
      let contactToChange = state.allFriends.find(
        (elt) => elt.id === action.payload.id
      );
      contactToChange.selected = !contactToChange.selected; // toggle the selected key
    },
    setAllFriends: (state, action: PayloadAction<ContactDetails[]>) => {
      state.allFriends = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { onSelectFriend, setAllFriends } = FriendsSlice.actions;

const FriendsReducer = FriendsSlice.reducer;
export default FriendsReducer;
