import React from "react";
import TodoItem from "./TodoItem";
import { Todo } from "../modules/todos";

// list props type 지정
type TodoListProps = {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
};

function TodoList({ todos, onDelete, onToggle }: TodoListProps) {
  if (todos.length === 0) return <p className="empty-todo">할일이 없습니다.</p>;
  return (
    <>
      {todos && (
        <ul className="todo-list">
          {todos.map((todo) => (
            <TodoItem
              todo={todo}
              onDelete={onDelete}
              onToggle={onToggle}
              key={todo.idx}
            />
          ))}
        </ul>
      )}
    </>
  );
}

export default TodoList;
