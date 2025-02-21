"use client"

import { montserrat } from "@/lib/utils/utils";
import ProductTable from "./components/ProductTable/page";
import ProductDialogForm from "./components/ProductDialogForm/page";
import UseProduct from "./hooks/useProduct";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function Produtos() {
    const { products, loading, registerProducts, registerStatus, deleteProducts } = UseProduct()
    const [payload, setPayload] = useState()
    const [showConfirmationModal, setShowConfirmationModal] = useState(false)
    const [productId, setProductId] = useState("")

    function handleRegisterProducts() {
        registerProducts(payload)
    }

    function handleDeleteProducts() {
        if (productId) {
            deleteProducts(productId)
            setShowConfirmationModal(false)
        }
    }

    return (
        <section className="w-full h-dvh flex flex-col gap-8 py-8 pr-8">
            <h1 className={`text-2xl font-bold ${montserrat.className}`}>Produtos</h1>
            <ProductTable
                data={products}
                showConfirmationModal={setShowConfirmationModal}
                setProductId={setProductId}
            />
            <ProductDialogForm
                handlePayload={setPayload}
                registerProduct={handleRegisterProducts}
                loading={loading}
            />
            <Dialog open={showConfirmationModal}>
                <DialogContent className="w-[420px]">
                    <DialogTitle>Deseja realmente excluir este produto?</DialogTitle>
                    <DialogDescription>
                        Esta opção é irreversível e definitiva. Você tem certeza que quer excluir permanentemente este produto da nossa base de dados?
                    </DialogDescription>
                    <DialogFooter>
                        <Button onClick={handleDeleteProducts} variant={"destructive"}>
                            Excluir produto
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </section>

    )
}