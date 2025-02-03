import React from 'react';
import TaskItem from './Botones';

const ListaTareas = ({ tasks, onToggleStatus, onEdit, onDelete }) => {
  return (
    <div className="mt-4">
      {tasks.length === 0 ? (
        <p className="text-gray-500 text-center">No hay tareas en esta lista.</p>
      ) : (
        tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggleStatus={onToggleStatus}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  );
};

export default ListaTareas;