import { RestClient } from "@/lib/RestClient/RestClient"
import { useEffect, useState } from "react"
import { EnumCloseTicketMessageStatus, EnumRegisterTicketMessageStatus, TicketMensagemType, TicketMessagesResponse, TicketsType } from "../types/type"
import { ChatMessageType } from "@/lib/utils/types"
import { toast } from "react-toastify"

export default function useChat() {
    const restClient = new RestClient()
    const [tickets, setTickets] = useState<TicketsType>()
    const [ticketsAbertos, setTicketsAbertos] = useState()
    const [ticketsConcluidos, setTicketsConcluidos] = useState()
    const [ticketMensagens, setTicketMensagens] = useState<Array<TicketMensagemType>>()
    const [ticketMensagensById, setTicketMensagensById] = useState<TicketMessagesResponse>()
    const [loading, setLoading] = useState(false)
    const [closingTicket, setClosingTicket] = useState(false);
    const [messages, setMessages] = useState<Array<ChatMessageType>>();
    const [registerTicketMessagesStatus, setRegisterTicketMessagesStatus] = useState<EnumRegisterTicketMessageStatus>()
    const [closeTicketMessagesStatus, setCloseTicketMessagesStatus] = useState<EnumCloseTicketMessageStatus>()

    function getTickets() {
        setLoading(true)

        restClient.handleFetchTickets()
            .then(res => setTickets(res))
            .catch(err => console.error(err))
            .finally(() => setLoading(false))
    }

    function getTicketsAtivos() {
        restClient.handleFetchTicketsAtivos()
            .then(res => setTicketsAbertos(res))
            .catch(err => console.error(err))
    }


    function getTicketsConcluidos() {
        restClient.handleFetchTicketsConcluidos()
            .then(res => setTicketsConcluidos(res))
            .catch(err => console.error(err))
    }

    function getTicketMensagensById(ticketId: number) {
        setLoading(true)

        restClient.handleFetchTicketMensagemById(ticketId)
            .then(res => setTicketMensagensById(res))
            .catch(err => console.error(err))
            .finally(() => setLoading(false))
    }

    function handleRegisterMessageTicketId(message: any) {
        restClient.handleRegisterTicketMessages(message)
            .then(() => setRegisterTicketMessagesStatus(EnumRegisterTicketMessageStatus.REGISTERSUCCESSFULL))
            .catch(() => setRegisterTicketMessagesStatus(EnumRegisterTicketMessageStatus.UNSUCCESSFULL_REGISTER))
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

    function handleCloseTickets(ticketId: number, payload: any) {
        setClosingTicket(true)
        const payloadToSend = {
            ...payload,
            notaFechamento: 5
        }

        restClient.handleCloseTicketMessages(ticketId, payloadToSend)
            .then(res => {
                if (res.status == 400) {
                    toast.error(res.detail);
                    return;
                }
                setCloseTicketMessagesStatus(EnumCloseTicketMessageStatus.CLOSE_SUCCESSFULL)
            })
            .catch(err => console.error(err))
            .finally(() => setClosingTicket(false))
    }

    useEffect(() => {
        getTicketsAtivos()
        getTicketsConcluidos()
        getTicketMensagens()
    }, [])

    useEffect(() => {
        if (closeTicketMessagesStatus == EnumCloseTicketMessageStatus.CLOSE_SUCCESSFULL) {
            getTicketsConcluidos()
            getTicketsAtivos()
        }
    }, [closeTicketMessagesStatus])

    return {
        messages,
        closingTicket,
        closeTicketMessagesStatus,
        tickets,
        ticketsAbertos,
        ticketsConcluidos,
        ticketMensagens,
        ticketMensagensById,
        loading,
        registerTicketMessagesStatus,
        setTicketMensagensById,
        getChatData,
        getTicketMensagensById,
        handleRegisterMessageTicketId,
        handleCloseTickets
    }
}