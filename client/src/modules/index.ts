import { configureStore } from "@reduxjs/toolkit";
import todo from "./todos";

const store = configureStore({
  reducer: { todoReducer: todo.reducer },
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
