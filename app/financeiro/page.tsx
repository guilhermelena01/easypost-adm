"use client"
import { montserrat } from "@/lib/utils/utils";
import useFinancial from "./hooks/useFinancial";
import OrdersTable from "./components/OrdersTable/page";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import LoaderComponent from "@/components/Loader";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Order } from "./types/types";

export default function Financeiro() {
    const { loading, loadingOrders, orders, handleChangePayment } = useFinancial()
    const [orderId, setOrderId] = useState("")
    const [selectedStatusPayment, setSelectedStatusPayment] = useState("")
    const [showConfirmationModal, setShowConfirmationModal] = useState(false)
    const [selectedOrder, setSelectedOrder] = useState<Order | []>([])
    const [showOrderSheet, setShowOrderSheet] = useState(false)

    function handleChangeStatusPayments() {
        if (orderId) {
            handleChangePayment(orderId, selectedStatusPayment)
            setShowConfirmationModal(false)
        }
    }

    function getSelectedOrder(id: number) {
        const filteredOrder = orders && orders.length > 0 ? orders.filter((order) => order.id == id) : []
        setSelectedOrder(filteredOrder)
        setShowOrderSheet(true)
    }

    return (
        <>
            <section className="w-full h-dvh flex flex-col gap-8 py-8 pr-8 ml-1">
                <h1 className={`text-2xl font-bold ${montserrat.className}`}>Financeiro</h1>
                {loadingOrders ? <LoaderComponent /> :
                    <OrdersTable
                        data={orders!}
                        setOrderId={setOrderId}
                        showConfirmationModal={setShowConfirmationModal}
                        setSelectedStatusPayment={setSelectedStatusPayment}
                        getSelectedOrderId={getSelectedOrder}
                    />
                }
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
                                {loading ? <LoaderCircle className="animate-spin" /> : "Alterar status"}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* <Sheet open={showOrderSheet} onOpenChange={setShowOrderSheet}>
                    <SheetContent>
                        <SheetTitle>Detalhes do pedido</SheetTitle>
                        {console.log(selectedOrder)}
                        {selectedOrder && selectedOrder.lenght > 0 ? selectedOrder.map((order: Order, idx) => (
                            <div className="flex flex-col gap-4">
                                <span>{order.pagamentoStatus}</span>
                                <div className="grid grid-cols-2">
                                </div>

                            </div>
                        ))
                            : ""
                        }
                    </SheetContent>
                </Sheet> */}
            </section >
        </>
    )
}