import React, { useEffect, useMemo, useState } from "react";

export function ClunkyTodoList() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Learn React", completed: false },
    { id: 2, text: "Write code", completed: true },
    { id: 3, text: "Eat lunch", completed: false },
  ]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      const tempTasks = [...tasks];
      tempTasks.push({ id: Date.now(), text: newTask, completed: false });
      setTasks(tempTasks);
      setNewTask("");
    }
  };

  const handleToggleComplete = (id) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        let tempTask = { id: task.id, text: task.text, completed: task.completed };
        tempTask.completed = !tempTask.completed;
        return tempTask;
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
    setTasksToRender(filteredTasks);
  }, [tasks, filter]);

  const totalCount = useMemo(() => {
    return tasks.length;
  }, []);

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
        <button className="btn" onClick={handleAddTask}>Add</button>
      </div>

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

        <div style={{
            overflowY: "scroll",
            height: "30vh",
        }}>
          <ul style={{
            listStyleType: "none",
            padding: "0.5rem",
          }}>
            {tasksToRender.map((task, index) => (
              <li key={index} style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "0.5rem",
                marginRight: "0.5rem",
              }}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleComplete(task.id)}
                />
                <span
                  style={{
                    textDecoration: task.completed ? "line-through" : "none",
                    whitespace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {task.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
