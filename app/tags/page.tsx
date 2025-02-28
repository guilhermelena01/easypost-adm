/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { montserrat } from "@/lib/utils/utils";
import { useState } from "react";
import TagTable from "./components/TagsTable";
import useTags from "./hooks/useTags";
import TagDialogForm from "./TagDialogForm/page";

export default function Tags() {
    const { tags, loading, registerTags } = useTags()
    const [tagPayload, setTagPayload] = useState()

    function handleRegisterTags() {
        registerTags(tagPayload)
    }

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
            />
        </section>
    )
}