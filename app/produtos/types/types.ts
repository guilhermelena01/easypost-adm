export type Product = {
    nomeDoProduto: string;
    valor: number;
    prazo: string;
    statusOrdemDePagamento: string;
    descricao: string;
}

export interface ProductTableProps {
    data: Array<Product>;
}

export enum EnumRegisterProductStatus {
    REGISTER_SUCCESSFULL = "REGISTER_SUCCESSFULL",
    REGISTER_UNSUCCESSFULL = "REGISTER_UNSUCCESSFULL"
}