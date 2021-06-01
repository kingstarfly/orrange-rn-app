import { configureStore } from "@reduxjs/toolkit";
import AllFriendsReducer from "screens/Create/MeetupDetails/AddFriends/AllFriendsSlice";
import SelectedFriendsReducer from "screens/Create/MeetupDetails/AddFriends/SelectedFriendsSlice";
import DatePickerReducer from "screens/Create/SelectDates/DatePicker/DatePickerSlice";

const store = configureStore({
  reducer: {
    DatePicker: DatePickerReducer,
    SelectedFriends: SelectedFriendsReducer,
    AllFriends: AllFriendsReducer,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
