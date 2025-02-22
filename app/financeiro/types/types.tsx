export type Order = {
    id: number;
    identificador: string;
    descricao: string;
    descricaoProduto: string;
    largura: number;
    altura: number;
    valor: number;
    descricaoAlteracao: string | null;
    status: "ABERTO" | "ANDAMENTO" | "AGUARDANDO" | "ENTREGUE";
    dataAceite: string | null;
    dataConclusao: string | null;
    dataLimite: string | null;
    dataExtendida: string | null;
    pedidoTag: {
        id: number;
        descricao: string;
        sigla: string;
        cor: string;
    };
    pedidoTipo: {
        id: number;
        descricao: string;
        resolucao: string | null;
        cor: string;
        tempoLimite: number;
        valor: number;
        status: string | null;
    };
    usuarioCliente: {
        id: number;
        nome: string;
        urlFoto: string;
    };
    usuarioFornecedor: {
        id: number;
        nome: string | null;
        urlFoto: string | null;
        rating: number | null;
    };
    ratingsPedido: any[];
    entregasPedido: any[];
    arquivosPedido: any[];
    tempoRestante: string | null;
};

export interface OrderTableProps {
    data: Array<Order>;
    showConfirmationModal: (show: boolean) => void;
    setOrderId: (id: string | number) => void;
    setSelectedStatusPayment: (status: string) => void;
}

export enum EnumRegisterOrderStatus {
    REGISTER_SUCCESSFULL = "REGISTER_SUCCESSFULL",
    REGISTER_UNSUCCESSFULL = "REGISTER_UNSUCCESSFULL",
    DELETED_SUCCESSFULL = "DELETED_SUCCESSFULL",
    DELETED_UNSUCCESSFULL = "DELETED_UNSUCCESSFULL"
}