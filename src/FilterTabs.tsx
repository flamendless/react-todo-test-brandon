import React, { useState } from "react";

interface FilterTabsProps {
  current: string;
  onFilterChange: (filter: string) => void;
}

export function FilterTabs({
  current,
  onFilterChange,
}: FilterTabsProps) {
  const getTabStyle = (buttonType) => ({
    fontWeight: current === buttonType ? "bold" : "normal",
    backgroundColor: current === buttonType ? "#aaa" : "#1a1a1a",
    padding: "0.5rem 1rem",
    cursor: "pointer",
  });

  return (
    <div className="subcard" style={{
      display: "flex",
      justifyContent: "space-evenly",
    }}>
      <button title="Filter by All" style={getTabStyle("all")} onClick={() => onFilterChange("all")}>All</button>
      <button title="Filter by Active" style={getTabStyle("active")} onClick={() => onFilterChange("active")}>Active</button>
      <button title="Filter by Completed" style={getTabStyle("completed")} onClick={() => onFilterChange("completed")}>Completed</button>
    </div>
  );
}
