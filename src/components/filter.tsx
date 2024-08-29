import React, { useState, useEffect } from 'react';

const formatDateToYYYYMMDD = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}${month}${day}`;
};

const getDefaultEndDate = (): string => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1); 
  return formatDateToYYYYMMDD(tomorrow); 
};

interface FilterProps {
  onApplyFilters: (filters: { dataFinal: string; uf: string }) => void;
}

const Filter: React.FC<FilterProps> = ({ onApplyFilters }) => {
  const [endDate, setEndDate] = useState<string>(getDefaultEndDate());
  const [uf, setUf] = useState<string>('');

  useEffect(() => {
    const savedFilters = localStorage.getItem('filters');
    if (savedFilters) {
      const { dataFinal, uf } = JSON.parse(savedFilters);
      setEndDate(dataFinal || getDefaultEndDate());
      setUf(uf || '');
    }
  }, []);

  const handleApply = () => {
    const filters = {
      dataFinal: endDate,
      uf: uf
    };
    onApplyFilters(filters);
    localStorage.setItem('filters', JSON.stringify(filters));
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.replace(/[^0-9]/g, '');
    if (inputValue.length <= 8) {
      setEndDate(inputValue);
    }
  };

  const handleUfChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.toUpperCase();
    setUf(inputValue);
  };

  return (
    <div className="mb-4">
      <div className="mb-2 flex gap-2 items-center">
        <label htmlFor="uf" className="text-lg font-bold text-blue-500">UF:</label>
        <input
          type="text"
          name="uf"
          id="uf"
          value={uf}
          onChange={handleUfChange}
          className="mt-1 w-32 border-black border-2 rounded-md shadow-sm"
          placeholder="Digite a UF..."
          maxLength={2}
        />
      </div>
      <div className="mb-2 flex gap-2 items-center">
        <label htmlFor="dataFinal" className="text-lg font-bold text-blue-500">Data Final:</label>
        <input
          type="text"
          name="dataFinal"
          id="dataFinal"
          value={endDate}
          onChange={handleDateChange}
          className="mt-1 w-32 border-black border-2 rounded-md shadow-sm"
          placeholder="YYYYMMDD"
          maxLength={8}
        />
      </div>
      <button type="button" onClick={handleApply} className="px-4 py-2 bg-blue-500 text-white rounded-md">Aplicar Filtros</button>
    </div>
  );
};

export default Filter;
