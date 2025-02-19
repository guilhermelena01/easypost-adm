"use client"

import { montserrat } from "@/lib/utils/utils";
import CouponTable from "./CouponsTable/page";
import CouponDialogForm from "./CouponDialogForm/page";
import { useState } from "react";

export default function Cupons() {
    const [couponPayload, setCouponPayload] = useState()
    const data = [{
        "id": 5,
        "codigo": "GUI123",
        "quantidade": 20,
        "valor": 10.00,
        "dataCriacao": "2025-02-19T00:14:31.82636",
        "dataValidade": "2025-06-15T09:30:39.251",
        "status": "ATIVO",
    }]

    return (
        <section className="w-full h-dvh flex flex-col gap-8 py-8 pr-8">
            <h1 className={`text-2xl font-bold ${montserrat.className}`}>Cupons</h1>
            <CouponTable
                data={data}
            />
            <CouponDialogForm
                handlePayload={setCouponPayload}
            />
        </section>
    )
}