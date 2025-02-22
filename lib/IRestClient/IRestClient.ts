import { Id, toast } from "react-toastify";
import { getToastError, getToastSuccess, handleResponseError, resolveRequestError } from "../utils/utils";
import { PayloadType } from "../RestClient/types";

export abstract class AbstractRestClient {
    protected BASE_URL = "https://www.easypostsys.com.br";
    protected FRONT_USER = "frontend@easypost.com.br";
    protected FRONT_PASS = "e@syFront!END"
    protected DEFAULT_PORT = ":8889";
    protected BASIC_TOKEN = "basic";
    protected AUTH_PATH = "/login/auth";
    protected RESET_PASSWORD = "/reset";
    protected ORDER_PATH = "/pedidos";
    protected DELIVER_PATH = "/entregar";
    protected PAYMENT_PATH = "/mp/process_payment";
    protected ORDER_TAG_PATH = "/pedidoTags";
    protected ORDER_TYPE_PATH = "/pedidoTipos";
    protected CITY_PATH = "/cidades";
    protected ADDRESS_PATH = "/enderecos";
    protected USER_PATH = "/usuarios";
    protected USER_REGISTER = "/novo";
    protected USER_PHOTO_PATH = "/foto";
    protected USER_FORGOT_PASS_PATH = "/forgot";
    protected CHAT_PATH = "/chats";
    protected CHAT_MSG_PATH = "/chatMensagens";
    protected CHAT_MSG_DATA_PATH = "/chatArquivos/mensagem/";
    protected NOTIFICATIONS_PATH = "/notificacoes";
    protected TICKETS_PATH = "/tickets";
    protected TICKET_CHAT_MSG = "/ticketMensagens";
    protected DESIGNER_RATING = "/usuarioRatings";
    protected DATA_TICKETS_PATH = "/ticketArquivos";
    protected COUPON_PATH = "/cupons";
    protected COUPON_WITH_CODE_PATH = "/cupons/codigo/";
    protected DELIVER_FILE = "/entrega/arquivo";
    protected CLIENT_PATH = "/cliente";
    protected ACCEPT_ORDER = "/aceitar";
    protected REQUEST_ORDER_CHANGE = "/alterar";
    protected VIA_CEP_PATH = "https://brasilapi.com.br/api/cep/v1/"
    protected MOCK_IO_PATH = "https://mocki.io/v1"
    protected MOCK_PRODUCTS = "/ccad3be9-9fb3-4221-a623-fc378984a8f6"
    protected API_LOCAL_PRODUCTS = "http://localhost:3000/api/produtos"

    protected userFieldsToRemove = ["id", "rating", "status", "urlFoto", "dataLogin", "dataCadastro"];
    protected addressFieldsToRemove = ["id", "usuario", "status", "links", "cidade"];

    private getToken() {
        const rawToken = localStorage.getItem("token");

        return rawToken ? rawToken : "";
    }

    protected getRequestPath(path: string, page?: string) {
        if (page) {
            return this.BASE_URL.concat(this.DEFAULT_PORT).concat(path).concat("?page=").concat(page);
        }

        return this.BASE_URL.concat(this.DEFAULT_PORT).concat(path);
    }

    protected getRequestPathApiLocal() {
        return this.API_LOCAL_PRODUCTS
    }

    protected getRequestPathMockIo(path: string) {
        return this.MOCK_IO_PATH.concat(path)
    }

    protected getRequestPathViaCep(cep: string | undefined) {
        return this.VIA_CEP_PATH.concat(`${cep}`)
    }

    protected getDefaultRequestInitMethodGet() {
        const request: RequestInit = {
            headers: {
                Authorization: "Bearer ".concat(this.getToken()),
            },
            method: "GET",
        };

        return request;
    }

    protected getDefaultRequestInitMethodGetWithouToken() {
        const request: RequestInit = {
            method: "GET"
        }

        return request
    }

    protected getRequestInitMethodPost(payload: string) {
        const requestInit: RequestInit = {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer ".concat(this.getToken()),
            },
            body: JSON.stringify(payload),
            method: "POST",
        };

        return requestInit;
    }

    protected getRequestInitMethodPostWithToken(json: string, token: string) {
        const requestInit: RequestInit = {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer ".concat(token),
            },
            body: json,
            method: "POST",
        };

        return requestInit;
    }

    protected getRequestInitMethodPut(json: string) {
        const requestInit: RequestInit = {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer ".concat(this.getToken()),
            },
            body: json,
            method: "PUT",
        };

        return requestInit;
    }

    protected getRequestInitMethodPostNoBody(token?: string) {
        const requestInit: RequestInit = {
            headers: {
                Authorization: "Bearer ".concat(token ?? this.getToken()),
            },
            method: "POST",
        };

        return requestInit;
    }

    protected getRequestInitMethodPutWithForm(form: FormData) {
        const requestInit: RequestInit = {
            headers: {
                Authorization: "Bearer ".concat(this.getToken()),
            },
            body: form,
            method: "PUT",
        };

        return requestInit;
    }

    protected getRequestInitMethodPostWithForm(payload: any) {
        const requestInit: RequestInit = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer ".concat(this.getToken()),
            },
            body: JSON.stringify(payload),
            method: "POST",
        };

        return requestInit;
    }

    protected getRequestInitMethodDelete() {
        const requestInit: RequestInit = {
            headers: {
                Authorization: "Bearer ".concat(this.getToken()),
            },
            method: "DELETE",
        };

        return requestInit;
    }

    protected getRequestInitMethodPatch() {
        const requestInit: RequestInit = {
            headers: {
                Authorization: "Bearer ".concat(this.getToken()),
            },
            method: "PATCH",
        };

        return requestInit;
    }

    protected getDefaultRequestInitMethodPostAuthentication(payload: PayloadType) {
        const request: RequestInit = {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(payload)
        }
        return request
    }

    protected getRequestInitMethodPostWithoutToken(payload: object) {
        const requestInit: RequestInit = {
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
            method: "POST",
        };

        return requestInit;
    }

    protected getDefaultOrderRequest(page: number, targetRoute = "") {
        const requestInit = this.getDefaultRequestInitMethodGet();
        const url = this.getRequestPath(this.ORDER_PATH.concat(targetRoute), page.toString());

        return this.fetchData(url, requestInit);
    }

    protected fetchData(url: RequestInfo | URL, reqInit?: RequestInit | undefined, throws?: boolean, toastify?: Id, toastSuccessMsg?: string) {
        return fetch(url, reqInit)
            .then(res => {
                if (res.ok) {
                    if (toastify && toastSuccessMsg) {
                        toast.update(toastify, getToastSuccess(toastSuccessMsg));
                    }

                    if (res.status == 204) {
                        return;
                    }

                    return res.json();

                }

                return handleResponseError(res, toastify, throws);
            })
            .catch(err => resolveRequestError(err, toastify));
    }

    protected fetchDataWithResponse(url: RequestInfo | URL, reqInit?: RequestInit | undefined, toastify?: Id, toastSuccessMsg?: string): Promise<Response> {
        return fetch(url, reqInit)
            .then(res => {
                if (res.ok) {
                    if (toastify && toastSuccessMsg) {
                        toast.update(toastify, getToastSuccess(toastSuccessMsg));
                    }
                } else if (toastify) {
                    toast.update(toastify, getToastError("Erro ao se comunicar com sistema Easy!"));
                }

                return res;
            })
            .catch(err => err);
    }
}
