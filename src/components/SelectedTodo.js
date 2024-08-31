import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SelectedTodo = ({ tasks }) => {
  const { todoIndex } = useParams();
  const todo = tasks[todoIndex];



  return (
    <div className="flex flex-col w-full max-w-sm mt-4">
      <h1 className="text-3xl font-bold">Todo details</h1>
      <h2 className="text-2xl font-bold">Todo ID: {todoIndex}</h2>
      <h3 className="text-1xl font-bold">Todo text: {todo.text}</h3>
      <h4>Todo status: {todo.completed ? "Completed" : "Not completed"}</h4>
    </div>
  );
};

export default SelectedTodo;
