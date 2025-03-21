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
    loading: boolean;
    setCoupomId: (id: string | number) => void;
    showConfirmationModal: (show: boolean, modalType: "remove" | "edit") => void;
}

//ENUM
export enum EnumCouponStatus {
    ATIVO = "ATIVO",
    INATIVO = "INATIVO"
}

export enum EnumRegisterCouponsStatus {
    REGISTER_SUCCESSFULL = "REGISTER_SUCCESSFULL",
    REGISTER_UNSUCCESSFULL = "REGISTER_UNSUCCESSFULL",
    DELETED_SUCCESSFULL = "DELETED_SUCCESSFULL",
    DELETED_UNSUCCESSFULL = "DELETED_UNSUCCESSFULL"
}