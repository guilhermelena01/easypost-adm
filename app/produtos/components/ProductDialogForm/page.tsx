/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoaderCircle, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Product } from "../../types/types";
import { formatCurrency } from "@/lib/utils/utils";
import { DatePickerDemo } from "@/components/ui/date-picker";
import ProductIconPicker from "../ProductIconPicker/page";

interface ProductDialogFormProps {
    registerProduct: () => void;
    handlePayload: (payload: any) => void;
    loading: boolean;
    open: boolean;
    setOpen: (open: boolean) => void;
}

export default function ProductDialogForm({ handlePayload, registerProduct, loading, open, setOpen }: ProductDialogFormProps) {

    const [productPayload, setProductPayload] = useState<Product>({
        cor: "",
        descricao: "",
        resolucao: "",
        tempoLimite: 0,
        valor: 0
    })

    useEffect(() => {
        handlePayload(productPayload)
    }, [productPayload])

    function getProductIcon(icon: string) {
        setProductPayload({ ...productPayload, cor: icon })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="fixed right-8 bottom-8">
                <Button onClick={() => setOpen(true)}>
                    <Plus />
                    Novo produto
                </Button>
            </DialogTrigger>
            <DialogContent className="w-full">
                <DialogHeader>
                    <DialogTitle>Cadastrar novo produto</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name">
                            Descrição
                        </Label>
                        <Input
                            className="col-span-3"
                            value={productPayload.descricao}
                            onChange={(e) => setProductPayload({ ...productPayload, descricao: e.target.value })}
                            placeholder="Insira a descrição do produto" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username">
                            Valor
                        </Label>
                        <Input
                            className="col-span-3"
                            maxLength={18}
                            value={formatCurrency(productPayload.valor)}
                            onChange={(e) => setProductPayload({ ...productPayload, valor: e.target.value })}
                            placeholder="Insira o valor do produto" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username">
                            Resolução
                        </Label>
                        <Input
                            value={productPayload.resolucao}
                            onChange={(e) => setProductPayload({ ...productPayload, resolucao: e.target.value })}
                            placeholder="Insira uma resolução para o produto"
                            className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name">
                            Prazo limite para entrega
                        </Label>
                        <DatePickerDemo
                            className="col-span-3"
                            value={productPayload.tempoLimite}
                            onChange={(e) => setProductPayload({ ...productPayload, tempoLimite: e.target.value })}
                            placeholder="Insira o prazo limite para a entrega do produto" />
                    </div>
                    <ProductIconPicker handlePayload={getProductIcon} />
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant={"ghost"}>
                            Cancelar
                        </Button>
                    </DialogClose>
                    <Button onClick={registerProduct}>
                        {loading ? <LoaderCircle className="animate-spin" /> : "Cadastrar produto"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}