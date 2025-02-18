import { AbstractRestClient } from "../IRestClient/IRestClient";
import { AuthData } from "./types";

export class RestClient extends AbstractRestClient {
    constructor() {
        super();
    }

    handleLogin(username: string, password: string): Promise<AuthData> {
        const url = this.getRequestPath(this.AUTH_PATH);
        const authBody = JSON.stringify({ username, password });
        const requestInit = this.getRequestInitMethodPostWithoutToken(authBody);

        return this.fetchData(url, requestInit, true);
    }

    handleFetchProductsFromMock() {
        const url = this.getRequestPathMockIo(this.MOCK_PRODUCTS);
        const requestInit = this.getDefaultRequestInitMethodGetWithouToken();

        return this.fetchData(url, requestInit, true);
    }

    handleFetchProducts() {
        const url = this.getRequestPathApiLocal();
        const requestInit = this.getDefaultRequestInitMethodGetWithouToken();

        return this.fetchData(url, requestInit, true);
    }

    handleRegisterProducts(payload: object) {
        const url = this.getRequestPathApiLocal();
        const requestInit = this.getRequestInitMethodPostWithoutToken(payload);

        return this.fetchData(url, requestInit, true);
    }
}