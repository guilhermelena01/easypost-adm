/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { montserrat } from "@/lib/utils/utils";
import { useEffect, useState } from "react";
import TagTable from "./components/TagsTable";
import useTags from "./hooks/useTags";
import TagDialogForm from "./TagDialogForm/page";
import { EnumRegisterTagsStatus } from "./types/types";

export default function Tags() {
    const { tags, loading, registerTags, registerStatus } = useTags()
    const [tagPayload, setTagPayload] = useState()
    const [showTagDialog, setShowTagDialog] = useState(false)

    function handleRegisterTags() {
        registerTags(tagPayload)
    }

    useEffect(() => {
        registerStatus == EnumRegisterTagsStatus.REGISTER_SUCCESSFULL && setShowTagDialog(false)
    },[registerStatus])

    return (
        <section className="w-full h-dvh flex flex-col gap-8 py-8 pr-8">
            <h1 className={`text-2xl font-bold ${montserrat.className}`}>Tags</h1>
            <TagTable
                data={tags}
            />
            <TagDialogForm
                handlePayload={setTagPayload}
                registerTag={handleRegisterTags}
                loading={loading}
                open={showTagDialog}
                setOpen={setShowTagDialog}
            />
        </section>
    )
}