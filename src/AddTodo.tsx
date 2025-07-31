import React, { useState } from "react";

interface AddTodoProps {
  onAddTask: (text: string) => void;
}

export function AddTodo({ onAddTask }: AddTodoProps) {
  const [newTask, setNewTask] = useState("");

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      onAddTask(newTask.trim());
      setNewTask("");
    }
  };

  return (
    <div className="card" style={{
      display: "flex",
      flexDirection: "column",
      padding: "0.5rem",
    }}>
      <input
        type="text"
        value={newTask}
        onChange={handleInputChange}
        placeholder="Add new task"
      />
      <button
        title="Add new task"
        type="button"
        className="btn"
        onClick={handleAddTask}
      >
        Add
      </button>
    </div>
  );
}
