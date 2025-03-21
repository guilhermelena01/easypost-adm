/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { montserrat } from "@/lib/utils/utils";
import { useEffect, useState } from "react";
import TagTable from "./components/TagsTable";
import useTags from "./hooks/useTags";
import TagDialogForm from "./TagDialogForm/page";
import { EnumRegisterTagsStatus } from "./types/types";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function Tags() {
    const { tags, loading, registerTags, registerStatus, deleteTags, editTags } = useTags()
    const [tagPayload, setTagPayload] = useState()
    const [tagId, setTagId] = useState("")
    const [showTagDialog, setShowTagDialog] = useState(false)
    const [showConfirmationModal, setShowConfirmationModal] = useState(false)
    const [modalType, setModalType] = useState<"edit" | "remove" | string>("")

    function handleRegisterTags() {
        registerTags(tagPayload)
    }

    function handleDeleteTags() {
        if (tagId) {
            deleteTags(tagId)
            setShowConfirmationModal(false)
        }
    }

    function handleModal(show: boolean, modalType: string) {
        setShowConfirmationModal(show)
        setModalType(modalType)
    }

    function handleEditTags() {
        editTags(tagPayload, tagId)
    }

    useEffect(() => {
        if (registerStatus == EnumRegisterTagsStatus.REGISTER_SUCCESSFULL) {
            setShowTagDialog(false)
            setModalType("")
        }
    }, [registerStatus])

    return (
        <section className="w-full h-dvh flex flex-col gap-8 py-8 pr-8">
            <h1 className={`text-2xl font-bold ${montserrat.className}`}>Tags</h1>
            <TagTable
                data={tags}
                showConfirmationModal={handleModal}
                setTagId={setTagId}
            />
            <TagDialogForm
                handlePayload={setTagPayload}
                handleTag={modalType == "edit" ? handleEditTags : handleRegisterTags}
                loading={loading}
                open={showTagDialog || modalType == "edit"}
                setOpen={setShowTagDialog}
                edit={modalType == "edit"}
                setEdit={setModalType}
            />
            <Dialog open={showConfirmationModal && modalType == "remove"}>
                <DialogContent className="w-[420px]">
                    <DialogTitle>Deseja realmente excluir este produto?</DialogTitle>
                    <DialogDescription>
                        Esta opção é irreversível e definitiva. Você tem certeza que quer excluir permanentemente este produto da nossa base de dados?
                    </DialogDescription>
                    <DialogFooter>
                        <Button type="button" variant={"ghost"} onClick={() => setShowConfirmationModal(false)}>
                            Cancelar
                        </Button>
                        <Button onClick={handleDeleteTags} variant={"destructive"}>
                            Excluir produto
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </section>
    )
}