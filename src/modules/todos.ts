// Action Type 정의
const ADD_TODO = "todos/ADD_TODO" as const;
const TOGGLE_TODO = "todos/TOGGLE_TODO" as const;
const DELETE_TODO = "todos/DELETE_TODO" as const;

// action 생성 함수
export const addTodo = (text: string) => ({
  type: ADD_TODO,
  payload: text,
});

export const toggleTodo = (id: number) => ({
  type: TOGGLE_TODO,
  payload: id,
});

export const deleteTodo = (id: number) => ({
  type: DELETE_TODO,
  payload: id,
});

// action type
export type TodoAction =
  | ReturnType<typeof addTodo>
  | ReturnType<typeof toggleTodo>
  | ReturnType<typeof deleteTodo>;

// type 초기값
export type Todo = {
  idx: number;
  content: string;
  isDone: number;
};

export type TodosState = Todo[];

const initialState: TodosState = [
  {
    idx: 1234,
    content: "타입스크립트 공부하기",
    isDone: 0,
  },
  {
    idx: 555,
    content: "할일 완료!",
    isDone: 0,
  },
];

// reducer
function todoReducer(
  state: TodosState = initialState,
  action: TodoAction
): TodosState {
  switch (action.type) {
    case ADD_TODO:
      return state.concat({
        idx: Date.now(),
        content: action.payload,
        isDone: 0,
      });

    case TOGGLE_TODO:
      return state.map((todo) =>
        todo.idx === action.payload ? { ...todo, isDone: 1 } : todo
      );

    case DELETE_TODO:
      return state.filter((todo) => todo.idx !== action.payload);

    default:
      return state;
  }
}
export default todoReducer;
