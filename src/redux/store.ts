import { configureStore } from "@reduxjs/toolkit";
import AllFriendsReducer from "redux/slices/AllFriendsSlice";
import DatePickerReducer from "redux/slices/DatePickerSlice";
import GridInfoReducer from "./GridInfoSlice";
import SelectedPalsReducer from "redux/slices/SelectedPalsSlice";

const store = configureStore({
  reducer: {
    DatePicker: DatePickerReducer,
    SelectedPals: SelectedPalsReducer,
    AllFriends: AllFriendsReducer,
    GridInfo: GridInfoReducer,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
