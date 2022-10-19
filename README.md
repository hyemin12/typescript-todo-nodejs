# Node.js + Mysql + Typescript

## 기능

- Todo Item 추가
- Todo Item 수정
- Todo Item 삭제

<br>
<br>

## Express 와 React 연동하기

1. express 설치하기

```js
npm i express
```

2. server 폴더 안에 server.js 파일 생성하기

```js
const express = require("express");
const app = express();
const port = 3001; // <- 3000에서 다른 숫자로 변경

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
```

3. 서버 실행하기

```
// server 폴더에서 실행할 경우
node server.js

// 프로젝트 최상위 폴더에서 실행할 경우
node server/server.js
```

4. localhost:3001로 들어가면
   "Hello World!"가 출력되어있음!

## mysql이랑 연동하기

1. mysql 다운 받기

https://bebeya.tistory.com/entry/MYSQL-%EB%AC%B4%EB%A3%8C%EB%B2%84%EC%A0%84%EC%BB%A4%EB%AE%A4%EB%8B%88%ED%8B%B0-%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C-%EC%84%A4%EC%B9%98-%EB%B0%A9%EB%B2%95

2. mysql 열고, database 생성

```
mysql> CREATE DATABASE {DB이름};
```

```
mysql> CREATE DATABASE tododb;
```

2-1. 데이터베이스 사용자 생성

- 사용자 생성

```
mysql> CREATE USER '{username}'@'localhost' IDENTIFIED BY '{password}';

```

localhost : 해당 컴퓨터에서만 접근이 가능 <br>
@'%' : 어떤 클라이언트에서든 접근 가능

- 비밀번호 생성

```
mysql> CREATE USER '{username}'@'%' IDENTIFIED BY '{password}';

mysql> CREATE USER 'TESTUSER'@'localhost' IDENTIFIED BY '1234';
```

- 데이터 베이스 전환하기

```
mysql> USE {database};
```

3. 데이터베이스 테이블 생성

4. server.js 코드 작성

```js
const express = require("express");
const app = express();
const port = 3001;
const mysql = require("mysql");

// mysql이랑 연동에 필요한 정보 초기화
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "비밀번호",
  database: "데이터베이스이름",
});

// 데이터베이스와 연동
connection.connect();
```

### bodyParser , cors 설치하고 적용하기

```
npm i --save cors

npm i --save body-parser
```

- server.js

```js
const express = require("express");
const app = express();
const port = 3001;
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");

// 중략

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());
```

## mysql 데이터 가져오기(GET)

#### 데이터베이스에 있는 데이터 가져오기<br>

#### localhost:3001/todos에 들어가면 데이터 확인 가능

#### mysql 데이터 가져오기

```
SELECT * from {테이블이름}
```

- server.js

```js
app.get("/todos", (req, res) => {
  let todos = [];
  connection.query("SELECT * from todotable", (error, rows, fields) => {
    if (error) throw error;
    console.log("투두리스트 DB ", rows);
    res.send({ todos });
  });
});
```

- App.tsx

```js
// 데이터 가져오기
function App(){
  const [todos, setTodos] = useState([]);

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
```

- useEffectt()로 웹페이지가 로드될 때 데이터를 가져오도록 설정, []를 통해 한번만 가져오도록 설정
- todos={todos}를 통해 TodoApp에 데이터 전달하기

## mysql 데이터 추가하기(POST)

#### mysql 데이터 추가하기 (INSERT)

```
INSERT INTO {테이블이름} (column이름...) values(?)
```

- server.js

```js
app.post("/create", (req, res) => {
  const todotext = req.body.content;
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
```

- Todo 추가하는 컴포넌트

```js
function TodoInsert() {
  const [value, setValue] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  /** 투두리스트 추가 */
  const onSubmit = (e: FormEvent) => {
    try {
      const res = axios.post("http://localhost:3001/create", {
        content: value,
      });
      setValue("");
      console.log("DB 전송 성공!");
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
```

## mysql 데이터 수정하기(UPDATE)

#### mysql 데이터 수정하기 (특정조건)

```
"UPDATE {테이블이름} SET {column명1} = ?, {column명2}=? WHERE {조건} = ?"
```

```
"UPDATE todotable SET content = ?, isDone=? WHERE idx = ?"
```

> todotable의 content와 isDone 내용 수정 -> req.body.index인 idx만 수정

- server.js

```js
app.post("/update", (req, res) => {
  const idx = req.body.index;
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
```

- 수정기능

```js
const todoEdit = () => {
    try {
      axios.post("http://localhost:3001/delete", {
          idx: todo.idx,
        })
    } catch (err: any) {
      console.log(err.message);
    }
  };
```

## mysql 데이터 삭제하기(DELETE)

특정 조건 데이터만 삭제하기

```
"DELETE FROM {테이블명} where {조건}=?"
```

- server.js

```js
app.post("/delete", (req, res) => {
  const idx = req.body.index;
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
```

- 삭제 기능

```js
/** 투두 삭제 */
  const todoDelete = () => {
    const isOk = window.confirm("정말 삭제하시겠습니까?");
    if (isOk) {
      try {
        axios.post("http://localhost:3001/delete", {
          index: todo.idx,
        });
        window.location.reload();
      } catch (err: any) {
        console.log(err.message);
      }
    }
  };
```
