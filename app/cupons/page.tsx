"use client"

import { montserrat } from "@/lib/utils/utils";
import CouponTable from "./CouponsTable/page";
import CouponDialogForm from "./CouponDialogForm/page";
import { useState } from "react";
import useCoupons from "./hooks/useCoupons";
import LoaderComponent from "@/components/Loader";

export default function Cupons() {
    const { coupons, loading, loadingCoupons, registerCoupons } = useCoupons()
    const [couponPayload, setCouponPayload] = useState()

    function handleRegisterCoupons() {
        registerCoupons(couponPayload)
    }

    return (
        <section className="w-full h-dvh flex flex-col gap-8 py-8 pr-8">
            <h1 className={`text-2xl font-bold ${montserrat.className}`}>Cupons</h1>
            {loadingCoupons ? <LoaderComponent /> :
                <CouponTable
                    data={coupons}
                    loading={loadingCoupons}
                />}
            <CouponDialogForm
                handlePayload={setCouponPayload}
                registerCoupon={handleRegisterCoupons}
                loading={loading}
            />
        </section>
    )
}