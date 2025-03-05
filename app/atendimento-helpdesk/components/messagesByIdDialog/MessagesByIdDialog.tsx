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

export default function MessagesByIdDialog({ mensagens, open, onOpenChange, handleNewMessageTicketId, ticketId }: MensagensByIdProps) {
    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = () => {
        if (!newMessage.trim()) return;

        handleNewMessageTicketId({
            mensagem: newMessage,
            ticket: { id: ticketId },
        });

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
                <div className="w-full flex flex-col h-full p-6 gap-6 relative">
                    <div className="flex flex-col gap-6 py-6 max-h-[400px] overflow-y-auto">
                        {mensagens && mensagens._embedded.ticketMensagemModelList.length > 0
                            ?
                            mensagens._embedded.ticketMensagemModelList.sort((a, b) => a.id - b.id).map((msg, idx) => (
                                <span key={idx} className="flex items-end gap-2">
                                    <span className="w-full flex flex-col justify-start bg-black bg-opacity-5 h-fit px-4 py-2 rounded-lg">
                                        <p className="text-green-600 text-sm">{msg.usuario.nome}</p>
                                        {msg.mensagem}
                                    </span>
                                    <div className="h-6 w-6 rounded-full">
                                        <Image alt="" src={msg.usuario.urlFoto.replace("/var/www", "")} width={24} height={24} />
                                    </div>
                                </span>
                            ))
                            :
                            []
                        }
                    </div>
                    <span className="w-full flex gap-2">
                        <Input value={newMessage} className="items-start w-[80%]" onChange={(e) => setNewMessage(e.target.value)} />
                        <Button onClick={handleSendMessage} disabled={!newMessage.trim()} className="disabled:opacity-50">
                            Enviar mensagem <Send />
                        </Button>
                    </span>
                </div>
            </DialogContent>

        </Dialog>
    )
}