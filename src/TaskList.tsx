import React, { useState } from "react";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface TaskListProps {
  tasksToRender: Task[];
  onToggleComplete: (id: number) => void;
  onDeleteTask: (id: number) => void;
}

export function TaskList({
  tasksToRender,
  onToggleComplete,
  onDeleteTask,
}: TaskListProps) {
  return (
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
            justifyContent: "space-between",
            marginLeft: "0.5rem",
            marginRight: "0.5rem",
          }}>
            <div>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggleComplete(task.id)}
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
            </div>
            <a onClick={(evt) => {
                evt.preventDefault();
                onDeleteTask(task.id);
              }}
            >
              x
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
