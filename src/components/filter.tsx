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
  onApplyFilters: (filters: { usuarioNome: string; modalidadeNome: string; dataFinal: string; uf: string }) => void;
  options: { [key: string]: string[] };
}

const Filter: React.FC<FilterProps> = ({ onApplyFilters, options }) => {
  const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string }>({});
  const [endDate, setEndDate] = useState<string>(getDefaultEndDate());
  const [uf, setUf] = useState<string>(''); // Estado para UF

  useEffect(() => {
    const savedFilters = localStorage.getItem('filters');
    if (savedFilters) {
      const { dataFinal, uf } = JSON.parse(savedFilters);
      setEndDate(dataFinal || getDefaultEndDate());
      setUf(uf || '');
    }
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setSelectedOptions(prev => ({ ...prev, [name]: value }));
  };

  const handleApply = () => {
    const filters = {
      usuarioNome: selectedOptions.usuarioNome || '',
      modalidadeNome: selectedOptions.modalidadeNome || '',
      dataFinal: endDate,
      uf: uf // Adiciona UF aos filtros
    };

    onApplyFilters(filters);  // Passa os filtros para a função de callback
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.replace(/[^0-9]/g, ''); // Remove caracteres não numéricos
    
    if (inputValue.length <= 8) { // Limita a entrada a 8 caracteres (YYYYMMDD)
      setEndDate(inputValue);
    }
  };

  const handleUfChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.toUpperCase(); // Converte a UF para maiúsculas
    setUf(inputValue);
  };

  return (
    <div className="mb-4">
      {/* Campos de filtro opcionais para usuárioNome e modalidadeNome */}
      {/* <div className="mb-2">
        <label htmlFor="usuarioNome" className="block text-sm font-medium text-gray-700">Nome do Usuário</label>
        <select name="usuarioNome" id="usuarioNome" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" onChange={handleChange}>
          <option value="">Todos</option>
          {options.usuarioNome.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>
      <div className="mb-2">
        <label htmlFor="modalidadeNome" className="block text-sm font-medium text-gray-700">Modalidade</label>
        <select name="modalidadeNome" id="modalidadeNome" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" onChange={handleChange}>
          <option value="">Todos</option>
          {options.modalidadeNome.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div> */}
      <div className="mb-2 flex gap-2 items-center">
        <label htmlFor="uf" className="text-lg font-bold text-blue-500 ">UF:</label>
        <input
          type="text"
          name="uf"
          id="uf"
          value={uf}  // Exibe a UF no campo de texto
          onChange={handleUfChange}  // Altera o texto ao digitar
          className="mt-1 w-32 border-black border-2 rounded-md shadow-sm"
          placeholder="Digite a UF..."
          maxLength={2} // Limita o número máximo de caracteres a 2 (para UF)
        />
      </div>
      <div className="mb-2 flex gap-2 items-center">
        <label htmlFor="dataFinal" className=" text-lg font-bold text-blue-500">Data Final:</label>
        <input
          type="text"
          name="dataFinal"
          id="dataFinal"
          value={endDate}  // Exibe a data no campo de texto
          onChange={handleDateChange}  // Altera o texto ao digitar
          className="mt-1 w-32 border-black border-2 rounded-md shadow-sm"
          placeholder="YYYYMMDD"
          maxLength={8} // Limita o número máximo de caracteres a 8 (YYYYMMDD)
        />
      </div>
      <button type="button" onClick={handleApply} className="px-4 py-2 bg-blue-500 text-white rounded-md">Aplicar Filtros</button>
    </div>
  );
};

export default Filter;
