"use client"
import { montserrat } from "@/lib/utils/utils";
import useFinancial from "./hooks/useFinancial";
import OrdersTable from "./components/OrdersTable/page";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";

export default function Financeiro() {
    const { loading, orders, handleChangePayment } = useFinancial()
    const [orderId, setOrderId] = useState("")
    const [selectedStatusPayment, setSelectedStatusPayment] = useState("")
    const [showConfirmationModal, setShowConfirmationModal] = useState(false)

    function handleChangeStatusPayments() {
        if (orderId) {
            handleChangePayment(orderId, selectedStatusPayment)
            setShowConfirmationModal(false)
        }
    }

    return (
        <>
            <section className="w-full h-dvh flex flex-col gap-8 py-8 pr-8">
                <h1 className={`text-2xl font-bold ${montserrat.className}`}>Financeiro</h1>
                {orders && orders.length > 0
                    ?
                    <OrdersTable data={orders}
                        setOrderId={setOrderId}
                        showConfirmationModal={setShowConfirmationModal}
                        setSelectedStatusPayment={setSelectedStatusPayment}
                    />
                    :
                    ""}
                <Dialog open={showConfirmationModal}>
                    <DialogContent className="w-[420px]">
                        <DialogTitle>Deseja alterar o status deste pedido?</DialogTitle>
                        <DialogDescription>
                            Está opção irá alterar o status de pagamento deste pedido. Tem certeza que deseja confirmar esta ação?
                        </DialogDescription>
                        <DialogFooter>
                            <Button variant={"ghost"} onClick={() => setShowConfirmationModal(false)}>
                                Cancelar
                            </Button>
                            <Button onClick={handleChangeStatusPayments} variant={"default"}>
                                {loading ? <LoaderCircle className="animate-spin"/> : "Alterar status"}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </section>
        </>
    )
}