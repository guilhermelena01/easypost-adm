/* eslint-disable @typescript-eslint/no-explicit-any */
import { RestClient } from "@/lib/RestClient/RestClient"
import { useEffect, useState } from "react"
import { EnumRegisterTagsStatus, Tag } from "../types/types"
import { toast } from "react-toastify"

export default function useTags() {
    const restClient = new RestClient()
    const [loading, setLoading] = useState(false)
    const [registerStatus, setRegisterStatus] = useState<EnumRegisterTagsStatus | string>("")
    const [tags, setTags] = useState<Array<Tag>>([])

    function getTags() {
        setLoading(true)
        restClient.handleFetchTags()
            .then((res: any) => {
                setTags(res)
            })
            .catch((err) => console.error(err))
            .finally(() => setLoading(false))
    }

    function registerTags(productPayload: Tag) {
        setLoading(true)
        restClient.handleRegisterTags(productPayload)
            .then(() => {
                setRegisterStatus(EnumRegisterTagsStatus.REGISTER_SUCCESSFULL)
            })
            .catch(() => setRegisterStatus(EnumRegisterTagsStatus.REGISTER_UNSUCCESSFULL))
            .finally(() => {
                setLoading(false)
            })
    }

    function deleteTags(tagId: string | number) {
        setLoading(true)
        restClient.handleDeleteTags(tagId)
            .then((res) => {
                if (res === null) {
                    setRegisterStatus(EnumRegisterTagsStatus.DELETED_SUCCESSFULL)
                    return;
                }
                if (res.status === 400) {
                    toast.error(res.detail)
                    return;
                }
            })
            .catch(() => setRegisterStatus(EnumRegisterTagsStatus.DELETED_UNSUCCESSFULL))
            .finally(() => {
                setLoading(false)
            })
    }

    useEffect(() => {
        if (registerStatus == EnumRegisterTagsStatus.REGISTER_SUCCESSFULL || registerStatus == EnumRegisterTagsStatus.DELETED_SUCCESSFULL) {
            getTags()
            setRegisterStatus("")
        }
    }, [registerStatus])

    useEffect(() => {
        getTags()
    }, [])

    return {
        loading,
        tags,
        registerStatus,
        registerTags,
        deleteTags
    }
}