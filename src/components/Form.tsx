import { useState } from "react";

type FormProps = {
  addTask: (name: string) => void;
};

export default function Form({ addTask }: FormProps) {
  const [name, setName] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    addTask(name);
    setName("");
  };
  const handleChange = (e: any) => {
    setName(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          What needs to be done?
        </label>
      </h2>
      <input
        type="text"
        id="new-todo-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
        value={name}
        onChange={handleChange}
      />
      <button type="submit" className="btn btn__primary btn__lg">
        Add
      </button>
    </form>
  );
}
