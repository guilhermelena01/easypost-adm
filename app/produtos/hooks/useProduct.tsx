import { RestClient } from "@/lib/RestClient/RestClient"
import { useEffect, useState } from "react"
import { EnumRegisterProductStatus, Product } from "../types/types"
import { useRouter } from "next/router"

export default function UseProduct() {
    const restClient = new RestClient()
    const [loading, setLoading] = useState(false)
    const [registerStatus, setRegisterStatus] = useState<EnumRegisterProductStatus | string>("")
    const [products, setProducts] = useState<Array<Product>>([])

    function getProducts() {
        setLoading(true)
        restClient.handleFetchProducts()
            .then((res: any) => {
                setProducts(res)
            })
            .catch((err) => console.error(err))
            .finally(() => setLoading(false))
    }

    function registerProducts(productPayload: Product) {
        setLoading(true)
        restClient.handleRegisterProducts(productPayload)
            .then((res) => {
                setRegisterStatus(EnumRegisterProductStatus.REGISTER_SUCCESSFULL)
            })
            .catch(() => setRegisterStatus(EnumRegisterProductStatus.REGISTER_UNSUCCESSFULL))
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        if (registerStatus == EnumRegisterProductStatus.REGISTER_SUCCESSFULL) {
            getProducts()
            return window.location.reload();
        }
    },[registerStatus])

    useEffect(() => {
        getProducts()
    }, [])

    return {
        loading,
        products,
        registerStatus,
        registerProducts
    }
}