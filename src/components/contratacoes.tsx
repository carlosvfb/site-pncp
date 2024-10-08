'use client'

import { useApi } from '../app/context/ApiContext';
import Pagination from './pagination';
import Filter from './filter';
import Error500 from '@/app/500';

export interface Contratacao {
  numeroControlePNCP: string;
  numeroCompra: string;
  anoCompra: number;
  orgaoEntidade: {
    cnpj: string;
    razaoSocial: string;
  };
  dataInclusao: string;
  dataEncerramentoProposta: string;
  objetoCompra: string;
  unidadeOrgao: {
    codigoUnidade: string;
    nomeUnidade: string;
  };
  usuarioNome: string;
  sequencialCompra: string;
}

export function ContratacoesPage() {
  const { contracts, loading, error, currentPage, totalPages, setCurrentPage, setFilters } = useApi();

  const handleApplyFilters = (newFilters: { dataFinal: string, uf: string }) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  if (error) {
    return <Error500 />
  }

  return (
    <div className="bg-gray-400 min-h-screen">
      <header className="bg-gray-800 py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-white text-center">
          <h1 className="text-2xl font-bold">
            Detalhes das Contratações Públicas
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <Filter onApplyFilters={handleApplyFilters} />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-3 px-4 text-left font-medium uppercase text-sm tracking-wider border-r border-gray-700">
                  Código do Órgão
                </th>
                <th className="py-3 px-4 text-left font-medium uppercase text-sm tracking-wider border-r border-gray-700">
                  Nome do Órgão
                </th>
                <th className="py-3 px-4 text-left font-medium uppercase text-sm tracking-wider border-r border-gray-700">
                  Número da Contratação
                </th>
                <th className="py-3 px-4 text-left font-medium uppercase text-sm tracking-wider border-r border-gray-700">
                  Data de Inclusão
                </th>
                <th className="py-3 px-4 text-left font-medium uppercase text-sm tracking-wider border-r border-gray-700">
                  Data de Enc.
                </th>
                <th className="py-3 px-4 text-left font-medium uppercase text-sm tracking-wider border-r border-gray-700">
                  Portal
                </th>
                <th className="py-3 px-4 text-left font-medium uppercase text-sm tracking-wider border-r border-gray-700">
                  Descrição
                </th>
                <th className="py-3 px-4 text-left font-medium uppercase text-sm tracking-wider">
                  Detalhes
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {contracts.map((contratacao) => (
                <tr key={contratacao.numeroControlePNCP} className="hover:bg-gray-50">
                  <td className="py-4 px-4 text-sm font-medium text-gray-900">
                    {contratacao.unidadeOrgao.codigoUnidade}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-500">
                    {contratacao.unidadeOrgao.nomeUnidade}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-500">
                    {contratacao.numeroCompra}/{contratacao.anoCompra}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-500">
                    {new Date(contratacao.dataInclusao).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-500">
                    {new Date(contratacao.dataEncerramentoProposta).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-500">
                    {contratacao.usuarioNome}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-500">
                    {contratacao.objetoCompra}
                  </td>
                  <td className="py-4 px-4 text-sm font-medium text-right">
                    <a href={`/contract/${contratacao.orgaoEntidade.cnpj}?sequencial=${contratacao.sequencialCompra}&numero=${contratacao.numeroCompra}&ano=${contratacao.anoCompra}&dataInclusao=${contratacao.dataInclusao}&dataEncerramento=${contratacao.dataEncerramentoProposta}&unidade=${contratacao.unidadeOrgao.codigoUnidade}&orgao=${contratacao.orgaoEntidade.razaoSocial}`} target='_blank' className="text-indigo-600 hover:text-indigo-900 hover:underline">
                      Detalhes
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {loading && <div className="loading">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>}

        <div className="mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page: number) => setCurrentPage(page)}
          />
        </div>
      </main>
    </div>
  );
}
