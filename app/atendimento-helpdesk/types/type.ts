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