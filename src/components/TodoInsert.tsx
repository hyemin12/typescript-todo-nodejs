import axios from "axios";
import React, { FormEvent, useState } from "react";

type TodoInsertProps = {
  onInsert: (text: string) => void;
};

function TodoInsert({ onInsert }: TodoInsertProps) {
  const [value, setValue] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  /** 투두리스트 추가
   * content: 투두리스트 내용 */
  const onSubmit = (e: FormEvent) => {
    try {
      const res = axios.post("http://localhost:3001/create", {
        content: value,
      });
      setValue("");
      console.log("DB 전송 성공!", res);
    } catch (err: any) {
      console.log(err.message);
    }
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
