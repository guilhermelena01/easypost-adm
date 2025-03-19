"use client"
import { montserrat } from "@/lib/utils/utils";
import useFinancial from "./hooks/useFinancial";
import OrdersTable from "./components/OrdersTable/page";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import LoaderComponent from "@/components/Loader";
import { Sheet, SheetContent, SheetHeader, SheetOverlay, SheetTitle } from "@/components/ui/sheet";
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

    function handleStatus(status: string) {
        switch (status) {
            case "ESTORNADO":
                return "#FFA500";
            case "LIBERADO":
                return "#32CD32";
            case "PAGO":
                return "#007BFF";
            case "NEGADO":
                return "#DC3545"
        }
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

                <Sheet open={showOrderSheet} onOpenChange={setShowOrderSheet}>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>Detalhes do pedido</SheetTitle>
                        </SheetHeader>

                        {selectedOrder && selectedOrder.length > 0 ? selectedOrder.map((order: Order, idx) => (
                            <div className="flex flex-col gap-4">
                                <span className="flex gap-1 justify-between items-center">
                                    Pedido #{order.id}
                                    <span className="text-sm w-fit px-3 py-2 rounded-full text-white font-bold"
                                        style={{ backgroundColor: handleStatus(order.pagamentoStatus) }}
                                    >
                                        {order.pagamentoStatus}
                                    </span>
                                </span>
                                <div className="flex flex-col gap-2">
                                    <span className="flex flex-col gap-0.5">
                                        <p className="text-sm text-[#aeaeae] font-bold">Data de aceite do pedido</p>
                                        <p>{order.dataAceite ?? "N/A"}</p>
                                    </span>
                                    <span className="flex flex-col gap-0.5">
                                        <p className="text-sm text-[#aeaeae] font-bold">Data de conclusão</p>
                                        <p>{order.dataConclusao ?? "N/A"}</p>
                                    </span>
                                    <span className="flex flex-col gap-0.5">
                                        <p className="text-sm text-[#aeaeae] font-bold">Descrição</p>
                                        <p>{order.descricao ?? "N/A"}</p>
                                    </span>
                                    <span className="flex flex-col gap-0.5">
                                        <p className="text-sm text-[#aeaeae] font-bold">Descrição alteração</p>
                                        <p>{order.descricaoAlteracao ?? "N/A"}</p>
                                    </span>
                                    <span className="flex flex-col gap-0.5">
                                        <p className="text-sm text-[#aeaeae] font-bold">Descrição do produto</p>
                                        <p>{order.descricaoProduto ?? "N/A"}</p>
                                    </span>
                                    <span className="flex flex-col gap-0.5">
                                        <p className="text-sm text-[#aeaeae] font-bold">Identificador do pedido</p>
                                        <p>{order.identificador ?? "N/A"}</p>
                                    </span>
                                    <span className="flex flex-col gap-0.5">
                                        <p className="text-sm text-[#aeaeae] font-bold">Status do pedido</p>
                                        <p>{order.status ?? "N/A"}</p>
                                    </span>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <h3 className="font-bold">Tipo do pedido</h3>
                                    <span className="flex flex-col gap-0.5">
                                        <p className="text-sm text-[#aeaeae] font-bold">Descrição</p>
                                        <p>{order.pedidoTipo.descricao ?? "N/A"}</p>
                                    </span>
                                    <span className="flex flex-col gap-0.5">
                                        <p className="text-sm text-[#aeaeae] font-bold">Resolução</p>
                                        <p>{order.pedidoTipo.resolucao ?? "N/A"}</p>
                                    </span>
                                    <span className="flex flex-col gap-0.5">
                                        <p className="text-sm text-[#aeaeae] font-bold">Tempo limite</p>
                                        <p>{order.pedidoTipo.tempoLimite ?? "N/A"} {order.pedidoTipo.tempoLimite && "minutos"}</p>
                                    </span>
                                    <span className="flex flex-col gap-0.5">
                                        <p className="text-sm text-[#aeaeae] font-bold">Valor</p>
                                        <p>{order.pedidoTipo.valor.toLocaleString("pt-br", { style: "currency", currency: "BRL" }) ?? "N/A"}</p>
                                    </span>
                                </div>

                            </div>
                        ))
                            : ""
                        }
                        {console.log(selectedOrder)}
                    </SheetContent>
                </Sheet>
            </section >
        </>
    )
}