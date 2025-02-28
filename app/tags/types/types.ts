//TYPE
export type Tag = {
    id: number;
    descricao: string;
    sigla: string;
    cor: string;
}

//INTERFACE
export interface TagsTableProps {
    data: Array<Tag>;
}

//ENUM
export enum EnumTagsStatus {
    ATIVO = "ATIVO",
    INATIVO = "INATIVO"
}

export enum EnumRegisterTagsStatus {
    REGISTER_SUCCESSFULL = "REGISTER_SUCCESSFULL",
    REGISTER_UNSUCCESSFULL = "REGISTER_UNSUCCESSFULL"
}