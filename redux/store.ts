import { configureStore } from "@reduxjs/toolkit";
import FriendsReducer from "screens/Create/AddFriends/FriendsSlice";
import DatePickerReducer from "screens/Create/SelectDates/DatePicker/DatePickerSlice";

const store = configureStore({
  reducer: {
    DatePicker: DatePickerReducer,
    Friends: FriendsReducer,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
