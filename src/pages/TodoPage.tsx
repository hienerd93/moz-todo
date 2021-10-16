import { useState, useRef, useEffect } from "react";
import FilterButton from "../components/FilterButton";
import Form from "../components/Form";
import Todo from "../components/Todo";
import { TodoStatus } from "../core/constants/TodoStatus";
import { usePrevious } from "../hooks/usePrevious";
import { useSelector, useDispatch } from "react-redux";
import {
  addTodo,
  deleteTodo,
  editTodo,
  toggleTodoCompleted,
} from "../store/todoSlice";
import { RootState } from "../store/store";

const FILTER_MAP: { [key: string]: (task: TodoStatus) => boolean } = {
  All: () => true,
  Active: (task: TodoStatus) => !task.completed,
  Completed: (task: TodoStatus) => task.completed,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

export default function TodoPages() {
  const tasks = useSelector((state: RootState) => state.todo.todoList);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState("All");
  const listHeadingRef = useRef<HTMLHeadingElement>(null);
  const prevTaskLength = usePrevious<number>(tasks.length);

  const addTask = (name: string) => {
    if (name === "") return;
    dispatch(addTodo(name));
  };
  const toggleTaskCompleted = (id: string) => {
    dispatch(toggleTodoCompleted(id));
  };
  const deleteTask = (id: string) => {
    dispatch(deleteTodo(id));
  };
  const editTask = (id: string, newName: string) => {
    if (newName === "") return;

    dispatch(editTodo({ id, newName }));
  };

  useEffect(() => {
    if (prevTaskLength && tasks.length - prevTaskLength === -1) {
      listHeadingRef.current?.focus();
    }
  }, [tasks.length, prevTaskLength]);

  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map((task) => (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    ));
  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${tasksNoun} remaining`;
  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  return (
    <div className="todo-app stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">{filterList}</div>
      <h2 id="list-heading" tabIndex={-1} ref={listHeadingRef}>
        {headingText}
      </h2>
      <ul
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}
