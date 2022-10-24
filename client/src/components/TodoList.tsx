import React, { useEffect } from "react";
import TodoItem from "./TodoItem";
import { TodoProps } from "../modules/todos";

function TodoList({ todos }: { todos: TodoProps[] }) {
  useEffect(() => {}, [todos]);

  if (todos.length === 0) return <p className="empty-todo">할일이 없습니다.</p>;

  return (
    <>
      {todos && (
        <ul className="todo-list">
          {todos.map((todo) => (
            <TodoItem todo={todo} key={todo.idx} />
          ))}
        </ul>
      )}
    </>
  );
}

export default TodoList;
