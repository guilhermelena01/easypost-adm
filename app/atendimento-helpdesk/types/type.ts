export type TicketsType = {
    "content": [
        {
            "id": number,
            "ultimaMensagem": null,
            "dataFinalizacao": null,
            "titulo": string,
            "usuarioNome": string,
            "usuarioFoto": string
        }
    ],
    "pageable": {
        "sort": {
            "empty": boolean,
            "sorted": boolean,
            "unsorted": boolean
        },
        "offset": number,
        "pageNumber": number,
        "pageSize": number,
        "paged": boolean,
        "unpaged": boolean
    },
    "totalPages": number,
    "totalElements": number,
    "last": boolean,
    "size": number,
    "number": number,
    "sort": {
        "empty": boolean,
        "sorted": boolean,
        "unsorted": boolean
    },
    "numberOfElements": number,
    "first": boolean,
    "empty": boolean
}

export type TicketMensagemType = {
    id: number;
    data: string;
    dataVisualizacao: string | null;
    mensagem: string;
    ticket: {
        id: number;
    };
    usuario: {
        id: number;
        nome: string;
        urlFoto: string | null;
    };
    arquivosMensagem: any[];
    links: any[];
};

type Embedded = {
    ticketMensagemModelList: TicketMensagemType[];
};

type Links = {
    self: {
        href: string;
    };
};

type PageInfo = {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
};

export type TicketMessagesResponse = {
    _embedded: Embedded;
    _links: Links;
    page: PageInfo;
};

export enum EnumRegisterTicketMessageStatus {
    REGISTERSUCCESSFULL = "REGISTER_SUCCESSFULL",
    UNSUCCESSFULL_REGISTER = "UNSUCCESSFULL_REGISTER"
}

export enum EnumCloseTicketMessageStatus {
    CLOSE_SUCCESSFULL = "CLOSE_SUCCESSFULL",
    UNSUCCESSFULL_CLOSE = "UNSUCCESSFULL_CLOSE"
}

export enum EnumRazaoFechamentoTicket {
    NAO_PRECISO = "NAO_PRECISO",
    CONSEGUI_RESOLVER = "CONSEGUI_RESOLVER",
    PROBLEMA_DESAPARECEU = "PROBLEMA_DESAPARECEU",
    OUTRO = "OUTRO"
}