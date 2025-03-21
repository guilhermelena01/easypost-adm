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
import ProductIconPicker from "../ProductIconPicker/page";

interface ProductDialogFormProps {
    handleProduct: () => void;
    handlePayload: (payload: any) => void;
    loading: boolean;
    open: boolean;
    setOpen: (open: boolean) => void;
    edit?: boolean;
    setEdit?: (edit: string) => void;
}

export default function ProductDialogForm({ handlePayload, handleProduct, loading, open, setOpen, edit, setEdit }: ProductDialogFormProps) {

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

    function handleModal(show: boolean) {
        setOpen(show)
        edit && setEdit!("")
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
                    <DialogTitle>
                        {edit ? "Edição de" : "Cadastrar novo"} produto
                    </DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name">
                            Título
                        </Label>
                        <Input
                            className="col-span-3"
                            value={productPayload.descricao}
                            onChange={(e) => setProductPayload({ ...productPayload, descricao: e.target.value })}
                            placeholder="Insira o título do produto" />
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
                        <Label htmlFor="name">
                            Quantidade de horas para a entrega
                        </Label>
                        <Input
                            type="number"
                            value={productPayload.tempoLimite}
                            onChange={(e) => setProductPayload({ ...productPayload, tempoLimite: e.target.value })}
                            className="col-span-3"
                            placeholder="Insira a quantidade de horas para a entrega do produto"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username">
                            Descrição
                        </Label>
                        <Input
                            value={productPayload.resolucao}
                            onChange={(e) => setProductPayload({ ...productPayload, resolucao: e.target.value })}
                            placeholder="Insira uma descrição para o produto"
                            className="col-span-3" />
                    </div>
                    <ProductIconPicker handlePayload={getProductIcon} />
                </div>
                <DialogFooter>
                    <DialogClose>
                        <Button onClick={() => handleModal(false)} type="button" variant={"ghost"}>
                            Cancelar
                        </Button>
                    </DialogClose>
                    <Button onClick={handleProduct}>
                        {loading ? <LoaderCircle className="animate-spin" /> : edit ? "Editar produto" : "Cadastrar produto"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}