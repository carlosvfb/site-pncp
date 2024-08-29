'use client'

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
    return <div><p>Erro ao carregar dados: {error}</p></div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Detalhes das Contratações Públicas</h1>
      <Filter
        onApplyFilters={handleApplyFilters}
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
          {contracts.map((contratacao) => (
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
