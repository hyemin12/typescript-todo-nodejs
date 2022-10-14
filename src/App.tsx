import axios from "axios";
import React, { useEffect, useState } from "react";
import TodoApp from "./pages/TodoApp";

function App() {
  const [todos, setTodos] = useState([]);

  // 데이터 가져오기
  const getTodos = async () => {
    try {
      const res = await axios.get("http://localhost:3001/todos/");
      setTodos(res.data);
    } catch (err: any) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);
  return (
    <div className="App">
      <TodoApp todos={todos} />
    </div>
  );
}

export default App;
