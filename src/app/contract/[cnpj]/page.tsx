'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

interface TablePageContractItemProps {
  numeroItem: number;
  descricao: string;
  materialOuServico: string;
  materialOuServicoNome: string;
  valorUnitarioEstimado: number;
  valorTotal: number;
  quantidade: number;
  unidadeMedida: string;
  orcamentoSigiloso: boolean;
  itemCategoriaId: number;
  itemCategoriaNome: string;
  patrimonio: string;
  codigoRegistroImobiliario: string;
  criterioJulgamentoId: number;
  criterioJulgamentoNome: string;
  situacaoCompraItem: number;
  situacaoCompraItemNome: string;
  tipoBeneficio: number;
  tipoBeneficioNome: string;
  incentivoProdutivoBasico: boolean;
  dataInclusao: string;
  dataAtualizacao: string;
  temResultado: boolean;
  imagem: number;
}

interface Props {
  params: {
    cnpj: string;
  };
  searchParams: {
    sequencial: string;
    ano: string;
  };
}

export default function ContractDetailPage({ params, searchParams }: Props) {
  const [contractItems, setContractItems] = useState<TablePageContractItemProps[]>([]);
  const [loadingContractItems, setLoadingContractItems] = useState(true);
  const [errorContractItems, setErrorContractItems] = useState<string | null>(null);
  const [downloadLink, setDownloadLink] = useState<string | null>(null);

  useEffect(() => {
    const fetchContractItems = async () => {
      setLoadingContractItems(true);
      setErrorContractItems(null);

      try {
        const itemsUrl = `https://pncp.gov.br/api/pncp/v1/orgaos/${params.cnpj}/compras/${searchParams.ano}/${searchParams.sequencial}/itens`;
        const downloadUrl = `https://pncp.gov.br/api/pncp/v1/orgaos/${params.cnpj}/compras/${searchParams.ano}/${searchParams.sequencial}/arquivos/1`;

        const response = await axios.get(itemsUrl);
        console.log('Response Data:', response.data);

        const data = response.data;

        if (Array.isArray(data)) {
          setContractItems(data);
        } else {
          throw new Error('Data is not in the expected format');
        }
        setDownloadLink(downloadUrl);

      } catch (error) {
        console.error('Erro ao buscar itens do contrato:', error);
        setErrorContractItems('Failed to fetch contract items');
      } finally {
        setLoadingContractItems(false);
      }
    };

    fetchContractItems();
  }, [params.cnpj, searchParams.ano, searchParams.sequencial]);

  return (
    <div className='ml-4 mt-4'>
      <h1 className='inline mr-2 font-bold'>Link para baixar arquivo:</h1>
      {downloadLink ? (
        <a className='underline text-blue-600' href={downloadLink} download>Baixar arquivo</a>
      ) : (
        <p>Carregando link de download...</p>
      )}
      
      <h2>Itens:</h2>
      {loadingContractItems && <p>Carregando itens do contrato...</p>}
      {errorContractItems && <p>{errorContractItems}</p>}
      {!loadingContractItems && !errorContractItems && (
        <div>
          {contractItems.length === 0 ? (
            <p>Nenhum item encontrado.</p>
          ) : (
            <ul>
              {contractItems.map((item, index) => (
                <li key={item.numeroItem || index} className='mb-4'>
                  <p><strong>Número do item:</strong> {item.numeroItem}</p>
                  <p><strong>Quantidade:</strong> {item.quantidade}</p>
                  <p><strong>Valor Unitário:</strong> {item.valorUnitarioEstimado}</p>
                  <p><strong>Valor Total:</strong> {item.valorTotal}</p>
                  <p><strong>Descrição:</strong> {item.descricao}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
