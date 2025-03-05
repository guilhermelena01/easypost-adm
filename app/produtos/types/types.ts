export type Product = {
    id?: number;
    valor: number;
    resolucao: string;
    cor: string;
    tempoLimite: number;
    descricao: string;
    status: string;
}

export interface ProductTableProps {
    data: Array<Product>;
    showConfirmationModal: (show: boolean) => void;
    setProductId: (id: string | number) => void;
}

export enum EnumRegisterProductStatus {
    REGISTER_SUCCESSFULL = "REGISTER_SUCCESSFULL",
    REGISTER_UNSUCCESSFULL = "REGISTER_UNSUCCESSFULL",
    DELETED_SUCCESSFULL = "DELETED_SUCCESSFULL",
    DELETED_UNSUCCESSFULL = "DELETED_UNSUCCESSFULL"
}