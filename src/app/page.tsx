'use client';

import { ApiProvider, useApi } from "./context/ApiContext";
import { TablePage } from "@/components/contratacoes";

const HomePage: React.FC = () => {
  const { contracts, loading, error } = useApi();
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return <TablePage contratacoes={contracts} /> 
  
};

const PageWithProvider: React.FC = () => (
  <ApiProvider>
    <HomePage />
  </ApiProvider>
);

export default PageWithProvider;
