import React from 'react'
import TaskItem from './TaskItem'


const TodoList = ({tasks, toggleTask, removeTask}) => {

  return (
    <div className="w-full max-w-md mt-4">
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <TaskItem
            key={task.id}
            id={task.id}
            task={task}
            toggleTask={toggleTask}
            removeTask={removeTask}
          />
        ))
      ) : (
        <p className="flex justify-center font-bold">No todos found</p>
      )}
    </div>
  );
}

export default TodoList