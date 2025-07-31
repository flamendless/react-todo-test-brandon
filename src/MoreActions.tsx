import React, { useState } from "react";

interface MoreActionsProps {
  multiWordsFilterEnabled: bool;
  onMultiWordsFilterEnabled: (bool) => void;
  isDisabled: bool;
  onDeleteAllCompletedTasks: () => void;
}

export function MoreActions({
  multiWordsFilterEnabled,
  onMultiWordsFilterEnabled,
  isDisabled,
  onDeleteAllCompletedTasks,
}: MoreActionsProps) {
  return (
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
          onChange={onMultiWordsFilterEnabled}
        />
        Multiple Words
      </label>

      <button
        title="Delete all completed tasks"
        className="btn"
        disabled={isDisabled}
        onClick={onDeleteAllCompletedTasks}
      >
        Delete All Completed
      </button>
    </div>
  );
}
