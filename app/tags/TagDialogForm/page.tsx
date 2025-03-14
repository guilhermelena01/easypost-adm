/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import ColorPickerAdvanced from "@/components/ColorPickerAdvanced";
import { Button } from "@/components/ui/button";
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
        "descricao": "",
        "sigla": "",
        "cor": ""
    })

    useEffect(() => {
        handlePayload(tagPayload)
    }, [tagPayload])

    function handleSelectedColor(color: string) {
        setTagPayload({ ...tagPayload, cor: color })
    }

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
                            Descrição
                        </Label>
                        <Input
                            className="col-span-3"
                            value={tagPayload.descricao}
                            onChange={(e) => setTagPayload({ ...tagPayload, descricao: e.target.value })}
                            placeholder="Insira a descrição da tag" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username">
                            Sigla
                        </Label>
                        <Input
                            className="col-span-3"
                            value={tagPayload.sigla}
                            onChange={(e) => setTagPayload({ ...tagPayload, sigla: e.target.value })}
                            placeholder="Algo como TAG 123" />
                    </div>
                    <ColorPickerAdvanced handleSelectedColor={handleSelectedColor} />
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