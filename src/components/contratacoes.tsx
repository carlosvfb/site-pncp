'use client';

import React, { useState, useEffect } from 'react';
import { useApi } from '../app/context/ApiContext';
import Pagination from './pagination';
import Filter from './filter';
import { fetchContracts } from '../app/lib/api'; // Certifique-se de importar a função correta

export interface Contratacao {
  numeroControlePNCP: string;
  modalidadeId: number;
  modalidadeNome: string;
  numeroCompra: string;
  anoCompra: number;
  orgaoEntidade: {
    razaoSocial: string;
    cnpj: string;
  };
  dataInclusao: string;
  dataEncerramentoProposta: string;
  unidadeOrgao: {
    codigoUnidade: string;
    nomeUnidade: string;
  };
  usuarioNome: string;
  sequencialCompra: string;
}

const uniqueOptions = (contratacoes: Contratacao[], field: keyof Contratacao) => {
  const options = new Set<string>();

  contratacoes.forEach(item => {
    let value: string;
    if (typeof item[field] === 'string') {
      value = item[field];
    } else if (typeof item[field] === 'number') {
      value = item[field].toString();
    } else {
      value = JSON.stringify(item[field]);
    }
    options.add(value);
  });

  return Array.from(options);
};

export function ContratacoesPage() {
  const { contracts, loading, error, currentPage, totalPages, setCurrentPage } = useApi();
  const [filteredContratacoes, setFilteredContratacoes] = useState<Contratacao[]>(contracts);
  const [filters, setFilters] = useState<{ usuarioNome: string; modalidadeNome: string; dataFinal: string }>({
    usuarioNome: '',
    modalidadeNome: '',
    dataFinal: new Date().toISOString().split('T')[0] // Data padrão: hoje
  });

  useEffect(() => {
    const applyFilters = () => {
      let results = contracts;

      if (filters.usuarioNome) {
        results = results.filter((item) => item.usuarioNome === filters.usuarioNome);
      }

      if (filters.modalidadeNome) {
        results = results.filter((item) => item.modalidadeNome === filters.modalidadeNome);
      }

      if (filters.dataFinal) {
        results = results.filter((item) => new Date(item.dataEncerramentoProposta).toISOString().split('T')[0] === filters.dataFinal);
      }

      setFilteredContratacoes(results);
    };

    applyFilters();
  }, [filters, contracts]);

  const handleApplyFilters = async (newFilters: { usuarioNome: string; modalidadeNome: string; dataFinal: string }) => {
    setFilters(newFilters);
    try {
      const { data, totalPages } = await fetchContracts(1, 20, newFilters.dataFinal); // Atualiza com a data selecionada
      setFilteredContratacoes(data);
      // Assumindo que você tem funções para atualizar a página e totalPages
      setCurrentPage(1);
      // Atualize totalPages se necessário
    } catch (error) {
      console.error('Erro ao carregar dados filtrados:', error);
    }
  };

  if (error) {
    return <div><p>Erro ao carregar dados: {error}</p></div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Detalhes das Contratações Públicas</h1>
      <Filter
        onApplyFilters={handleApplyFilters}
        options={{
          usuarioNome: uniqueOptions(contracts, 'usuarioNome'),
          modalidadeNome: uniqueOptions(contracts, 'modalidadeNome'),
        }}
      />

      <table className="min-w-full border border-gray-200 table-auto">
        <thead className="bg-gray-700 text-white">
          <tr>
            <th className="py-2 px-4 border-r">Código da Unidade</th>
            <th className="py-2 px-4 border-r">Nome da Unidade</th>
            <th className="py-2 px-4 border-r">Número da Compra</th>
            <th className="py-2 px-4 border-r">Data de Encerramento da Proposta</th>
            <th className="py-2 px-4 border-r">Fonte</th>
            <th className="py-2 px-4 border-r">Nome da Modalidade</th>
            <th className="py-2 px-4 border-r">Detalhes</th>
          </tr>
        </thead>
        <tbody>
          {filteredContratacoes.map((contratacao) => (
            <tr key={contratacao.numeroControlePNCP} className="border-b cursor-pointer">
              <td className="py-2 px-4 border-r">{contratacao.unidadeOrgao.codigoUnidade}</td>
              <td className="py-2 px-4 border-r">{contratacao.unidadeOrgao.nomeUnidade}</td>
              <td className="py-2 px-4 border-r">{contratacao.numeroCompra}/{contratacao.anoCompra}</td>
              <td className="py-2 px-4 border-r">{new Date(contratacao.dataEncerramentoProposta).toLocaleDateString()}</td>
              <td className="py-2 px-4 border-r">{contratacao.usuarioNome}</td>
              <td className="py-2 px-4 border-r">{contratacao.modalidadeNome}</td>
              <td>
                <a 
                  href={`/contract/${contratacao.orgaoEntidade.cnpj}?sequencial=${contratacao.sequencialCompra}&ano=${contratacao.anoCompra}`} target='_blank'
                  className="text-blue-500"
                >
                  Detalhes
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {loading && <p>Loading...</p>}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page: number) => setCurrentPage(page)}
      />
    </div>
  );
}
