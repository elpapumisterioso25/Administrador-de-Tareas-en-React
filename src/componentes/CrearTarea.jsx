import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

const CrearTarea = ({ isOpen, onClose, onSubmit, initialTask = null }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending'); 
  const [formError, setFormError] = useState('');
  const modalRef = useRef(null);

  useEffect(() => {
    if (initialTask) {
      setName(initialTask.name);
      setDescription(initialTask.description);
      setStatus(initialTask.completed ? 'completed' : 'pending');
    } else {
      setName('');
      setDescription('');
      setStatus('pending'); 
    }
  }, [initialTask]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !description.trim()) {
      setFormError('Ambos campos son requeridos');
      return;
    }

    setFormError('');
    onSubmit({
      id: initialTask?.id || Date.now(),
      name,
      description,
      completed: status === 'completed',
    });
    onClose();
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-gray-500/75 bg-opacity-50 flex items-center justify-center z-50">
      <div ref={modalRef} className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">
          {initialTask ? 'Editar Tarea' : 'Añadir Tarea'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
              Nombre:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 p-2 w-full rounded"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 font-medium mb-1">
              Descripción:
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-gray-300 p-2 w-full rounded"
            />
          </div>

     
          <div className="mb-4">
            <label htmlFor="status" className="block text-gray-700 font-medium mb-1">
              Estado:
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border border-gray-300 p-2 w-full rounded bg-white"
            >
              <option value="pending">Pendiente</option>
              <option value="completed">Finalizado</option>
            </select>
          </div>

          {formError && <p className="text-red-500 mb-4">{formError}</p>}

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-4 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600"
            >
              {initialTask ? 'Guardar' : 'Crear'}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default CrearTarea;
