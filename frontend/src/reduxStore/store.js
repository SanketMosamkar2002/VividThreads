import { configureStore } from "@reduxjs/toolkit";
import reducer from "../reducers/reduxSlices";

const store = configureStore({
  reducer: {
    myStore: reducer,
  },
});
export default store;
