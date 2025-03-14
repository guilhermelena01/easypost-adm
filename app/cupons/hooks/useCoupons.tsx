/* eslint-disable @typescript-eslint/no-explicit-any */
import { RestClient } from "@/lib/RestClient/RestClient"
import { useEffect, useState } from "react"
import { Coupon, EnumRegisterCouponsStatus } from "../types/types"
import { unformatCurrency } from "@/lib/utils/utils"
import { toast } from "react-toastify"

export default function useCoupons() {
    const restClient = new RestClient()
    const [loading, setLoading] = useState(false)
    const [loadingCoupons, setLoadingCoupons] = useState(false)
    const [registerStatus, setRegisterStatus] = useState<EnumRegisterCouponsStatus | string>("")
    const [coupons, setCoupons] = useState<Array<Coupon>>([])

    function getCoupons() {
        setLoadingCoupons(true)
        restClient.handleFetchCoupons()
            .then((res: any) => {
                setCoupons(res._embedded.cupomModelList)
            })
            .catch((err) => console.error(err))
            .finally(() => setLoadingCoupons(false))
    }

    function registerCoupons(productPayload: Coupon, userId: number) {
        setLoading(true)
        const payloadToSend = {
            ...productPayload,
            valor: unformatCurrency(productPayload.valor),
            usuario: {
                id: userId
            }
        }
        restClient.handleRegisterCoupons(payloadToSend)
            .then(() => {
                setRegisterStatus(EnumRegisterCouponsStatus.REGISTER_SUCCESSFULL)
            })
            .catch(() => setRegisterStatus(EnumRegisterCouponsStatus.REGISTER_UNSUCCESSFULL))
            .finally(() => {
                setLoading(false)
            })
    }

    function deleteCoupons(coupomId: string | number) {
        setLoading(true)
        restClient.handleDeleteCoupons(coupomId)
            .then((res: any) => {
                if (res === null) { // Caso de sucesso (204 No Content)
                    setRegisterStatus(EnumRegisterCouponsStatus.DELETED_SUCCESSFULL);
                    return;
                }
                if (res.status === 400) { // Caso de erro tratado pela API
                    toast.error(res.detail);
                    return;
                }
            })
            .catch(() => setRegisterStatus(EnumRegisterCouponsStatus.DELETED_UNSUCCESSFULL))
            .finally(() => {
                setLoading(false)
            })
    }

    useEffect(() => {
        if (registerStatus == EnumRegisterCouponsStatus.REGISTER_SUCCESSFULL || registerStatus == EnumRegisterCouponsStatus.DELETED_SUCCESSFULL) {
            getCoupons()
            setRegisterStatus("")
        }
    }, [registerStatus])

    useEffect(() => {
        getCoupons()
    }, [])

    return {
        deleteCoupons,
        loading,
        loadingCoupons,
        coupons,
        registerStatus,
        registerCoupons,
    }
}