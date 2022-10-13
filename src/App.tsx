import axios from "axios";
import React, { useEffect } from "react";
import TodoApp from "./pages/TodoApp";

function App() {
  useEffect(() => {
    axios
      .get("/api/test")
      .then((res) => console.log(res))
      .catch();
  }, []);
  return (
    <div className="App">
      <TodoApp />
    </div>
  );
}

export default App;
