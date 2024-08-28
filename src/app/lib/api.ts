import axios, { AxiosError } from 'axios';
import { addDays, format } from 'date-fns';
import { Contratacao } from '@/components/contratacoes';

// Função para obter a data final padrão (um dia após a data atual)
const getDefaultEndDate = (): string => {
  const today = new Date();
  const tomorrow = addDays(today, 1);
  return format(tomorrow, 'yyyyMMdd'); 
};

export const fetchContracts = async (
  page: number = 1,
  size: number = 10,
  retries = 3,
  filters?: { usuarioNome?: string; modalidadeNome?: string; dataFinal?: string; uf?: string }
): Promise<{ data: Contratacao[]; totalPages: number }> => {

  // Usa os filtros passados ou define valores padrão
  const dataFinal = filters?.dataFinal || getDefaultEndDate();
  const codigoModalidadeContratacao = filters?.modalidadeNome || '8';
  const usuarioNome = filters?.usuarioNome || 'Compras.gov.br';
  const uf = filters?.uf || 'df'; // Adiciona UF

  try {
    const response = await axios.get(
      `https://pncp.gov.br/api/consulta/v1/contratacoes/proposta`,
      {
        params: {
          dataFinal: dataFinal,
          codigoModalidadeContratacao: codigoModalidadeContratacao,
          usuarioNome: usuarioNome,
          uf: uf,
          pagina: page,
          tamanhoPagina: size,
        },
      }
    );
    console.log('API response:', response.data);
    const totalPages = response.data.totalPaginas;
    const data = response.data.data;

    return { data, totalPages };
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 500) {
      console.log('Retrying request...');
      if (retries > 0) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return fetchContracts(page, size, retries - 1, filters);
      }
    }
    throw new Error(
      'Failed to fetch contracts: ' +
        (error instanceof Error ? error.message : 'Unknown error')
    );
  }
};
