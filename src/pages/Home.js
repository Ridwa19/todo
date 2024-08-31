import React from "react";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import { Outlet } from "react-router-dom";

const Home = ({ tasks, addTask, toggleTask, removeTask }) => {
  return (
    <div className="flex justify-center gap-3 w-full ">
      <div className="flex w-full max-w-4xl bg-red gap-3 ">
        <TodoForm addTask={addTask} />
        <TodoList
          tasks={tasks}
          toggleTask={toggleTask}
          removeTask={removeTask}
        />
      </div>
      <Outlet />
    </div>
  );
};

export default Home;
