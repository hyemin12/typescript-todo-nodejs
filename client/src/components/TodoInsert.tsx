import axios from "axios";
import React, { FormEvent, SetStateAction, useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../modules/todos";

function TodoInsert({
  setCreate,
}: {
  setCreate: React.Dispatch<SetStateAction<boolean>>;
}) {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onSubmit = (e: FormEvent) => {
    // e.preventDefault();
    axios
      .post("http://localhost:5000/api/todos/create", {
        content: value,
      })
      .then((res) => res.data)
      .catch((err) => console.log(err));
    dispatch(addTodo(value));
    setValue("");
    setCreate(false);
  };
  return (
    <div className="create-todo">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={value}
          placeholder="할 일을 입력하세요."
          onChange={onChange}
        />
        <button type="submit">등록</button>
      </form>
    </div>
  );
}

export default TodoInsert;
