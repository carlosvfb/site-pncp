'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { fetchContracts } from '../lib/api';
import { Contratacao } from '@/components/contratacoes';

export interface ApiContextProps {
  contracts: Contratacao[];
  loading: boolean;
  error: string | null;
}

const ApiContext = createContext<ApiContextProps | undefined>(undefined);

export const ApiProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [contracts, setContracts] = useState<Contratacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadContracts = async () => {
      try {
        const data = await fetchContracts();
        console.log(data)
        setContracts(data);
      } catch (error) {
        setError('Failed to fetch contracts');
      } finally {
        setLoading(false);
      }
    };

    loadContracts();
  }, []);

  return (
    <ApiContext.Provider value={{ contracts, loading, error}}>
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
