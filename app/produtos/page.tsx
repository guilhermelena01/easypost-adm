/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { montserrat } from "@/lib/utils/utils";
import ProductTable from "./components/ProductTable/page";
import ProductDialogForm from "./components/ProductDialogForm/page";
import UseProduct from "./hooks/useProduct";
import { useEffect, useState } from "react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import LoaderComponent from "@/components/Loader";
import { EnumRegisterProductStatus, Product } from "./types/types";

export default function Produtos() {
    const { products, loading, registerProducts, registerStatus, deleteProducts, loadingProducts, editProducts } = UseProduct()
    const [payload, setPayload] = useState<Product | any>()
    const [showConfirmationModal, setShowConfirmationModal] = useState(false)
    const [productId, setProductId] = useState("")
    const [showProductDialog, setShowProductDialog] = useState(false)
    const [modalType, setModalType] = useState<"edit" | "remove" | string>("")

    function handleRegisterProducts() {
        registerProducts(payload)
    }

    function handleEditProducts() {
        editProducts(payload, productId)
    }

    function handleDeleteProducts() {
        if (productId) {
            deleteProducts(productId)
            setShowConfirmationModal(false)
        }
    }

    function handleModal(show: boolean, modalType: string) {
        setShowConfirmationModal(show)
        setModalType(modalType)
    }

    useEffect(() => {
        if (registerStatus == EnumRegisterProductStatus.REGISTER_SUCCESSFULL) {
            setShowProductDialog(false)
            setModalType("")
        }
    }, [registerStatus])

    return (
        <section className="w-full h-dvh flex flex-col gap-8 py-8 pr-8">
            <h1 className={`text-2xl font-bold ${montserrat.className}`}>Produtos</h1>
            {loadingProducts ? <LoaderComponent /> :
                <ProductTable
                    data={products}
                    showConfirmationModal={handleModal}
                    setProductId={setProductId}
                />
            }
            <ProductDialogForm
                editPayload={products.filter((item) => item.id == productId)}
                handlePayload={setPayload}
                handleProduct={modalType == "edit" ? handleEditProducts : handleRegisterProducts}
                loading={loading}
                open={showProductDialog || modalType == "edit"}
                setOpen={setShowProductDialog}
                edit={modalType == "edit"}
                setEdit={setModalType}
            />

            <Dialog open={showConfirmationModal && modalType == "remove"} onOpenChange={setShowConfirmationModal}>
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