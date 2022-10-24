import React, { useState } from "react";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import TodoInsert from "../components/TodoInsert";
import TodoList from "../components/TodoList";
import { RootState } from "../modules";
import { TodoProps } from "../modules/todos";

import "../style.scss";

function TodoApp() {
  const todoState = useSelector((state: RootState) => state.todoReducer);
  const todos: TodoProps[] = [...todoState].sort((a, b) => a.isDone - b.isDone);

  const [createMode, setCreate] = useState(false);

  return (
    <div className="container">
      <div className="inner">
        <Header todos={todos} />
        <TodoList todos={todos} />
        {createMode && <TodoInsert setCreate={setCreate} />}
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
