"use client"

import { montserrat } from "@/lib/utils/utils";
import CouponTable from "./CouponsTable/page";
import CouponDialogForm from "./CouponDialogForm/page";
import { useState } from "react";
import useCoupons from "./hooks/useCoupons";
import LoaderComponent from "@/components/Loader";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import useAppData from "@/hooks/useAppData";

export default function Cupons() {
    // const {user} = useAppData()
    const user = localStorage.getItem("user")
    const { coupons, loading, loadingCoupons, registerCoupons, deleteCoupons } = useCoupons()
    const [couponPayload, setCouponPayload] = useState()
    const [showConfirmationModal, setShowConfirmationModal] = useState(false)
    const [coupomId, setCoupomId] = useState("")

    function handleRegisterCoupons() {
        const recoveryUSer = JSON.parse(user)
        registerCoupons(couponPayload, recoveryUSer.id)
    }

    function handleDeleteProducts() {
        if (coupomId) {
            deleteCoupons(coupomId)
            setShowConfirmationModal(false)
        }
    }

    return (
        <section className="w-full h-dvh flex flex-col gap-8 py-8 pr-8">
            <h1 className={`text-2xl font-bold ${montserrat.className}`}>Cupons</h1>
            {loadingCoupons ? <LoaderComponent /> :
                <CouponTable
                    data={coupons}
                    loading={loadingCoupons}
                    showConfirmationModal={setShowConfirmationModal}
                    setCoupomId={setCoupomId}
                />}
            <CouponDialogForm
                handlePayload={setCouponPayload}
                registerCoupon={handleRegisterCoupons}
                loading={loading}
            />

            <Dialog open={showConfirmationModal}>
                <DialogContent className="w-[420px]">
                    <DialogTitle>Deseja realmente excluir este cupom?</DialogTitle>
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