/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { montserrat } from "@/lib/utils/utils";
import ProductTable from "./components/ProductTable/page";
import ProductDialogForm from "./components/ProductDialogForm/page";
import UseProduct from "./hooks/useProduct";
import { useEffect, useState } from "react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import LoaderComponent from "@/components/Loader";
import { EnumRegisterProductStatus } from "./types/types";

export default function Produtos() {
    const { products, loading, registerProducts, registerStatus, deleteProducts, loadingProducts } = UseProduct()
    const [payload, setPayload] = useState()
    const [showConfirmationModal, setShowConfirmationModal] = useState(false)
    const [productId, setProductId] = useState("")
    const [showProductDialog, setShowProductDialog] = useState(false)

    function handleRegisterProducts() {
        registerProducts(payload)
    }

    function handleDeleteProducts() {
        if (productId) {
            deleteProducts(productId)
            setShowConfirmationModal(false)
        }
    }

    useEffect(() => {
        registerStatus == EnumRegisterProductStatus.REGISTER_SUCCESSFULL && setShowProductDialog(false)
    },[registerStatus])

    return (
        <section className="w-full h-dvh flex flex-col gap-8 py-8 pr-8">
            <h1 className={`text-2xl font-bold ${montserrat.className}`}>Produtos</h1>
            {loadingProducts ? <LoaderComponent /> :
                <ProductTable
                    data={products}
                    showConfirmationModal={setShowConfirmationModal}
                    setProductId={setProductId}
                />
            }
            <ProductDialogForm
                handlePayload={setPayload}
                registerProduct={handleRegisterProducts}
                loading={loading}
                open={showProductDialog}
                setOpen={setShowProductDialog}
            />
            <Dialog open={showConfirmationModal}>
                <DialogContent className="w-[420px]">
                    <DialogTitle>Deseja realmente excluir este produto?</DialogTitle>
                    <DialogDescription>
                        Esta opção é irreversível e definitiva. Você tem certeza que quer excluir permanentemente este produto da nossa base de dados?
                    </DialogDescription>
                    <DialogFooter>
                        <Button type="button" variant={"ghost"} onClick={() => setShowConfirmationModal(false)}>
                            Cancelar
                        </Button>
                        <Button onClick={handleDeleteProducts} variant={"destructive"}>
                            Excluir produto
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </section>

    )
}