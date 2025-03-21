import { AbstractRestClient } from "../IRestClient/IRestClient";
import { ChatMessagesData } from "../utils/types";
import { AuthData } from "./types";

export class RestClient extends AbstractRestClient {
    constructor() {
        super();
    }

    handleLogin(username: string, password: string): Promise<AuthData> {
        const payload = {
            username,
            password
        }
        const url = this.getRequestPath(this.AUTH_PATH);
        const requestInit = this.getDefaultRequestInitMethodPostAuthentication(payload);

        return this.fetchData(url, requestInit);
    }

    handleFetchProductsFromMock() {
        const url = this.getRequestPathMockIo(this.MOCK_PRODUCTS);
        const requestInit = this.getDefaultRequestInitMethodGetWithouToken();

        return this.fetchData(url, requestInit);
    }

    handleFetchProducts() {
        const url = this.getRequestPath(this.ORDER_TYPE_PATH);
        const requestInit = this.getDefaultRequestInitMethodGet();

        return this.fetchData(url, requestInit);
    }

    handleFetchOrders() {
        const url = this.getRequestPath(this.ORDER_PATH.concat(this.ALL_PAYMENTS_PATH)).concat("?page=0");
        const requestInit = this.getDefaultRequestInitMethodGet();

        return this.fetchData(url, requestInit);
    }

    handleRegisterProducts(payload: object) {
        const toastSuccessMsg = "Produto registrado com sucesso!"
        const url = this.getRequestPath(this.ORDER_TYPE_PATH);
        const requestInit = this.getRequestInitMethodPost(payload);

        return this.fetchDataWithResponse(url, requestInit, toastSuccessMsg);
    }

    handleEditProducts(payload: object, productId: string | number) {
        const toastSuccessMsg = "Produto editado com sucesso!"
        const url = this.getRequestPath(this.ORDER_TYPE_PATH).concat(`/${productId}`);
        const requestInit = this.getRequestInitMethodPut(payload);
        return this.fetchDataWithResponse(url, requestInit, toastSuccessMsg);
    }

    handleDeleteProducts(id: string | number) {
        const toastSuccessMsg = "Produto excluido com sucesso!"
        const url = this.getRequestPath(this.ORDER_TYPE_PATH).concat(`/${id.toString()}`)
        const requestInit = this.getRequestInitMethodDelete();

        return this.fetchDataWithResponse(url, requestInit, toastSuccessMsg);
    }

    handleDeleteCoupons(id: string | number) {
        const toastSuccessMsg = "Cupom excluido com sucesso!"
        const url = this.getRequestPath(this.COUPON_PATH).concat(`/${id.toString()}`)
        const requestInit = this.getRequestInitMethodDelete();

        return this.fetchDataWithResponse(url, requestInit, toastSuccessMsg);
    }

    handleEditCoupons(payload: object, couponId: string | number) {
        const toastSuccessMsg = "Cupom editado com sucesso!"
        const url = this.getRequestPath(this.COUPON_PATH).concat(`/${couponId}`);
        const requestInit = this.getRequestInitMethodPut(payload);
        return this.fetchDataWithResponse(url, requestInit, toastSuccessMsg);
    }

    handleDeleteTags(id: string | number) {
        const toastSuccessMsg = "Tag excluida com sucesso!"
        const url = this.getRequestPath(this.ORDER_TAG_PATH).concat(`/${id.toString()}`)
        const requestInit = this.getRequestInitMethodDelete();

        return this.fetchDataWithResponse(url, requestInit, toastSuccessMsg);
    }

    handleChangeStatusPayment(id: string | number, payload: {}) {
        const url = this.getRequestPath(this.ORDER_PATH).concat(`/${id.toString()}`).concat("/alterarPagamento")
        const requestInit = this.getRequestInitMethodPostWithForm(payload);

        return this.fetchData(url, requestInit);
    }

    handleFetchCoupons() {
        const url = this.getRequestPath(this.COUPON_PATH).concat("?size=1000");
        const requestInit = this.getDefaultRequestInitMethodGet();

        return this.fetchData(url, requestInit);
    }

    handleRegisterCoupons(payload: object) {
        const toastSuccessMsg = "Cupom registrado com sucesso!"
        const url = this.getRequestPath(this.COUPON_PATH);
        const requestInit = this.getRequestInitMethodPost(payload);

        return this.fetchDataWithResponse(url, requestInit, toastSuccessMsg);
    }

    handleFetchTickets() {
        const url = this.getRequestPath(this.TICKETS_PATH).concat("?page=0");
        const requestInit = this.getDefaultRequestInitMethodGet();

        return this.fetchData(url, requestInit);
    }

    handleFetchTicketsAtivos() {
        const url = this.getRequestPath(this.TICKETS_PATH).concat("/ativos").concat("?page=0");
        const requestInit = this.getDefaultRequestInitMethodGet();

        return this.fetchData(url, requestInit);
    }

    handleFetchTicketsConcluidos() {
        const url = this.getRequestPath(this.TICKETS_PATH).concat("/concluidos").concat("?page=0");
        const requestInit = this.getDefaultRequestInitMethodGet();

        return this.fetchData(url, requestInit);
    }

    handleFetchTicketMensagem() {
        const url = this.getRequestPath(this.TICKET_CHAT_MSG);
        const requestInit = this.getDefaultRequestInitMethodGet();

        return this.fetchData(url, requestInit);
    }

    handleFetchTicketMensagemById(ticketID: number) {
        const url = this.getRequestPath(this.TICKET_CHAT_MSG).concat("/ticket/").concat(`${ticketID}`);
        const requestInit = this.getDefaultRequestInitMethodGet();

        return this.fetchData(url, requestInit);
    }

    handleFetchChatMessages(chatId: string, page: string): Promise<ChatMessagesData> {
        const requestInit = this.getDefaultRequestInitMethodGet();
        const url = this.getRequestPath(this.CHAT_MSG_PATH.concat("/chat/").concat(chatId), page);

        return this.fetchData(url, requestInit);
    }

    handleFetchTags() {
        const url = this.getRequestPath(this.ORDER_TAG_PATH);
        const requestInit = this.getDefaultRequestInitMethodGet();

        return this.fetchData(url, requestInit);
    }

    handleRegisterTags(payload: object) {
        const toastSuccessMsg = "Tag registrada com sucesso!"
        const url = this.getRequestPath(this.ORDER_TAG_PATH);
        const requestInit = this.getRequestInitMethodPost(payload);

        return this.fetchDataWithResponse(url, requestInit, toastSuccessMsg);
    }

    handleRegisterTicketMessages(payload: object) {
        const url = this.getRequestPath(this.TICKET_CHAT_MSG);
        const requestInit = this.getRequestInitMethodPost(payload);

        return this.fetchDataWithResponse(url, requestInit);
    }

    handleCloseTicketMessages(id: number, payload: any) {
        const toastSuccessMsg = "Ticket finalizado com sucesso!"
        const url = this.getRequestPath(this.TICKETS_PATH).concat("/").concat(id.toString()).concat("/concluir");
        const requestInit = this.getRequestInitMethodPost(payload);

        return this.fetchDataWithResponse(url, requestInit, toastSuccessMsg);
    }
}