export type Product = {
    id?: number;
    valor: number;
    resolucao: string;
    cor: string;
    tempoLimite: number;
    descricao: string;
}

export interface ProductTableProps {
    data: Array<Product>;
}

export enum EnumRegisterProductStatus {
    REGISTER_SUCCESSFULL = "REGISTER_SUCCESSFULL",
    REGISTER_UNSUCCESSFULL = "REGISTER_UNSUCCESSFULL"
}