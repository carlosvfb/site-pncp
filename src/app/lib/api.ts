import { Contratacao } from '@/components/contratacoes';
import axios, { AxiosError } from 'axios';


export const fetchContracts = async (retries = 3): Promise<Contratacao[]> => {
  try {
    const response = await axios.get('https://pncp.gov.br/api/consulta/v1/contratacoes/proposta?dataFinal=20240823&pagina=1');
    return response.data.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 500) {
      console.log('Retrying request...');
      if (retries > 0) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return fetchContracts(retries - 1);
      }
    }
    throw new Error('Failed to fetch contracts: ' + (error instanceof Error ? error.message : 'Unknown error'));
  }
};
