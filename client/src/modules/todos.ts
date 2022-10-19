import { createSlice } from "@reduxjs/toolkit";

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
    addTodo(state, action) {
      return state.concat({
        idx: state[state.length - 1].idx + 1,
        content: action.payload,
        isDone: 0,
      });
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

export const { getTodo, addTodo, toggleTodo, deleteTodo } = todo.actions;

export default todo;
