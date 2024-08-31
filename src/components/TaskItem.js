import React from 'react'
import { PencilLineIcon, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const TaskItem = ({id, task, toggleTask, removeTask}) => {
  return (
    <div
      className={`flex items-center justify-between p-2 mb-2 border rounded-md ${
        task.completed ? "bg-gray-300" : "bg-gray-100"
      }`}
    >
      <input
        type="checkbox"
        className="mr-2 p-2"
        checked={task.completed}
        onChange={() => toggleTask(id, task.completed)}
      />
      <span
        className={`flex-1 ${
          task.completed ? "line-through" : ""
        } cursor-pointer`}
        onClick={() => toggleTask(id, task.completed)}
      >
        {task.text}
      </span>
      <div className="flex gap-2">
        <Link to={`/todo/${id}`}>
          <PencilLineIcon className="text-blue-500" size={20} />
        </Link>

        <button
          onClick={() => removeTask(id)}
          className="text-red-500 hover:text-red-700"
        >
          <XCircle size={20} />
        </button>
      </div>
    </div>
  );
}

export default TaskItem