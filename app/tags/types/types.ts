//TYPE
export type Tag = {
    id: number;
    descricao: string;
    sigla: string;
    cor: string;
    status: string;
}

//INTERFACE
export interface TagsTableProps {
    data: Array<Tag>;
    showConfirmationModal: (show: boolean, modalType: "remove" | "edit") => void;
    setTagId: (id: string | number) => void;
}

//ENUM
export enum EnumTagsStatus {
    ATIVO = "ATIVO",
    INATIVO = "INATIVO"
}

export enum EnumRegisterTagsStatus {
    REGISTER_SUCCESSFULL = "REGISTER_SUCCESSFULL",
    REGISTER_UNSUCCESSFULL = "REGISTER_UNSUCCESSFULL",
    DELETED_SUCCESSFULL = "DELETED_SUCCESSFULL",
    DELETED_UNSUCCESSFULL = "DELETED_UNSUCCESSFULL"
}