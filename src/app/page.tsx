'use client';

import { ApiProvider, useApi } from "./context/ApiContext";
import { ContratacoesPage } from "@/components/contratacoes";

const HomePage: React.FC = () => {
  const { contracts, loading, error } = useApi();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <ContratacoesPage contratacao={contracts} />  
    </div>
  );
};

const PageWithProvider: React.FC = () => (
  <ApiProvider>
    <HomePage />
  </ApiProvider>
);

export default PageWithProvider;
