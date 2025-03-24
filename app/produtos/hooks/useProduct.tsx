import { RestClient } from "@/lib/RestClient/RestClient"
import { useEffect, useState } from "react"
import { EnumRegisterProductStatus, Product } from "../types/types"
import { unformatCurrency } from "@/lib/utils/utils"
import { toast } from "react-toastify"

export default function UseProduct() {
    const restClient = new RestClient()
    const [loading, setLoading] = useState(false)
    const [loadingProducts, setLoadingProducts] = useState(false)
    const [deletingProduct, setDeletingProduct] = useState(false)
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
        const payloadToSend = {
            ...productPayload,
            valor: unformatCurrency(productPayload.valor.toString()),
        }
        restClient.handleRegisterProducts(payloadToSend)
            .then(() => {
                setRegisterStatus(EnumRegisterProductStatus.REGISTER_SUCCESSFULL)
            })
            .catch(() => setRegisterStatus(EnumRegisterProductStatus.REGISTER_UNSUCCESSFULL))
            .finally(() => {
                setLoading(false)
            })
    }

    function editProducts(productPayload: Product, productId: string | number) {
        setLoading(true)
        const payloadToSend = {
            ...productPayload,
            valor: unformatCurrency(productPayload.valor.toString()),
        }
        restClient.handleEditProducts(payloadToSend, productId)
            .then((res) => {
                if (res.status === 400) { // Caso de erro tratado pela API
                    toast.error(res.detail);
                    return;
                }
                setRegisterStatus(EnumRegisterProductStatus.REGISTER_SUCCESSFULL)
            })
            .catch(() => setRegisterStatus(EnumRegisterProductStatus.REGISTER_UNSUCCESSFULL))
            .finally(() => {
                setLoading(false)
            })
    }

    function deleteProducts(productId: string | number) {
        setDeletingProduct(true)
        restClient.handleDeleteProducts(productId)
            .then((res) => {
                if (res === null) {
                    setRegisterStatus(EnumRegisterProductStatus.DELETED_SUCCESSFULL)
                    return;
                }
                if (res.status === 400) {
                    toast.error(res.detail)
                    return;
                }
            })
            .catch(() => setRegisterStatus(EnumRegisterProductStatus.DELETED_UNSUCCESSFULL))
            .finally(() => {
                setDeletingProduct(false)
            })
    }

    useEffect(() => {
        console.log(registerStatus)
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
        deleteProducts,
        editProducts
    }
}