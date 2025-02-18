export type AuthData = {
    id: number;
    nome: string;
    urlFoto: string;
    contaTipo: EnumUserType;
    token: string;
};

export enum EnumUserType {
    CLIENTE = "CLIENTE",
    FORNECEDOR = "FORNECEDOR",
}