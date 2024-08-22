'use client';

import Link from 'next/link';
import React from 'react';

export interface Contratacao {
  numeroControlePNCP: string;
  anoCompra: number;
  numeroCompra: number;
  sequencialCompra: string;
  orgaoEntidade: {
    cnpj: string;
    razaoSocial: string;
  };
  unidadeOrgao: {
    nomeUnidade: string;
  };
  modalidadeId: number;
  modalidadeNome: string;
  objetoCompra: string;
  informacaoComplementar: string;
  tipoInstrumentoConvocatorioNome: string;
  dataEncerramentoProposta: string;
  dataInclusao: string;
  usuarioNome: string;
}

export interface ContratacoesPageProps {
  contratacoes: Contratacao[];
  error?: string;
}

export function TablePage({ contratacoes, error }: ContratacoesPageProps) {

  if (error) {
    return <div><p>Erro ao carregar dados: {error}</p></div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Detalhes das Contratações Públicas</h1>
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
            <th className="py-2 px-4 border-r w-1/6">Fonte</th>
          </tr>
        </thead>
        <tbody>
          {contratacoes.map((contratacao, index) => (
            <tr key={index} className="border-b cursor-pointer">
              <td className="py-2 px-4 border-r">{contratacao.numeroControlePNCP}</td>
              <td className="py-2 px-4 border-r">{contratacao.modalidadeId}</td>
              <td className="py-2 px-4 border-r">{contratacao.modalidadeNome}</td>
              <td className="py-2 px-4 border-r">{contratacao.numeroCompra}/{contratacao.anoCompra}</td>
              <td className="py-2 px-4 border-r">{contratacao.orgaoEntidade.razaoSocial}</td>
              <td className="py-2 px-4 border-r">{new Date(contratacao.dataInclusao).toLocaleDateString()}</td>
              <td className="py-2 px-4 border-r">{new Date(contratacao.dataEncerramentoProposta).toLocaleDateString()}</td>
              <td className="py-2 px-4 border-r">{contratacao.unidadeOrgao.nomeUnidade}</td>
              <td className="py-2 px-4 border-r">{contratacao.usuarioNome}</td>
              <td><Link href={`/contract/${contratacao.orgaoEntidade.cnpj}?sequencial=${contratacao.sequencialCompra}&ano=${contratacao.anoCompra}`}>Detalhes</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
