export type ChatMessagesData = {
    _embedded?: {
        chatMensagemModelList: Array<ChatMessageType>;
        ticketMensagemModelList: Array<ChatMessageType>;
    };
    page: {
        totalPages: number;
    };
};

export type ChatMessageType = {
    id: number;
    data: string;
    dataVisualizacao: string;
    mensagem: string;
    usuario: {
        id: number;
        nome: string;
        urlFoto: string;
    };
    arquivosMensagem: Array<ChatMessageMidia>;
};

export type ChatMessageMidia = {
    id: number;
    url: string;
};