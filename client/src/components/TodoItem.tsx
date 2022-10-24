import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, TodoProps, toggleTodo } from "../modules/todos";

function TodoItem({ todo }: { todo: TodoProps }) {
  const [checked, setChecked] = useState(0);
  const [isEdit, setEdit] = useState(true);
  const [value, setValue] = useState(todo.content);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const dispatch = useDispatch();

  /** 투두 done 수정 */
  function todoChecked() {
    if (todo.isDone === 0) {
      setChecked(1);
      axios.post("http://localhost:5000/api/todos/updateDone", {
        idx: todo.idx,
        isDone: 1,
      });
      dispatch(
        toggleTodo({
          idx: todo.idx,
          isDone: 1,
        })
      );
    } else {
      setChecked(0);
      axios.post("http://localhost:5000/api/todos/updateDone", {
        idx: todo.idx,
        isDone: 0,
      });
      dispatch(
        toggleTodo({
          idx: todo.idx,
          isDone: 0,
        })
      );
    }
  }

  /** 투두 내용 수정 */
  const todoEdit = () => {
    const todoData = {
      idx: todo.idx,
      content: value,
    };
    axios
      .post("http://localhost:5000/api/todos/update", todoData)
      .then((res) => res.data)
      .catch((err) => console.log(err));
  };

  /** 투두 삭제 */
  const todoDelete = () => {
    const isOk = window.confirm("정말 삭제하시겠습니까?");
    if (isOk) {
      axios
        .post("http://localhost:5000/api/todos/delete", {
          idx: todo.idx,
        })
        .then((res) => res.data)
        .catch((err) => console.log(err.message));
    }
    dispatch(deleteTodo(todo.idx));
  };

  return (
    <li className={(todo.isDone !== 0 ? "done " : "") + "todo-item"}>
      <input
        type="checkbox"
        id={`check-${todo.idx}`}
        onChange={todoChecked}
        checked={checked === 0 ? false : true}
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
