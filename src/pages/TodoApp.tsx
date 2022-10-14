import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import TodoInsert from "../components/TodoInsert";
import TodoList from "../components/TodoList";
import { RootState } from "../modules";
import { addTodo, toggleTodo, deleteTodo, Todo } from "../modules/todos";
import "../style.scss";

function TodoApp({ todos }: { todos: Todo[] }) {
  // const todos = useSelector((state: RootState) => state.todoReducer);
  const dispatch = useDispatch();

  const [createMode, setCreate] = useState(false);

  const onInsert = (text: string) => {
    dispatch(addTodo(text));
  };
  const onDelete = (id: number) => {
    dispatch(deleteTodo(id));
  };
  const onToggle = (id: number) => {
    dispatch(toggleTodo(id));
  };
  console.log(todos);
  return (
    <div className="container">
      <div className="inner">
        <Header todos={todos} />
        <TodoList todos={todos} onDelete={onDelete} onToggle={onToggle} />
        {createMode && <TodoInsert onInsert={onInsert} />}
      </div>
      <div
        className="btn-create"
        onClick={() => {
          setCreate(!createMode);
        }}
      >
        <span className={(createMode ? "create " : "") + "icon-create"}></span>
      </div>
    </div>
  );
}

export default TodoApp;
