import { RestClient } from "@/lib/RestClient/RestClient"
import { useEffect, useState } from "react"
import { Coupon, EnumRegisterCouponsStatus } from "../types/types"

export default function useCoupons() {
    const restClient = new RestClient()
    const [loading, setLoading] = useState(false)
    const [registerStatus, setRegisterStatus] = useState<EnumRegisterCouponsStatus | string>("")
    const [coupons, setCoupons] = useState<Array<Coupon>>([])

    function getCoupons() {
        setLoading(true)
        restClient.handleFetchCoupons()
            .then((res: any) => {
                setCoupons(res._embedded.cupomModelList)
            })
            .catch((err) => console.error(err))
            .finally(() => setLoading(false))
    }

    function registerCoupons(productPayload: Coupon) {
        setLoading(true)
        restClient.handleRegisterCoupons(productPayload)
            .then(() => {
                setRegisterStatus(EnumRegisterCouponsStatus.REGISTER_SUCCESSFULL)
            })
            .catch(() => setRegisterStatus(EnumRegisterCouponsStatus.REGISTER_UNSUCCESSFULL))
            .finally(() => {
                setLoading(false)
            })
    }

    useEffect(() => {
        if (registerStatus == EnumRegisterCouponsStatus.REGISTER_SUCCESSFULL) {
            getCoupons()
            setRegisterStatus("")
        }
    }, [registerStatus])

    useEffect(() => {
        getCoupons()
    }, [])

    return {
        loading,
        coupons,
        registerStatus,
        registerCoupons,
    }
}