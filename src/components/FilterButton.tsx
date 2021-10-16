import React from "react";

type ButtonProps = {
  name: string;
  isPressed: boolean;
  setFilter: (name: string) => void;
};

export default function FilterButton({
  name,
  isPressed,
  setFilter,
}: ButtonProps) {
  return (
    <button
      type="button"
      className="btn toggle-btn"
      aria-pressed={isPressed}
      onClick={() => setFilter(name)}
    >
      <span className="visually-hidden">Show </span>
      <span>{name}</span>
      <span className="visually-hidden"> tasks</span>
    </button>
  );
}
