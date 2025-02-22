import { AbstractRestClient } from "../IRestClient/IRestClient";
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

        return this.fetchData(url, requestInit, true);
    }

    handleFetchProductsFromMock() {
        const url = this.getRequestPathMockIo(this.MOCK_PRODUCTS);
        const requestInit = this.getDefaultRequestInitMethodGetWithouToken();

        return this.fetchData(url, requestInit, true);
    }

    handleFetchProducts() {
        const url = this.getRequestPath(this.ORDER_TYPE_PATH);
        const requestInit = this.getDefaultRequestInitMethodGet();

        return this.fetchData(url, requestInit, true);
    }

    handleFetchOrders() {
        const url = this.getRequestPath(this.ORDER_PATH).concat("?page=0");
        const requestInit = this.getDefaultRequestInitMethodGet();

        return this.fetchData(url, requestInit, true);
    }

    handleRegisterProducts(payload: object) {
        const url = this.getRequestPath(this.ORDER_TYPE_PATH);
        const requestInit = this.getRequestInitMethodPost(payload);

        return this.fetchData(url, requestInit, true);
    }

    handleDeleteProducts(id: string | number) {
        const url = this.getRequestPath(this.ORDER_TYPE_PATH).concat(`/${id.toString()}`)
        const requestInit = this.getRequestInitMethodDelete();

        return this.fetchData(url, requestInit, true);
    }

    handleChangeStatusPayment(id: string | number, payload: {}) {
        const url = this.getRequestPath(this.ORDER_PATH).concat(`/${id.toString()}`).concat("/alterarPagamento")
        const requestInit = this.getRequestInitMethodPostWithForm(payload);

        return this.fetchData(url, requestInit, true);
    }

    handleFetchCoupons() {
        const url = this.getRequestPath(this.COUPON_PATH);
        const requestInit = this.getDefaultRequestInitMethodGet();

        return this.fetchData(url, requestInit, true);
    }

    handleRegisterCoupons(payload: object) {
        const url = this.getRequestPath(this.COUPON_PATH);
        const requestInit = this.getRequestInitMethodPost(payload);

        return this.fetchData(url, requestInit, true);
    }
}