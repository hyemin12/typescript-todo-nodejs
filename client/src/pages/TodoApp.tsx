import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import TodoInsert from "../components/TodoInsert";
import TodoList from "../components/TodoList";
import { Todo } from "../modules/todos";

import "../style.scss";

function TodoApp({ todos }: { todos: Todo[] }) {
  const dispatch = useDispatch();

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
