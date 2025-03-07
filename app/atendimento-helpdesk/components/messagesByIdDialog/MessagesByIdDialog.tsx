"use client";
import { Input } from "@/components/ui/input";
import { TicketMessagesResponse } from "../../types/type";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils/utils";

interface MensagensByIdProps {
    mensagens: Array<TicketMessagesResponse>;
    ticketId: string;
    open: boolean;
    setMensagens: (msg: any) => void;
    onOpenChange: (open: boolean) => void;
    handleNewMessageTicketId: (message: any) => void;
    loggedUserId?: string; // Adicionei para identificar o usuário logado
}

export default function MessagesByIdDialog({
    mensagens,
    open,
    onOpenChange,
    handleNewMessageTicketId,
    ticketId,
    loggedUserId, // Adicione isso às props para verificar o usuário logado
}: MensagensByIdProps) {
    const [newMessage, setNewMessage] = useState("");

    const handleSendMessage = () => {
        if (!newMessage.trim()) return;

        handleNewMessageTicketId({
            mensagem: newMessage,
            ticket: { id: ticketId },
        });

        setNewMessage("");
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-lg w-full">
                <DialogHeader>
                    <DialogTitle>Mensagens do Ticket #{ticketId}</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col h-[500px] p-4 gap-4">
                    {/* Área de Mensagens */}
                    <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                        {mensagens?._embedded?.ticketMensagemModelList?.length > 0 ? (
                            mensagens._embedded.ticketMensagemModelList
                                .sort((a, b) => a.id - b.id)
                                .map((msg, idx) => {
                                    const isLoggedUser = msg.usuario.id === loggedUserId; // Verifica se a mensagem é do usuário logado
                                    return (
                                        <div
                                            key={idx}
                                            className={cn(
                                                "flex items-start gap-2",
                                                isLoggedUser ? "justify-end" : "justify-start"
                                            )}
                                        >
                                            {!isLoggedUser && (
                                                <div className="h-8 w-8 rounded-full flex-shrink-0">
                                                    <Image
                                                        alt={msg.usuario.nome}
                                                        src={
                                                            msg.usuario.urlFoto
                                                                ? msg.usuario.urlFoto.replace("/var/www", "")
                                                                : "https://res.cloudinary.com/dbyqw2jjq/image/upload/v1741338839/9706583_xybefi.png"
                                                        }
                                                        width={32}
                                                        height={32}
                                                        className="rounded-full object-cover"
                                                    />
                                                </div>
                                            )}
                                            <div
                                                className={cn(
                                                    "max-w-[70%] p-3 rounded-lg",
                                                    isLoggedUser
                                                        ? "bg-blue-500 text-white"
                                                        : "bg-gray-100 text-gray-800"
                                                )}
                                            >
                                                <p className="text-sm font-semibold">
                                                    {msg.usuario.nome}
                                                </p>
                                                <p className="text-sm">{msg.mensagem}</p>
                                                {msg.dataEnvio && (
                                                    <p className="text-xs opacity-70 mt-1">
                                                        {new Date(msg.dataEnvio).toLocaleTimeString("pt-BR", {
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                        })}
                                                    </p>
                                                )}
                                            </div>
                                            {isLoggedUser && (
                                                <div className="h-8 w-8 rounded-full flex-shrink-0">
                                                    <Image
                                                        alt={msg.usuario.nome}
                                                        src={
                                                            msg.usuario.urlFoto
                                                                ? msg.usuario.urlFoto.replace("/var/www", "")
                                                                : "https://res.cloudinary.com/dbyqw2jjq/image/upload/v1741338839/9706583_xybefi.png"
                                                        }
                                                        width={32}
                                                        height={32}
                                                        className="rounded-full object-cover"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    );
                                })
                        ) : (
                            <p className="text-center text-gray-500">Nenhuma mensagem encontrada.</p>
                        )}
                    </div>

                    {/* Área de Envio */}
                    <div className="flex items-center gap-2 pt-4 border-t">
                        <Input
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Digite sua mensagem..."
                            className="flex-1"
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && newMessage.trim()) {
                                    handleSendMessage();
                                }
                            }}
                        />
                        <Button
                            onClick={handleSendMessage}
                            disabled={!newMessage.trim()}
                            className="disabled:opacity-50"
                        >
                            <Send className="h-5 w-5" />
                            <span className="sr-only">Enviar mensagem</span>
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}