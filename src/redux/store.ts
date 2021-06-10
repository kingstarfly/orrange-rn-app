import { configureStore } from "@reduxjs/toolkit";
import AllFriendsReducer from "src/redux/slices/AllFriendsSlice";
import SelectedFriendsReducer from "src/redux/slices/SelectedFriendsSlice";
import DatePickerReducer from "src/redux/slices/DatePickerSlice";
import GridInfoReducer from "./GridInfoSlice";

const store = configureStore({
  reducer: {
    DatePicker: DatePickerReducer,
    SelectedFriends: SelectedFriendsReducer,
    AllFriends: AllFriendsReducer,
    GridInfo: GridInfoReducer,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
