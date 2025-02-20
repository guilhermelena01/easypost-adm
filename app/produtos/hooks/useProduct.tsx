import { RestClient } from "@/lib/RestClient/RestClient"
import { useEffect, useState } from "react"
import { EnumRegisterProductStatus, Product } from "../types/types"

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
                console.log(res)
                setRegisterStatus(EnumRegisterProductStatus.REGISTER_SUCCESSFULL)
            })
            .catch(() => setRegisterStatus(EnumRegisterProductStatus.REGISTER_UNSUCCESSFULL))
            .finally(() => setLoading(false))
    }

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