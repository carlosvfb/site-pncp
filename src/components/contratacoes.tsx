'use client';

import React, { useState, useEffect } from 'react';
import { useApi } from '../app/context/ApiContext';
import Pagination from './pagination';
import Filter from './filter';

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
      value = JSON.stringify(item[field]); // Convert object to JSON string
    }
    options.add(value);
  });

  return Array.from(options);
};

export function ContratacoesPage() {
  const { contracts, loading, error, currentPage, totalPages, setCurrentPage } = useApi();
  const [filteredContratacoes, setFilteredContratacoes] = useState<Contratacao[]>(contracts);
  const [filters, setFilters] = useState<{ usuarioNome: string }>({ usuarioNome: '' });

  useEffect(() => {
    // Filtrar os contratos com base nos filtros selecionados
    const applyFilters = () => {
      let results = contracts;

      if (filters.usuarioNome) {
        results = results.filter((item) => item.usuarioNome === filters.usuarioNome);
      }

      setFilteredContratacoes(results);
    };

    applyFilters();
  }, [filters, contracts]);

  const handleApplyFilters = (newFilters: { usuarioNome: string }) => {
    setFilters(newFilters);
  };

  if (error) {
    return <div><p>Erro ao carregar dados: {error}</p></div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Detalhes das Contratações Públicas</h1>
      
      {/* Filtro */}
      <Filter
        onApplyFilters={handleApplyFilters}
        options={{
          usuarioNome: uniqueOptions(contracts, 'usuarioNome'),
        }}
      />

      <table className="min-w-full border border-gray-200 table-auto">
        <thead className="bg-gray-700 text-white">
          <tr>
            <th className="py-2 px-4 border-r">Controle PNCP</th>
            <th className="py-2 px-4 border-r">Modalidade</th>
            <th className="py-2 px-4 border-r">Nome da Modalidade</th>
            <th className="py-2 px-4 border-r">Número da Compra</th>
            <th className="py-2 px-4 border-r">Órgão Entidade</th>
            <th className="py-2 px-4 border-r">Data de Inclusão</th>
            <th className="py-2 px-4 border-r">Data de Encerramento da Proposta</th>
            <th className="py-2 px-4 border-r">Unidade Órgão</th>
            <th className="py-2 px-4 border-r">Fonte</th>
          </tr>
        </thead>
        <tbody>
          {filteredContratacoes.map((contratacao) => (
            <tr key={contratacao.numeroControlePNCP} className="border-b cursor-pointer">
              <td className="py-2 px-4 border-r">{contratacao.numeroControlePNCP}</td>
              <td className="py-2 px-4 border-r">{contratacao.modalidadeId}</td>
              <td className="py-2 px-4 border-r">{contratacao.modalidadeNome}</td>
              <td className="py-2 px-4 border-r">{contratacao.numeroCompra}/{contratacao.anoCompra}</td>
              <td className="py-2 px-4 border-r">{contratacao.orgaoEntidade.razaoSocial}</td>
              <td className="py-2 px-4 border-r">{new Date(contratacao.dataInclusao).toLocaleDateString()}</td>
              <td className="py-2 px-4 border-r">{new Date(contratacao.dataEncerramentoProposta).toLocaleDateString()}</td>
              <td className="py-2 px-4 border-r">{contratacao.unidadeOrgao.nomeUnidade}</td>
              <td className="py-2 px-4 border-r">{contratacao.usuarioNome}</td>
              <td>
                <a 
                  href={`/contract/${contratacao.orgaoEntidade.cnpj}?sequencial=${contratacao.sequencialCompra}&ano=${contratacao.anoCompra}`} target='_top'
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
