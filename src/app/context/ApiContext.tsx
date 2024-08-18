'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchContracts } from '../lib/api';

export interface Contract {
  numeroControlePNCP: string;
  modalidadeNome: string;
  anoCompra: number;
  sequencialCompra: number;
  orgaoEntidade: {
    cnpj: string;
    razaoSocial: string;
  };
  dataInclusao: string;
  numeroCompra: string;
  unidadeOrgao: {
    ufNome: string;
    nomeUnidade: string;
  };
  objetoCompra: string;
}

interface ApiContextProps {
  contracts: Contract[];
  loading: boolean;
  error: string | null;
}

const ApiContext = createContext<ApiContextProps | undefined>(undefined);

export const ApiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [contracts, setContracts] = useState("");
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
    <ApiContext.Provider value={{ contracts, loading, error }}>
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
