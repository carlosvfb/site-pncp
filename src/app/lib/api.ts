import axios, { AxiosError } from 'axios';
import { Contratacao } from '@/components/contratacoes';

export const fetchContracts = async (
  page: number = 1,
  size: number = 20,
  dataFinal: string = new Date().toISOString().split('T')[0], // Data padrão: hoje
  retries = 3
): Promise<{ data: Contratacao[], totalPages: number }> => {
  try {
    const response = await axios.get('https://pncp.gov.br/api/consulta/v1/contratacoes/proposta', {
      params: {
        dataFinal: dataFinal.replace(/-/g, ''), // Formata a data para YYYYMMDD
        codigoModalidadeContratacao: '8',
        uf: 'df',
        pagina: page,
        tamanhoPagina: size,
      },
    });

    console.log(response.data);

    const totalPages = response.data.totalPaginas;
    const data = response.data.data;

    console.log(totalPages);
    console.log(data);

    return { data, totalPages };
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 500) {
      console.log('Retrying request...');
      if (retries > 0) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return fetchContracts(page, size, dataFinal, retries - 1);
      }
    }
    throw new Error('Failed to fetch contracts: ' + (error instanceof Error ? error.message : 'Unknown error'));
  }
};
