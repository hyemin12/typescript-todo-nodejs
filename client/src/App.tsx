import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getTodo } from "./modules/todos";
import TodoApp from "./pages/TodoApp";

function App() {
  const [todos, setTodos] = useState([]);
  const dispatch = useDispatch();

  // 데이터 가져오기
  const getTodos = async () => {
    try {
      const req = await axios.get("http://localhost:5000/todos");
      setTodos(req.data.rows);
      dispatch(getTodo(req.data.rows));
    } catch (err: any) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    getTodos();
  }, []);
  return (
    <div className="App">
      <TodoApp />
    </div>
  );
}

export default App;
