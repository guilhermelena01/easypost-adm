/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Button } from "@/components/ui/button";
import { DatePickerDemo } from "@/components/ui/date-picker";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatCurrency } from "@/lib/utils/utils";
import { LoaderCircle, Plus } from "lucide-react";
import { useEffect, useState } from "react";

interface CouponDialogFormProps {
    registerCoupon: () => void;
    handlePayload: (payload: any) => void;
    loading: boolean;
    open: boolean;
    setOpen: (open: boolean) => void;
}

export default function CouponDialogForm({ handlePayload, registerCoupon, loading, open, setOpen }: CouponDialogFormProps) {

    const [couponPayload, setCouponPayload] = useState({
        codigo: "",
        quantidade: 0,
        valor: 0,
        dataValidade: "2025-02-19T00:57:13.966Z",
    })

    useEffect(() => {
        handlePayload(couponPayload)
    }, [couponPayload])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="fixed right-8 bottom-8">
                <Button onClick={() => setOpen(true)}>
                    <Plus />
                    Novo cupom
                </Button>
            </DialogTrigger>
            <DialogContent className="w-full">
                <DialogHeader>
                    <DialogTitle>Cadastrar novo cupom</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name">
                            Código
                        </Label>
                        <Input
                            className="col-span-3"
                            value={couponPayload.codigo}
                            onChange={(e) => setCouponPayload({ ...couponPayload, codigo: e.target.value })}
                            placeholder="Insira o nome do cupom" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username">
                            Quantidade
                        </Label>
                        <Input
                            className="col-span-3"
                            value={couponPayload.quantidade}
                            onChange={(e) => setCouponPayload({ ...couponPayload, quantidade: e.target.value })}
                            placeholder="Insira a quantidade do cupom" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name">
                            Valor
                        </Label>
                        <Input
                            className="col-span-3"
                            value={couponPayload.valor}
                            onChange={(e) => setCouponPayload({ ...couponPayload, valor: formatCurrency(e.target.value) })}
                            placeholder="Insira o valor do cupom" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username">
                            Data de validade
                        </Label>
                        <DatePickerDemo
                            value={couponPayload.dataValidade}
                            onChange={(e) => setCouponPayload({ ...couponPayload, dataValidade: e.target.value })}
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
                    <Button onClick={registerCoupon}>
                        {loading ? <LoaderCircle className="animate-spin" /> : "Cadastrar cupom"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}