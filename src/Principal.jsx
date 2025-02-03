import React, { useState } from 'react';
import TaskList from './componentes/TaskList';
import TaskFormModal from './componentes/TaskFormModal';
import useLocalStorage from './hook/useLocalStorage';
import FilterTabs from './componentes/FilterTabs';

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
        if(editingTask) {
            handleUpdateTask(task);
        } else {
            handleAddTask(task);
        }
    }

    const handleFilterChange = (filter) => {
      setActiveFilter(filter);
    };

    const filteredTasks = () => {
        switch(activeFilter) {
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
        <button onClick={handleOpenModal} className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 mb-4">
            Añadir Nueva Tarea
        </button>
         <FilterTabs activeFilter={activeFilter} onFilterChange={handleFilterChange}/>
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
        </div>
    </div>
  );
}

export default Principal;