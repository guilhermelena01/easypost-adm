import { RestClient } from "@/lib/RestClient/RestClient"
import { useEffect, useState } from "react"
import { EnumRegisterProductStatus, Product } from "../types/types"

export default function UseProduct() {
    const restClient = new RestClient()
    const [loading, setLoading] = useState(false)
    const [loadingProducts, setLoadingProducts] = useState(false)
    const [registerStatus, setRegisterStatus] = useState<EnumRegisterProductStatus | string>("")
    const [products, setProducts] = useState<Array<Product>>([])

    function getProducts() {
        setLoadingProducts(true)
        restClient.handleFetchProducts()
            .then((res: any) => {
                setProducts(res)
            })
            .catch((err) => console.error(err))
            .finally(() => setLoadingProducts(false))
    }

    function registerProducts(productPayload: Product) {
        setLoading(true)
        restClient.handleRegisterProducts(productPayload)
            .then(() => {
                setRegisterStatus(EnumRegisterProductStatus.REGISTER_SUCCESSFULL)
            })
            .catch(() => setRegisterStatus(EnumRegisterProductStatus.REGISTER_UNSUCCESSFULL))
            .finally(() => {
                setLoading(false)
            })
    }

    function deleteProducts(productId: string | number) {
        setLoading(true)
        restClient.handleDeleteProducts(productId)
            .then(() => {
                setRegisterStatus(EnumRegisterProductStatus.DELETED_SUCCESSFULL)
            })
            .catch(() => setRegisterStatus(EnumRegisterProductStatus.DELETED_UNSUCCESSFULL))
            .finally(() => {
                setLoading(false)
            })
    }

    useEffect(() => {
        if (registerStatus == EnumRegisterProductStatus.REGISTER_SUCCESSFULL || registerStatus == EnumRegisterProductStatus.DELETED_SUCCESSFULL) {
            getProducts()
            setRegisterStatus("")
        }
    }, [registerStatus])

    useEffect(() => {
        getProducts()
    }, [])

    return {
        loading,
        loadingProducts,
        products,
        registerStatus,
        registerProducts,
        deleteProducts
    }
}