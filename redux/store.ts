import { configureStore } from "@reduxjs/toolkit";
import DatePickerReducer from "redux/DatePickerSlice";
import GridInfoReducer from "./GridInfoSlice";

const store = configureStore({
  reducer: {
    DatePicker: DatePickerReducer,
    GridInfo: GridInfoReducer,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
