"use client"

import { Input } from "@/components/ui/input";
import { getImageUrl, montserrat } from "@/lib/utils/utils";
import useChat from "./hooks/useChat";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

export default function Helpdesk() {
    const { tickets, getChatData } = useChat()

    const [chatId, setChatId] = useState<number | null>(null)

    function handleSelectedChat(id: number) {
        setChatId(id)

        getChatData(chatId)
    }

    // const isSupportContact = 

    return (
        <section className="w-full h-dvh flex flex-col gap-8 py-8 pr-8">
            <h1 className={`text-2xl font-bold ${montserrat.className}`}>Atendimento helpdesk</h1>
            <div className="w-full flex rounded-lg border h-dvh">
                <div className="w-1/3 border-r h-full p-8 bg-secondary gap-6 flex flex-col">
                    <Input
                        placeholder="Busque por um chat..."
                        className="bg-white"
                    />
                    <Separator />
                    {tickets && tickets.content.length > 0 ? tickets.content.map((ticket, idx) => (
                        <div onClick={() => handleSelectedChat(idx)} key={idx} className={`cursor-pointer ${chatId == ticket.id ? "bg-black bg-opacity-5 rounded-lg px-4 py-2" : ""}`}>
                            <img src={getImageUrl(ticket.usuarioFoto)} />
                            <span className="">
                                <h2>{ticket.titulo}</h2>
                                <p className="text-sm text-gray-500">{ticket.ultimaMensagem ?? "Ainda não há mensagens"}</p>
                            </span>
                        </div>
                    )) : ""}
                </div>
                <div className="w-2/3 flex flex-col h-full p-6 gap-6 relative">
                    <span className="flex items-end gap-2">
                        <div className="h-6 w-6 rounded-full bg-blue-500"></div>
                        <span className="w-full flex justify-start bg-black bg-opacity-5 h-fit px-4 py-2 rounded-lg">
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem eaque debitis maiores ea reprehenderit, et quis beatae non eligendi quisquam eum repudiandae sit exercitationem enim. Veritatis suscipit qui dolor nihil.</p>
                        </span>
                    </span>
                    <span className="flex items-end gap-2">
                        <span className="w-full flex justify-end bg-black bg-opacity-5 h-fit px-4 py-2 rounded-lg">
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem eaque debitis maiores ea reprehenderit, et quis beatae non eligendi quisquam eum repudiandae sit exercitationem enim. Veritatis suscipit qui dolor nihil.</p>
                        </span>
                        <div className="h-6 w-6 rounded-full bg-blue-500"></div>
                    </span>
                    <span className="absolute bottom-6 w-full flex gap-2">
                        <Input className="items-start w-[80%]" />
                        <Button className="w-[15%]">
                            Enviar mensagem
                            <Send/>
                        </Button>
                    </span>
                </div>
            </div>
        </section>
    )
}