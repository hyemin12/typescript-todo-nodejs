const express = require("express");
const app = express();
const port = 5000; // <- 3000에서 다른 숫자로 변경
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
    if (error) {
      console.log(error);
      throw error;
    } else {
      res.send({ rows });
    }
  });
});

app.post("/api/todos/create", (req, res) => {
  const todo = req.body.content;
  connection.query(
    "INSERT INTO todotable (content) values(?)",
    [todo],
    (error, rows, fields) => {
      if (error) {
        console.log(error);
      }
    }
  );
});

app.post("/api/todos/update", (req, res) => {
  const idx = req.body.idx;
  const todotext = req.body.content;

  connection.query(
    "UPDATE todotable SET content = ? WHERE idx = ?",
    [todotext, idx],
    (error, rows, fields) => {
      if (error) {
        console.log(error);
      } else {
        res.send(rows);
      }
    }
  );
});
app.post("/api/todos/update", (req, res) => {
  const idx = req.body.idx;
  const todotext = req.body.content;
  const isDone = req.body.isDone;

  connection.query(
    "UPDATE todotable SET content = ?, isDone=? WHERE idx = ?",
    [todotext, isDone, idx],
    (error, rows, fields) => {
      if (error) {
        console.log(error);
      } else {
        res.send(rows);
      }
    }
  );
});

app.post("/api/todos/updateDone", (req, res) => {
  const isDone = req.body.isDone;
  const idx = req.body.idx;

  connection.query(
    "UPDATE todotable SET isDone=? WHERE idx = ?",
    [isDone, idx],
    (error, rows, fields) => {
      if (error) {
        console.log(error);
      } else {
        res.send(rows);
      }
    }
  );
});

app.post("/api/todos/delete", (req, res) => {
  const idx = req.body.idx;
  connection.query(
    "DELETE FROM todotable where idx=?",
    [idx],
    (error, rows, fields) => {
      if (error) {
        console.log(error);
      } else {
        console.log("삭제 성공!");
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
