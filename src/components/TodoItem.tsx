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
  function todoChecked() {
    todo.isDone === 1 ? setChecked(true) : setChecked(false);
  }
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const todoDone = () => {};
  const todoEdit = () => {
    try {
      const res = axios.post("http://localhost:3001/update", {
        index: todo.idx,
        content: value,
        isDone: todo.isDone,
      });
      console.log(value);
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
        console.log("삭제 성공!");
      } catch (err: any) {
        console.log(err.message);
      }
    }
  };
  return (
    <li className={(checked ? "done " : "") + "todo-item"}>
      <input type="checkbox" id={`check-${todo.idx}`} onClick={todoChecked} />
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
      {/* <p>{todo.content}</p> */}

      <span
        className="btn-edit"
        onClick={() => {
          setEdit(!isEdit);
        }}
      >
        {isEdit ? <p>"수정"</p> : <p onClick={todoEdit}>"완료"</p>}
      </span>
      <span className="btn-delete" onClick={todoDelete}>
        <i className="fas fa-minus-circle"></i>
      </span>
    </li>
  );
}

export default TodoItem;
