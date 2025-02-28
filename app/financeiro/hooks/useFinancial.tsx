import { RestClient } from "@/lib/RestClient/RestClient"
import { useEffect, useState } from "react"
import { EnumRegisterOrderStatus, Order } from "../types/types"

export default function useFinancial() {
    const restClient = new RestClient()
    const [orders, setOrders] = useState<Array<Order>>()
    const [loading, setLoading] = useState(false)
    const [loadingOrders, setLoadingOrders] = useState(false)
    const [registerStatus, setRegisterStatus] = useState<EnumRegisterOrderStatus | string>("")

    function getOrders() {
        setLoadingOrders(true)
        restClient.handleFetchOrders()
            .then(res => {
                setOrders(res._embedded.pedidoConsultaModelList)
            })
            .catch(err => console.error(err))
            .finally(() => setLoadingOrders(false))
    }

    function handleChangePayment(orderId: string | number, status: string) {
        setLoading(true)
        const payload = {
            status: status
        }
        restClient.handleChangeStatusPayment(orderId, payload)
            .then(() => {
                setRegisterStatus(EnumRegisterOrderStatus.REGISTER_SUCCESSFULL)
            })
            .catch(() => setRegisterStatus(EnumRegisterOrderStatus.REGISTER_UNSUCCESSFULL))
            .finally(() => {
                setLoading(false)
            })
    }

    useEffect(() => {
        if (registerStatus == EnumRegisterOrderStatus.DELETED_SUCCESSFULL || registerStatus == EnumRegisterOrderStatus.REGISTER_SUCCESSFULL) {
            getOrders()
        }
    }, [registerStatus])

    useEffect(() => {
        getOrders()
    }, [])

    return {
        orders,
        loading,
        loadingOrders,
        handleChangePayment
    }
}