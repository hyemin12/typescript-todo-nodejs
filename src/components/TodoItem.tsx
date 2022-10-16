import axios from "axios";
import React, { useEffect, useState } from "react";
import { Todo } from "../modules/todos";

// item props type 지정
type TodoItemProps = {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
};

function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const [checked, setChecked] = useState(false);
  const [isEdit, setEdit] = useState(true);
  const [value, setValue] = useState(todo.content);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  function todoChecked() {
    if (todo.isDone === 0) {
      setChecked(true);
      todo.isDone = 1;
      todoEdit();
    } else {
      setChecked(false);
      todo.isDone = 0;
      todoEdit();
    }
  }

  const todoEdit = () => {
    try {
      axios.post("http://localhost:3001/update", {
        index: todo.idx,
        content: value,
        isDone: todo.isDone,
      });
    } catch (err: any) {
      console.log(err.message);
    }
  };

  /** 투두 삭제 */
  const todoDelete = () => {
    const isOk = window.confirm("정말 삭제하시겠습니까?");
    if (isOk) {
      try {
        axios.post("http://localhost:3001/delete", {
          index: todo.idx,
        });
        window.location.reload();
      } catch (err: any) {
        console.log(err.message);
      }
    }
    // onDelete(todo.idx);
  };

  return (
    <li className={(checked ? "done " : "") + "todo-item"}>
      <input
        type="checkbox"
        id={`check-${todo.idx}`}
        onChange={todoChecked}
        checked={checked}
      />
      <label htmlFor={`check-${todo.idx}`}>
        {checked ? <i className="fas fa-check"></i> : ""}
      </label>

      <input
        type="text"
        value={value}
        readOnly={isEdit}
        className="todo-text-input"
        onChange={onChange}
      />

      <span
        className="btn-edit"
        onClick={() => {
          setEdit(!isEdit);
        }}
      >
        {isEdit ? (
          <i className="fas fa-pen"></i>
        ) : (
          <i className="fas fa-check" onClick={todoEdit}></i>
        )}
      </span>

      <span className="btn-delete" onClick={todoDelete}>
        <i className="fas fa-minus-circle"></i>
      </span>
    </li>
  );
}

export default TodoItem;
