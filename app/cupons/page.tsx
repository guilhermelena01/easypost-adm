/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client"

import { montserrat } from "@/lib/utils/utils";
import CouponTable from "./CouponsTable/page";
import CouponDialogForm from "./CouponDialogForm/page";
import { useEffect, useState } from "react";
import useCoupons from "./hooks/useCoupons";
import LoaderComponent from "@/components/Loader";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { EnumRegisterCouponsStatus } from "./types/types";

export default function Cupons() {
    const [user, setUser] = useState()
    const { coupons, loading, loadingCoupons, registerCoupons, deleteCoupons, registerStatus } = useCoupons()
    const [couponPayload, setCouponPayload] = useState()
    const [showConfirmationModal, setShowConfirmationModal] = useState(false)
    const [coupomId, setCoupomId] = useState("")
    const [showCoupomDialog, setShowCoupomDialog] = useState(false)

    function handleRegisterCoupons() {
        const recoveryUSer = JSON.parse(user)
        registerCoupons(couponPayload, recoveryUSer.id)
    }

    function handleDeleteCoupons() {
        if (coupomId) {
            deleteCoupons(coupomId)
            setShowConfirmationModal(false)
        }
    }

    useEffect(() => {
        const recoveryUSer = localStorage.getItem("user")
        setUser(recoveryUSer)
    }, [])

    useEffect(() => {
        registerStatus == EnumRegisterCouponsStatus.REGISTER_SUCCESSFULL && setShowCoupomDialog(false)
    },[registerStatus])

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
                open={showCoupomDialog}
                setOpen={setShowCoupomDialog}
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
                        <Button onClick={handleDeleteCoupons} variant={"destructive"}>
                            Excluir cupom
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </section>
    )
}