import React, { useState } from 'react';
import TaskList from './componentes/ListaTareas';
import TaskFormModal from './componentes/CrearTarea';
import useLocalStorage from './hook/useLocalStorage';
import FilterTabs from './componentes/Filtro';

function Principal() {
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all')

  const handleAddTask = (task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  const handleUpdateTask = (updatedTask) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );
  };

  const handleToggleStatus = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };


  const handleEditTask = (id) => {
    const taskToEdit = tasks.find(task => task.id === id);
    setEditingTask(taskToEdit);
    setIsModalOpen(true);
  };

  const handleOpenModal = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const handleSubmit = (task) => {
    if (editingTask) {
      handleUpdateTask(task);
    } else {
      handleAddTask(task);
    }
  }

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const filteredTasks = () => {
    switch (activeFilter) {
      case 'pending':
        return tasks.filter(task => !task.completed);
      case 'completed':
        return tasks.filter(task => task.completed);
      default:
        return tasks;
    }
  }


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Administrador de Tareas</h1>
      <div className="mb-4">

        <FilterTabs activeFilter={activeFilter} onFilterChange={handleFilterChange} />
        <TaskList
          tasks={filteredTasks()}
          onToggleStatus={handleToggleStatus}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
        />
        <TaskFormModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
          initialTask={editingTask}
        />
        <button onClick={handleOpenModal} className="fixed bottom-13 left-7 md:bottom-12 md:left-45 bg-green-500 text-white w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center hover:bg-green-600 transition-transform ">
          <strong>+</strong>
        </button>
      </div>
    </div>
  );
}

export default Principal;