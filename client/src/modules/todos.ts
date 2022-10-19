import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

// type 초기값
export type Todo = {
  idx: number;
  content: string;
  isDone: number;
};

export type TodosState = Todo[];

var initialState: TodosState = [];

// reducer
const todo = createSlice({
  name: "todoReducer",
  initialState,
  reducers: {
    getTodo(state, action): any {
      // const todos = axios.get("/todos").then((res) => res.data)
      console.log(action.payload, state);
      return state.push(action.payload);
    },
    addTodo(state, action) {
      const req = axios.post("/api/todos/create").then((res) => res.data);
    },
    updateTodo(state, action) {
      const req = axios.post("/api/todos/update").then((res) => res.data);
    },
    deleteTodo(state, action) {
      const req = axios.post("/api/todos/delete").then((res) => res.data);
    },
  },
});

export const { getTodo, addTodo, updateTodo, deleteTodo } = todo.actions;

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
//     return state.filter((todo) => todo.idx !== action.payload);
//     case UPDATE_TODO:

//       return state
//   default:
//     return state;
// }
