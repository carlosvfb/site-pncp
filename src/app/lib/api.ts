import axios from 'axios';

export const fetchContracts = async () => {
  try {
    const response = await axios.get('https://pncp.gov.br/api/pncp/v1/orgaos/20765627000140/compras/2024/12');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch contracts');
  }
};

