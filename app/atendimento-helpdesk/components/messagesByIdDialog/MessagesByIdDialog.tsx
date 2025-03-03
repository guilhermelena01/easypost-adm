import { Input } from "@/components/ui/input";
import { TicketMessagesResponse } from "../../types/type";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import Image from "next/image";

interface MensagensByIdProps {
    mensagens: Array<TicketMessagesResponse>;
    ticketId: string;
    open: boolean;
    setMensagens: (msg: any) => void;
    onOpenChange: (open: boolean) => void;
    handleNewMessageTicketId: (message: any) => void;
}

export default function MessagesByIdDialog({ mensagens, setMensagens, open, onOpenChange, handleNewMessageTicketId, ticketId }: MensagensByIdProps) {
    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = () => {
        if (newMessage.trim() === '') return;

        const messageToSend = {
            "mensagem": newMessage.toString(),
            "ticket": {
                "id": ticketId
            }
        };

        handleNewMessageTicketId(messageToSend)
        setNewMessage('');
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Mensagens
                    </DialogTitle>
                </DialogHeader>
                <div className="w-full flex flex-col h-full p-6 gap-6 relative" >
                    {mensagens && mensagens._embedded.ticketMensagemModelList.length > 0
                        ?
                        mensagens._embedded.ticketMensagemModelList.sort((a, b) => a.id - b.id).map((msg, idx) => (
                            <span className="flex items-end gap-2">
                                <span className="w-full flex justify-start bg-black bg-opacity-5 h-fit px-4 py-2 rounded-lg">
                                    {msg.mensagem}
                                </span>
                                <div className="h-6 w-6 rounded-full">
                                    <Image src={msg.usuario.urlFoto.replace("/var/www", "")} alt="imagem de perfil do suporter" width={24} height={24} />
                                </div>
                            </span>
                        ))
                        :
                        []
                    }
                    <span className="w-full flex gap-2">
                        <Input value={newMessage} className="items-start w-[80%]" onChange={(e) => setNewMessage(e.target.value)} />
                        <Button className="" onClick={handleSendMessage} >
                            Enviar mensagem
                            <Send />
                        </Button>
                    </span>
                </div>
            </DialogContent>

        </Dialog>
    )
}