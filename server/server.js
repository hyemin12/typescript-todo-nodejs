const express = require("express");
const app = express();
const port = 3001; // <- 3000에서 다른 숫자로 변경
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");

// mysql이랑 연동에 필요한 정보 초기화
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234567a",
  database: "tododb",
});

// 데이터베이스와 연동
connection.connect();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/todos", (req, res) => {
  connection.query("SELECT * from todotable", (error, rows, fields) => {
    if (error) throw error;
    console.log("투두리스트 DB ", rows);
    res.send(rows);
  });
});

app.post("/mkTodo", (req, res) => {
  const todotext = req.body.value;
  console.log(todotext);
  connection.query(
    "INSERT INTO todotable (content) values(?)",
    [todotext],
    (error, rows, fields) => {
      if (error) {
        console.log(error);
      } else {
        console.log("db 저장 성공!", rows);
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
