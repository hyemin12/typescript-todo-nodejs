import React, { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../modules/todos";

function TodoInsert() {
  const [value, setValue] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const dispatch = useDispatch();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(addTodo(value));
    // try {
    //   setValue("");
    //   console.log("DB 전송 성공!", req);
    // } catch (err: any) {
    //   console.log(err.message);
    // }
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
