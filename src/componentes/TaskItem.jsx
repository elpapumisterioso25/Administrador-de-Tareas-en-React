import React from 'react';

const TaskItem = ({ task, onToggleStatus, onEdit, onDelete }) => {
  return (
    <div className="bg-white p-4 rounded shadow-md flex items-center justify-between mb-2">
      <div>
        <h3 className={`font-semibold ${task.completed ? 'line-through text-gray-500' : ''}`}>{task.name}</h3>
        <p className={`text-gray-600 ${task.completed ? 'line-through text-gray-500' : ''}`}>{task.description}</p>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => onToggleStatus(task.id)}
          className={`py-1 px-2 rounded text-white ${task.completed ? 'bg-green-500' : 'bg-yellow-500'}`}
        >
          {task.completed ? '✅' : '⏳'}
        </button>
        <button
          onClick={() => onEdit(task.id)}
          className="py-1 px-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          ✏️
        </button>
        <button
            onClick={() => onDelete(task.id)}
            className="py-1 px-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
            🗑️
        </button>
      </div>
    </div>
  );
};

export default TaskItem;