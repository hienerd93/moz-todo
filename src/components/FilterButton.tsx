import React from "react";

type ButtonProp = {
  name: string;
  isPressed: boolean;
  setFilter: (name: string) => void;
};

const FilterButton: React.VFC<ButtonProp> = ({
  name,
  isPressed,
  setFilter,
}) => {
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
};

export default FilterButton;
