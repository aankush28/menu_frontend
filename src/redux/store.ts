import { configureStore } from "@reduxjs/toolkit";
import subheadingReducer from "./subheadingSlice";

export const store = configureStore({
  reducer: {
    subheading: subheadingReducer, // your subheading reducer
  },
});
