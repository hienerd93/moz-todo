import React from "react";
import FilterButton from "../components/FilterButton";
import Form from "../components/Form";
import Todo from "../components/Todo";
import { TodoStatus } from "../core/constants/TodoStatus";
import { nanoid } from "nanoid";
import { usePrevious } from "../hooks/usePrevious";

const DATA: TodoStatus[] = [
  { id: "todo-0", name: "Eat", completed: true },
  { id: "todo-1", name: "Sleep", completed: false },
  { id: "todo-2", name: "Repeat", completed: false },
];

const FILTER_MAP: { [key: string]: (task: TodoStatus) => boolean } = {
  All: () => true,
  Active: (task: TodoStatus) => !task.completed,
  Completed: (task: TodoStatus) => task.completed,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

export default function TodoPages() {
  const [tasks, setTasks] = React.useState(DATA);
  const [filter, setFilter] = React.useState("All");
  const listHeadingRef = React.useRef<HTMLHeadingElement>(null);
  const prevTaskLength = usePrevious<number>(tasks.length);

  const addTask = (name: string) => {
    const newTask = { id: "todo-" + nanoid(), name: name, completed: false };
    setTasks([...tasks, newTask]);
  };
  const toggleTaskCompleted = (id: string) => {
    const updatedTasks = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };
  const deleteTask = (id: string) => {
    const remainingTasks = tasks.filter((task) => task.id !== id);
    setTasks(remainingTasks);
  };
  function editTask(id: string, newName: string) {
    const editedTaskList = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, name: newName };
      }
      return task;
    });
    setTasks(editedTaskList);
  }

  React.useEffect(() => {
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
