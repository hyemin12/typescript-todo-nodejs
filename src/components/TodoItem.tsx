import React, { useState } from "react";
import { Todo } from "../modules/todos";

// item props type 지정
type TodoItemProps = {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
};

function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const [checked, setChecked] = useState(todo.done);
  const handgeToggle = () => {
    onToggle(todo.id);
    setChecked(!checked);
  };
  const handleDelete = () => {
    onDelete(todo.id);
  };
  return (
    <li className={(checked ? "done " : "") + "todo-item"}>
      <input
        type="checkbox"
        id={`check-${todo.id}`}
        onClick={handgeToggle}
        checked={todo.done}
      />
      <label htmlFor={`check-${todo.id}`}>
        {checked ? <i className="fas fa-check"></i> : ""}
      </label>
      <p>{todo.content}</p>
      <span className="btn-delete" onClick={handleDelete}>
        <i className="fas fa-minus-circle"></i>
      </span>
    </li>
  );
}

export default TodoItem;
