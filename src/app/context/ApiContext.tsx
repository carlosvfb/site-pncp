'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchContracts } from '../lib/api';
import { Contratacao } from '@/components/contratacoes';

interface ApiContextProps {
  contracts: Contratacao[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

const ApiContext = createContext<ApiContextProps | undefined>(undefined);

export const ApiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [contracts, setContracts] = useState<Contratacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const loadContracts = async () => {
      setLoading(true);
      try {
        const { data, totalPages } = await fetchContracts(currentPage);
        setContracts(data);
        setTotalPages(totalPages);
      } catch (error) {
        setError('Failed to fetch contracts');
      } finally {
        setLoading(false);
      }
    };

    loadContracts();
  }, [currentPage]); // Dependência de currentPage

  return (
    <ApiContext.Provider value={{ contracts, loading, error, currentPage, totalPages, setCurrentPage }}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApi must be used within an ApiProvider');
  }
  return context;
};
