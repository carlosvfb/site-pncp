import React, { useState, useEffect } from 'react';

interface FilterProps {
  onApplyFilters: (filters: { usuarioNome: string; modalidadeNome: string; dataFinal: string }) => void;
  options: { [key: string]: string[] };
}

const Filter: React.FC<FilterProps> = ({ onApplyFilters, options }) => {
  const today = new Date().toISOString().split('T')[0]; // Obtém a data atual no formato YYYY-MM-DD
  const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string }>({});
  const [selectedDate, setSelectedDate] = useState<string>(today);

  const handleSelectChange = (field: string, event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOptions({ ...selectedOptions, [field]: event.target.value });
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  const handleApplyFilters = () => {
    onApplyFilters({
      usuarioNome: selectedOptions['usuarioNome'] || '',
      modalidadeNome: selectedOptions['modalidadeNome'] || '',
      dataFinal: selectedDate || '',
    });
  };

  return (
    <div className="mb-4">
      {Object.keys(options).map((field) => (
        <div key={field} className="mb-4">
          <label htmlFor={`filter-${field}`} className="mr-2">Filtrar por {field}:</label>
          <select
            id={`filter-${field}`}
            value={selectedOptions[field] || ''}
            onChange={(e) => handleSelectChange(field, e)}
            className="border border-gray-300 rounded p-2 mb-2 w-full"
          >
            <option value="">Todos</option>
            {options[field].map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      ))}
      <div className="mb-4">
        <label htmlFor="filter-dataFinal" className="mr-2">Filtrar por Data Final:</label>
        <input
          id="filter-dataFinal"
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="border border-gray-300 rounded p-2 mb-2 w-full"
        />
      </div>
      <button
        onClick={handleApplyFilters}
        className="px-4 py-2 bg-blue-500 text-white border border-blue-700 rounded"
      >
        Aplicar Filtros
      </button>
    </div>
  );
};

export default Filter;
