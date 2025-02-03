import React from 'react';

const FilterTabs = ({ activeFilter, onFilterChange }) => {
  return (
    <div className="flex justify-center space-x-4 mb-4">
      <button
        className={`py-2 px-4 rounded ${
          activeFilter === 'all'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 hover:bg-gray-300'
        }`}
        onClick={() => onFilterChange('all')}
      >
        Todas
      </button>
      <button
        className={`py-2 px-4 rounded ${
          activeFilter === 'pending'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 hover:bg-gray-300'
        }`}
        onClick={() => onFilterChange('pending')}
      >
        Pendientes
      </button>
      <button
        className={`py-2 px-4 rounded ${
          activeFilter === 'completed'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 hover:bg-gray-300'
        }`}
        onClick={() => onFilterChange('completed')}
      >
        Finalizadas
      </button>
    </div>
  );
};

export default FilterTabs;