import {
  useState,
  useEffect,
  useRef,
  ChangeEventHandler,
  SyntheticEvent,
} from "react";

type TodoProps = {
  name: string;
  completed: boolean;
  id: string;
  toggleTaskCompleted: (id: string) => void;
  deleteTask: (id: string) => void;
  editTask: (id: string, newName: string) => void;
};

export default function Todo({
  name,
  completed,
  id,
  toggleTaskCompleted,
  deleteTask,
  editTask,
}: TodoProps) {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const editFieldRef = useRef<HTMLInputElement>(null);
  const editButtonRef = useRef<HTMLButtonElement>(null);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setNewName(e.target.value);
  };
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    editTask(id, newName);
    setNewName("");
    setEditing(false);
  };

  useEffect(() => {
    if (isEditing) {
      editFieldRef.current?.focus();
    } else {
      editButtonRef.current?.focus();
    }
  }, [isEditing]);

  const editingTemplate = (
    <form className="stack-small" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="todo-label" htmlFor={id}>
          New name for {name}
        </label>
        <input
          id={id}
          className="todo-text"
          type="text"
          value={newName}
          onChange={handleChange}
          ref={editFieldRef}
        />
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn todo-cancel"
          onClick={() => setEditing(false)}
        >
          Cancel
          <span className="visually-hidden">renaming {name}</span>
        </button>
        <button type="submit" className="btn btn__primary todo-edit">
          Save
          <span className="visually-hidden">new name for {name}</span>
        </button>
      </div>
    </form>
  );
  const viewTemplate = (
    <div className="stack-small">
      <div className="c-cb">
        <input
          id={id}
          type="checkbox"
          defaultChecked={completed}
          onChange={() => toggleTaskCompleted(id)}
        />
        <label className="todo-label" htmlFor={id}>
          {name}
        </label>
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn"
          onClick={() => setEditing(true)}
          ref={editButtonRef}
        >
          Edit <span className="visually-hidden">{name}</span>
        </button>
        <button
          type="button"
          className="btn btn__danger"
          onClick={() => deleteTask(id)}
        >
          Delete <span className="visually-hidden">{name}</span>
        </button>
      </div>
    </div>
  );

  return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>;
}
