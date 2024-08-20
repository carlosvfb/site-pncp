import axios from 'axios';

export const fetchContracts = async () => {
  try {
    const response = await axios.get('https://pncp.gov.br/api/consulta/v1/contratacoes/proposta?dataFinal=20240821&pagina=1');
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch contracts');
  }
};
