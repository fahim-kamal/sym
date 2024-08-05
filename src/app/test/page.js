"use client";

import TaskProvider from "@/context/taskContext";

import TaskList from "@/components/tasklist/tasklist";

export default function Test() {
  return (
    <div>
      <TaskProvider>
        <TaskList />
      </TaskProvider>
    </div>
  );
}
