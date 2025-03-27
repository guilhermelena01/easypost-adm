/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { getImageUrl, montserrat, roboto } from "@/lib/utils/utils";
import useChat from "./hooks/useChat";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, CheckCircle, CircleCheckBig, Loader, MessageSquare, Send } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MessagesByIdDialog from "./components/messagesByIdDialog/MessagesByIdDialog";
import { EnumCloseTicketMessageStatus, EnumRegisterTicketMessageStatus } from "./types/type";
import TicketFinishDialog from "./components/ticketFinishDialog/TicketFinishDialog";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

export default function Helpdesk() {
    const {
        ticketsAbertos,
        closeTicketMessagesStatus,
        ticketsConcluidos,
        closingTicket,
        ticketMensagensById,
        handleCloseTickets,
        handleRegisterMessageTicketId,
        registerTicketMessagesStatus,
        setTicketMensagensById,
        getTicketMensagensById
    } = useChat()

    const [showMessagesDialog, setShowMessagesDialog] = useState(false)
    const [showDialogTicketFinish, setShowDialogTicketFinish] = useState(false)
    const [ticketId, setTicketId] = useState(0)
    const [userId, setUserId] = useState(0)
    const [stompClient, setStompClient] = useState(null);
    const [payloadToFinishTicket, setPayloadToFinishTicket] = useState({
        "razaoFechamento": "",
        "detalhesFechamento": "",
    })

    function handleSelectedChat(id: number) {
        getTicketMensagensById(id)
        setShowMessagesDialog(true)
        setTicketId(id)
    }

    function handleShowTicketDialog(id: number) {
        setTicketId(id)
        setShowDialogTicketFinish(true)
    }

    function handleFinishTicket() {
        handleCloseTickets(ticketId, payloadToFinishTicket)
        setPayloadToFinishTicket({})
    }

    useEffect(() => {
        const recoveryUser = localStorage.getItem("user")
        setUserId(JSON.parse(recoveryUser))
    }, [])

    useEffect(() => {
        if (closeTicketMessagesStatus == EnumCloseTicketMessageStatus.CLOSE_SUCCESSFULL) {
            setShowDialogTicketFinish(false)
        }

    }, [closeTicketMessagesStatus])

    useEffect(() => {
        if (!stompClient) return;

        const subscription = stompClient.subscribe(`/topic/ticket.${ticketId}`, (mensagem) => {
            const novaMensagem = JSON.parse(mensagem.body);

            setTicketMensagensById((mensagensAtuais) => [...mensagensAtuais, novaMensagem]);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [stompClient, ticketId]);

    useEffect(() => {
        getTicketMensagensById(ticketId)
    }, [])

    useEffect(() => {
        registerTicketMessagesStatus == EnumRegisterTicketMessageStatus.REGISTERSUCCESSFULL && getTicketMensagensById(ticketId)
    }, [registerTicketMessagesStatus])

    return (
        <section className="w-full h-dvh flex flex-col gap-8 py-8 pr-8">
            <h1 className={`text-2xl font-bold ${montserrat.className}`}>Atendimento helpdesk</h1>
            <div className="w-full flex flex-col rounded-lg border h-dvh p-8 gap-8">
                <div className="w-full flex justify-between">
                    <h2 className={`text-lg font-semibold ${montserrat.className}`}>Histórico de chamados</h2>
                </div>
                <div className="w-full flex flex-col">
                    <Tabs defaultValue={"ativos"}>
                        <TabsList>
                            <TabsTrigger value="ativos">Ativos</TabsTrigger>
                            <TabsTrigger value="concluidos">Concluídos</TabsTrigger>
                        </TabsList>
                        <TabsContent value="ativos">
                            {ticketsAbertos && ticketsAbertos._embedded ? ticketsAbertos._embedded.ticketModelList.map((tickets) => (
                                <span key={tickets.id} className="w-full border flex justify-between p-8 rounded-xl mb-4">
                                    <span className="flex flex-col justify-between gap-4">
                                        <p className="text text-lg">{tickets.titulo}</p>
                                        <p className="flex items-center gap-2 text-muted-foreground font-extralight">
                                            <svg fill="#343A40" viewBox="0 0 24 24" width={20} height={20}>
                                                <path d="M18.72,14.76C19.07,13.91 19.26,13 19.26,12C19.26,11.28 19.15,10.59 18.96,9.95C18.31,10.1 17.63,10.18 16.92,10.18C13.86,10.18 11.15,8.67 9.5,6.34C8.61,8.5 6.91,10.26 4.77,11.22C4.73,11.47 4.73,11.74 4.73,12A7.27,7.27 0 0,0 12,19.27C13.05,19.27 14.06,19.04 14.97,18.63C15.54,19.72 15.8,20.26 15.78,20.26C14.14,20.81 12.87,21.08 12,21.08C9.58,21.08 7.27,20.13 5.57,18.42C4.53,17.38 3.76,16.11 3.33,14.73H2V10.18H3.09C3.93,6.04 7.6,2.92 12,2.92C14.4,2.92 16.71,3.87 18.42,5.58C19.69,6.84 20.54,8.45 20.89,10.18H22V14.67H22V14.69L22,14.73H21.94L18.38,18L13.08,17.4V15.73H17.91L18.72,14.76M9.27,11.77C9.57,11.77 9.86,11.89 10.07,12.11C10.28,12.32 10.4,12.61 10.4,12.91C10.4,13.21 10.28,13.5 10.07,13.71C9.86,13.92 9.57,14.04 9.27,14.04C8.64,14.04 8.13,13.54 8.13,12.91C8.13,12.28 8.64,11.77 9.27,11.77M14.72,11.77C15.35,11.77 15.85,12.28 15.85,12.91C15.85,13.54 15.35,14.04 14.72,14.04C14.09,14.04 13.58,13.54 13.58,12.91A1.14,1.14 0 0,1 14.72,11.77Z" />
                                            </svg>
                                            Chamado em aberto #{tickets.id}
                                        </p>
                                    </span>
                                    <span className="flex gap-4">
                                        <Button onClick={() => handleShowTicketDialog(tickets.id)} variant={"outline"} className="text-[#77b233]">
                                            {closingTicket ? <Loader className="animate-spin" /> :
                                                <>
                                                    <CircleCheckBig />
                                                    Finalizar
                                                </>
                                            }
                                        </Button>
                                        <Button onClick={() => handleSelectedChat(tickets.id)}>
                                            <MessageSquare />
                                            Chat
                                        </Button>
                                    </span>
                                </span>
                            )) : <span className="w-full flex justify-center items-center"><p>Nenhum ticket foi aberto até o momento</p></span>}
                        </TabsContent>
                        <TabsContent value="concluidos">
                            {ticketsConcluidos && ticketsConcluidos._embedded ? ticketsConcluidos._embedded.ticketModelList.map((tickets) => (
                                <span key={tickets.id} className="w-full border flex justify-between p-8 rounded-xl mb-4 relative">
                                    <span className="flex flex-col justify-between gap-4">
                                        <p className="text text-lg">{tickets.titulo}</p>
                                        <p className="flex items-center gap-2 text-muted-foreground font-extralight">
                                            <svg fill="#343A40" viewBox="0 0 24 24" width={20} height={20}>
                                                <path d="M18.72,14.76C19.07,13.91 19.26,13 19.26,12C19.26,11.28 19.15,10.59 18.96,9.95C18.31,10.1 17.63,10.18 16.92,10.18C13.86,10.18 11.15,8.67 9.5,6.34C8.61,8.5 6.91,10.26 4.77,11.22C4.73,11.47 4.73,11.74 4.73,12A7.27,7.27 0 0,0 12,19.27C13.05,19.27 14.06,19.04 14.97,18.63C15.54,19.72 15.8,20.26 15.78,20.26C14.14,20.81 12.87,21.08 12,21.08C9.58,21.08 7.27,20.13 5.57,18.42C4.53,17.38 3.76,16.11 3.33,14.73H2V10.18H3.09C3.93,6.04 7.6,2.92 12,2.92C14.4,2.92 16.71,3.87 18.42,5.58C19.69,6.84 20.54,8.45 20.89,10.18H22V14.67H22V14.69L22,14.73H21.94L18.38,18L13.08,17.4V15.73H17.91L18.72,14.76M9.27,11.77C9.57,11.77 9.86,11.89 10.07,12.11C10.28,12.32 10.4,12.61 10.4,12.91C10.4,13.21 10.28,13.5 10.07,13.71C9.86,13.92 9.57,14.04 9.27,14.04C8.64,14.04 8.13,13.54 8.13,12.91C8.13,12.28 8.64,11.77 9.27,11.77M14.72,11.77C15.35,11.77 15.85,12.28 15.85,12.91C15.85,13.54 15.35,14.04 14.72,14.04C14.09,14.04 13.58,13.54 13.58,12.91A1.14,1.14 0 0,1 14.72,11.77Z" />
                                            </svg>
                                            Chamado concluído #{tickets.id}
                                        </p>
                                    </span>
                                    <span className={`bg-[#77b233] flex items-center gap-2 text-sm h-fit text-white px-4 py-2 rounded-lg ${roboto.className}`}>
                                        <CheckCircle className="w-4" />
                                        FINALIZADO
                                    </span>
                                </span>
                            )) : <span className="w-full flex justify-center items-center"><p>Nenhum ticket foi concluído até o momento</p></span>}
                        </TabsContent>
                    </Tabs>
                </div>
                <MessagesByIdDialog
                    ticketId={ticketId}
                    mensagens={ticketMensagensById}
                    open={showMessagesDialog}
                    setMensagens={setTicketMensagensById}
                    onOpenChange={setShowMessagesDialog}
                    handleNewMessageTicketId={handleRegisterMessageTicketId}
                    loggedUserId={userId.id}
                />

                <TicketFinishDialog
                    handleDialog={setShowDialogTicketFinish}
                    handleFinishTicket={handleFinishTicket}
                    open={showDialogTicketFinish}
                    payload={payloadToFinishTicket}
                    setPayload={(setPayloadToFinishTicket)}
                />
            </div>
        </section>
    )
}