import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { Todo, updateTodo, deleteTodo } from "../modules/todos";

function TodoItem({ todo }: { todo: Todo }) {
  const [checked, setChecked] = useState(false);
  const [isEdit, setEdit] = useState(true);
  const [value, setValue] = useState(todo.content);

  const dispatch = useDispatch();

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
    const todoData: Todo = {
      idx: todo.idx,
      content: value,
      isDone: todo.isDone,
    };
    dispatch(updateTodo(todoData));
  };

  /** 투두 삭제 */
  const todoDelete = () => {
    const idx = todo.idx;
    const isOk = window.confirm("정말 삭제하시겠습니까?");
    if (isOk) {
      dispatch(deleteTodo(idx));
    }
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
