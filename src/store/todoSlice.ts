import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TodoStatus } from "../core/constants/TodoStatus";
import { nanoid } from "nanoid";

export interface TodoState {
  todoList: TodoStatus[];
}

const initialState: TodoState = {
  todoList: [
    { id: "todo-0", name: "Eat", completed: true },
    { id: "todo-1", name: "Sleep", completed: false },
    { id: "todo-2", name: "Repeat", completed: false },
  ],
};

// TODO: write with create Async Thunk handle call api

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      const newTask = {
        id: "todo-" + nanoid(),
        name: action.payload,
        completed: false,
      };
      state.todoList = [...state.todoList, newTask];
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      const remainingTasks = state.todoList.filter(
        (task) => task.id !== action.payload
      );
      state.todoList = remainingTasks;
    },
    editTodo: (
      state,
      action: PayloadAction<{ id: string; newName: string }>
    ) => {
      const editedTaskList = state.todoList.map((task) => {
        if (action.payload.id === task.id) {
          return { ...task, name: action.payload.newName };
        }
        return task;
      });
      state.todoList = editedTaskList;
    },
    toggleTodoCompleted: (state, action: PayloadAction<string>) => {
      const updatedTasks = state.todoList.map((task) => {
        if (action.payload === task.id) {
          return { ...task, completed: !task.completed };
        }
        return task;
      });
      state.todoList = updatedTasks;
    },
    // TODO: use create Async Thunk get payload
  },
});

export const { addTodo, deleteTodo, editTodo, toggleTodoCompleted } =
  todoSlice.actions;

export default todoSlice.reducer;
