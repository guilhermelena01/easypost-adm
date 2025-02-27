import { RestClient } from "@/lib/RestClient/RestClient"
import { useEffect, useState } from "react"
import { TicketMensagemType, TicketMessagesResponse, TicketsType } from "../types/type"
import { ChatMessageType } from "@/lib/utils/types"

export default function useChat() {
    const restClient = new RestClient()
    const [tickets, setTickets] = useState<TicketsType>()
    const [ticketMensagens, setTicketMensagens] = useState<Array<TicketMensagemType>>()
    const [ticketMensagensById, setTicketMensagensById] = useState<TicketMessagesResponse>()
    const [loading, setLoading] = useState(false)
    const [messages, setMessages] = useState<Array<ChatMessageType>>();

    function getTickets() {
        setLoading(true)

        restClient.handleFetchTickets()
            .then(res => setTickets(res))
            .catch(err => console.error(err))
            .finally(() => setLoading(false))
    }

    function getTicketMensagensById(ticketId: number) {
        setLoading(true)

        restClient.handleFetchTicketMensagemById(ticketId)
            .then(res => setTicketMensagensById(res))
            .catch(err => console.error(err))
            .finally(() => setLoading(false))
    }

    function getTicketMensagens() {
        setLoading(true)

        restClient.handleFetchTicketMensagem()
            .then(res => setTicketMensagens(res))
            .catch(err => console.error(err))
            .finally(() => setLoading(false))
    }

    function getChatData(chatId: number) {
        restClient.handleFetchChatMessages(chatId.toString(), 0)
            .then(res => {
                const sortedMessages = res._embedded?.chatMensagemModelList
                    .sort((m1, m2) => new Date(m1.data).getTime() - new Date(m2.data).getTime());

                if (sortedMessages) {
                    setMessages(prop => {
                        const newArray = prop ? sortedMessages.concat(prop) : sortedMessages;

                        return newArray;
                    });
                } else {
                    setMessages([]);
                }
            })
            .catch(err => err);

    }

    useEffect(() => {
        getTickets()
        getTicketMensagens()
    },[])

    return {
        messages,
        tickets,
        ticketMensagens,
        ticketMensagensById,
        loading,
        getChatData,
        getTicketMensagensById
    }
}