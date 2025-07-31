import React, { useEffect, useMemo, useState } from "react";

import { AddTodo } from "./AddTodo";
import { TaskList } from "./TaskList";

export function ClunkyTodoList() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Learn React", completed: false },
    { id: 2, text: "Write code", completed: true },
    { id: 3, text: "Eat lunch", completed: false },
  ]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");
  const [multiWordsFilterEnabled, setMultiWordsFilterEnabled] = useState(false);

  const handleAddTask = (text: string) => {
    setTasks((prev) => [...prev, {
      id: Date.now(),
      text: text,
      completed: false,
    }]);
  };

  const handleDeleteAllCompletedTasks = () => {
    const confirmed = window.confirm("Are you sure you want to delete all completed tasks?");
    if (confirmed) {
      setTasks((prevTasks) => prevTasks.filter((task) => !task.completed));
    }
  };

  const handleToggleComplete = (id) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          completed: !task.completed,
        };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const [tasksToRender, setTasksToRender] = useState<any[]>([])
  useEffect(() => {
    let filteredTasks = tasks;
    if (filter === "completed") {
      filteredTasks = tasks.filter((task) => task.completed);
    } else if (filter === "active") {
      filteredTasks = tasks.filter((task) => !task.completed);
    }

    if (multiWordsFilterEnabled) {
      filteredTasks = filteredTasks.filter((task) => {
        const words = task.text.trim().split(/\s+/).length;
        return words >= 2;
      });
    }

    setTasksToRender(filteredTasks);
  }, [tasks, filter, multiWordsFilterEnabled]);

  const totalCount = useMemo(() => {
    return tasks.length;
  }, [tasks]);

  const completedTotalCount = useMemo(() => {
    return tasks.filter((task) => task.completed).length;
  }, [tasks]);

  const getTabStyle = (buttonType) => ({
    fontWeight: filter === buttonType ? "bold" : "normal",
    backgroundColor: filter === buttonType ? "#aaa" : "#1a1a1a",
    padding: "0.5rem 1rem",
    cursor: "pointer",
  });

  return (
    <div className="card" style={{
      display: "flex",
      flexDirection: "column",
      width: "50vw",
      margin: "auto",
      padding: "0.5rem",
      backgroundColor: "#1a1a1a",
      alignContent: "center",
    }}>
      <span style={{
        textAlign: "center",
      }}>
        <h1>To-Do List</h1>
        <h2>Items: {completedTotalCount}/{totalCount}</h2>
      </span>

      <AddTodo onAddTask={handleAddTask} />

      <div className="card" style={{
        display: "flex",
        flexDirection: "column",
      }}>
        <div className="subcard" style={{
          display: "flex",
          justifyContent: "space-evenly",
        }}>
          <button style={getTabStyle("all")} onClick={() => setFilter("all")}>All</button>
          <button style={getTabStyle("active")} onClick={() => setFilter("active")}>Active</button>
          <button style={getTabStyle("completed")} onClick={() => setFilter("completed")}>Completed</button>
        </div>

        <TaskList
          tasksToRender={tasksToRender}
          onToggleComplete={handleToggleComplete}
          onDeleteTask={
            (id) => setTasks((prev) => prev.filter(
              (task) => task.id !== id)
            )
          }
        />

        <div className="subcard" style={{
          display: "flex",
          justifyContent: "space-evenly",
        }}>
          <label
            style={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <input
              type="checkbox"
              checked={multiWordsFilterEnabled}
              onChange={() => setMultiWordsFilterEnabled((prev) => !prev)}
            />
            Multiple Words
          </label>

          <button
            className="btn"
            disabled={!tasks.some(task => task.completed)}
            onClick={handleDeleteAllCompletedTasks}
          >
            Delete All Completed
          </button>
        </div>
      </div>
    </div>
  );
}
