import { ApiProvider } from './context/ApiContext';
import { ContratacoesPage } from '@/components/contratacoes';

const HomePage: React.FC = () => {
  return (
    <ApiProvider>
      <ContratacoesPage />
    </ApiProvider>
  );
};

export default HomePage;
