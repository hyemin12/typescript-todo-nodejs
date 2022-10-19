import axios from "axios";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// type 초기값
export type Todo = {
  idx: number;
  content: string;
  isDone: number;
};

export type TodosState = Todo[];

var initialState: Todo[] = [];

// reducer
const todo = createSlice({
  name: "todoReducer",
  initialState,
  reducers: {
    getTodo(state, action) {
      return (state = [...action.payload]);
    },

    toggleTodo(state, action) {
      return state.map((todo) =>
        todo.idx === action.payload.idx
          ? { ...todo, isDone: action.payload.isDone }
          : todo
      );
    },
    deleteTodo(state, action) {
      return state.filter((todo) => todo.idx !== action.payload);
    },
  },
});

export const { getTodo, toggleTodo, deleteTodo } = todo.actions;

export default todo;

// switch (action.type) {
//   case ADD_TODO:
//     return state.concat({
//       idx: Date.now(),
//       content: action.payload,
//       isDone: 0,
//     });

//   case TOGGLE_TODO:
//     return state.map((todo) =>
//       todo.idx === action.payload ? { ...todo, isDone: 1 } : todo
//     );

//   case DELETE_TODO:
//     return
//     case UPDATE_TODO:

//       return state
//   default:
//     return state;
// }
