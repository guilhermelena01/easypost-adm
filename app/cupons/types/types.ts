//TYPE
export type Coupon = {
    id: number;
    codigo: string;
    quantidade: number;
    valor: number;
    dataCriacao: string;
    dataValidade: string;
    status: EnumCouponStatus;
}

//INTERFACE
export interface CouponsTableProps {
    data: Array<Coupon>;
}

//ENUM
export enum EnumCouponStatus {
    ATIVO = "ATIVO",
    INATIVO = "INATIVO"
}

export enum EnumRegisterProductStatus {
    REGISTER_SUCCESSFULL = "REGISTER_SUCCESSFULL",
    REGISTER_UNSUCCESSFULL = "REGISTER_UNSUCCESSFULL"
}