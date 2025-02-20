"use client"

import { montserrat } from "@/lib/utils/utils";
import ProductTable from "./components/ProductTable/page";
import ProductDialogForm from "./components/ProductDialogForm/page";
import UseProduct from "./hooks/useProduct";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Produtos() {
    const { products, loading, registerProducts, registerStatus } = UseProduct()
    const [payload, setPayload] = useState()
    const router = useRouter()

    function handleRegisterProducts() {
        registerProducts(payload)
    }

    return (
        <section className="w-full h-dvh flex flex-col gap-8 py-8 pr-8">
            <h1 className={`text-2xl font-bold ${montserrat.className}`}>Produtos</h1>
            <ProductTable data={products} />
            <ProductDialogForm
                handlePayload={setPayload}
                registerProduct={handleRegisterProducts}
                loading={loading}
            />
        </section>

    )
}