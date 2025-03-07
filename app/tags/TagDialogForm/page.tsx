/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Button } from "@/components/ui/button";
import { DatePickerDemo } from "@/components/ui/date-picker";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoaderCircle, Plus } from "lucide-react";
import { useEffect, useState } from "react";

interface TagDialogFormProps {
    registerTag: () => void;
    handlePayload: (payload: any) => void;
    loading: boolean;
    open: boolean;
    setOpen: (open: boolean) => void;
}

export default function TagDialogForm({ handlePayload, registerTag, loading, open, setOpen }: TagDialogFormProps) {

    const [tagPayload, setTagPayload] = useState({
        codigo: "",
        quantidade: 0,
        valor: 0,
        dataValidade: "2025-02-19T00:57:13.966Z",
    })

    useEffect(() => {
        handlePayload(tagPayload)
    }, [tagPayload])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild className="fixed right-8 bottom-8">
                <Button onClick={() => setOpen(true)}>
                    <Plus />
                    Nova tag
                </Button>
            </DialogTrigger>
            <DialogContent className="w-full">
                <DialogHeader>
                    <DialogTitle>Cadastrar nova tag</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name">
                            Código
                        </Label>
                        <Input
                            className="col-span-3"
                            value={tagPayload.codigo}
                            onChange={(e) => setTagPayload({ ...tagPayload, codigo: e.target.value })}
                            placeholder="Insira o nome do produto" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username">
                            Quantidade
                        </Label>
                        <Input
                            className="col-span-3"
                            value={tagPayload.valor}
                            onChange={(e) => setTagPayload({ ...tagPayload, valor: e.target.value })}
                            placeholder="Insira o valor do produto" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name">
                            Valor
                        </Label>
                        <Input
                            className="col-span-3"
                            value={tagPayload.quantidade}
                            onChange={(e) => setTagPayload({ ...tagPayload, quantidade: e.target.value })}
                            placeholder="Insira prazo estimado para a entrega do produto" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username">
                            Data de validade
                        </Label>
                        <DatePickerDemo
                            value={tagPayload.dataValidade}
                            onChange={(e) => setTagPayload({ ...tagPayload, dataValidade: e.target.value })}
                            className="col-span-3 w-full"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant={"ghost"}>
                            Cancelar
                        </Button>
                    </DialogClose>
                    <Button onClick={registerTag}>
                        {loading ? <LoaderCircle className="animate-spin" /> : "Cadastrar tag"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}