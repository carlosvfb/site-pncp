import axios, { AxiosError } from 'axios';
import { addDays, format, isSaturday, isSunday } from 'date-fns';
import { Contratacao } from '@/components/contratacoes';

const getNextBusinessDay = (date: Date): Date => {
  let nextDay = addDays(date, 1);

  if (isSaturday(nextDay)) {
    nextDay = addDays(nextDay, 2);
  } else if (isSunday(nextDay)) {
    nextDay = addDays(nextDay, 1);
  }

  return nextDay;
};

const getDefaultEndDate = (): string => {
  const today = new Date();
  const nextBusinessDay = getNextBusinessDay(today);
  return format(nextBusinessDay, 'yyyyMMdd');
};

export const fetchContracts = async (
  page: number = 1,
  size: number = 10,
  retries = 3,
  filters?: { dataFinal?: string; uf?: string }
): Promise<{ data: Contratacao[]; totalPages: number }> => {
  const dataFinal = filters?.dataFinal || getDefaultEndDate();
  const uf = filters?.uf || 'df';

  try {
    const response = await axios.get(
      `https://pncp.gov.br/api/consulta/v1/contratacoes/proposta`,
      {
        params: {
          dataFinal: dataFinal,
          codigoModalidadeContratacao: '8',
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
