interface Contratacao {
  valorTotalEstimado: number;
  valorTotalHomologado: number | null;
  orcamentoSigilosoCodigo: number;
  orcamentoSigilosoDescricao: string;
  numeroControlePNCP: string;
  linkSistemaOrigem: string | null;
  anoCompra: number;
  sequencialCompra: number;
  numeroCompra: string;
  processo: string;
  orgaoEntidade: {
    cnpj: string;
    razaoSocial: string;
    esferaId: string;
    poderId: string;
  };
  unidadeOrgao: {
    codigoUnidade: string;
    nomeUnidade: string;
    municipioNome: string;
    codigoIbge: string;
    ufSigla: string;
    ufNome: string;
  };
  orgaoSubRogado: string | null;
  unidadeSubRogada: string | null;
  modalidadeId: number;
  modalidadeNome: string;
  justificativaPresencial: string;
  modoDisputaId: number;
  modoDisputaNome: string;
  tipoInstrumentoConvocatorioCodigo: number;
  tipoInstrumentoConvocatorioNome: string;
  amparoLegal: {
    codigo: number;
    nome: string;
    descricao: string;
  };
  objetoCompra: string;
  informacaoComplementar: string;
  srp: boolean;
  dataPublicacaoPncp: string;
  dataAberturaProposta: string;
  dataEncerramentoProposta: string;
  situacaoCompraId: number;
  situacaoCompraNome: string;
  existeResultado: boolean;
  dataInclusao: string;
  dataAtualizacao: string;
  usuarioNome: string;
}

export interface ContratacoesPageProps {
  contratacao: Contratacao;
  error?: string;
}

export function ContratacoesPage({ contratacao, error }: ContratacoesPageProps) {
  if (error) {
    return <div><p>Erro ao carregar dados: {error}</p></div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Detalhes da Contratação Pública</h1>
      <table className="min-w-full border border-gray-200">
        <tbody>
          <tr>
            <th className="py-2 px-4 border-r">Controle PNCP</th>
            <td className="py-2 px-4 border-b">{contratacao.numeroControlePNCP}</td>
          </tr>
          <tr>
            <th className="py-2 px-4 border-r">Modalidade</th>
            <td className="py-2 px-4 border-b">{contratacao.modalidadeNome}</td>
          </tr>
          <tr>
            <th className="py-2 px-4 border-r">Ano da Compra</th>
            <td className="py-2 px-4 border-b">{contratacao.anoCompra}</td>
          </tr>
          <tr>
            <th className="py-2 px-4 border-r">Número da Compra</th>
            <td className="py-2 px-4 border-b">{contratacao.numeroCompra}</td>
          </tr>
          <tr>
            <th className="py-2 px-4 border-r">Órgão Entidade</th>
            <td className="py-2 px-4 border-b">{contratacao.orgaoEntidade.razaoSocial}</td>
          </tr>
          <tr>
            <th className="py-2 px-4 border-r">Data de Inclusão</th>
            <td className="py-2 px-4 border-b">{new Date(contratacao.dataInclusao).toLocaleDateString()}</td>
          </tr>
          <tr>
            <th className="py-2 px-4 border-r">Unidade Órgão</th>
            <td className="py-2 px-4 border-b">{contratacao.unidadeOrgao.nomeUnidade}</td>
          </tr>
          <tr>
            <th className="py-2 px-4 border-r">Objeto da Compra</th>
            <td className="py-2 px-4 border-b">{contratacao.objetoCompra}</td>
          </tr>
          <tr>
            <th className="py-2 px-4 border-r">Informação Complementar</th>
            <td className="py-2 px-4 border-b">{contratacao.informacaoComplementar}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
