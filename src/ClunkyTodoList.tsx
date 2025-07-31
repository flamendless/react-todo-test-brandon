import React, { useEffect, useMemo, useState } from "react";

import { AddTodo } from "./AddTodo";
import { FilterTabs } from "./FilterTabs";
import { MoreActions } from "./MoreActions";
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
        <FilterTabs
          current={filter}
          onFilterChange={setFilter}
        />

        <TaskList
          tasksToRender={tasksToRender}
          onToggleComplete={handleToggleComplete}
          onDeleteTask={
            (id) => setTasks((prev) => prev.filter(
              (task) => task.id !== id)
            )
          }
        />

        <MoreActions
          multiWordsFilterEnabled={multiWordsFilterEnabled}
          onMultiWordsFilterEnabled={() => setMultiWordsFilterEnabled((prev) => !prev)}
          isDisabled={!tasks.some(task => task.completed)}
          onDeleteAllCompletedTasks={handleDeleteAllCompletedTasks}
        />
      </div>
    </div>
  );
}
