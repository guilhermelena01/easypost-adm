import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { EnumRazaoFechamentoTicket } from "../../types/type";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface TicketFinishDialogProps {
    open: boolean;
    handleDialog: (show: boolean) => void;
    handleFinishTicket: () => void;
    payload: any;
    setPayload: any;
}

export default function TicketFinishDialog({ open, handleDialog, handleFinishTicket, payload, setPayload }: TicketFinishDialogProps) {
    const options = [EnumRazaoFechamentoTicket.CONSEGUI_RESOLVER, EnumRazaoFechamentoTicket.NAO_PRECISO, EnumRazaoFechamentoTicket.PROBLEMA_DESAPARECEU, EnumRazaoFechamentoTicket.OUTRO]

    function formatReason(reason: EnumRazaoFechamentoTicket) {
        switch (reason) {
            case EnumRazaoFechamentoTicket.CONSEGUI_RESOLVER:
                return "Usuário conseguiu resolver";
            case EnumRazaoFechamentoTicket.NAO_PRECISO:
                return "Usuário não precisou mais";
            case EnumRazaoFechamentoTicket.OUTRO:
                return "Outro motivo";
            case EnumRazaoFechamentoTicket.PROBLEMA_DESAPARECEU:
                return "O problema desapareceu"
        }
    }

    return (
        <Dialog open={open}>
            <DialogContent className="w-[600px]">
                <DialogTitle>Deseja realmente finalizar este chamado?</DialogTitle>
                <DialogDescription>
                    Se sim, selecione o motivo e dê mais detalhes do porquê irá finalizar este chamado. Lembre-se, essa ação é irreversível.
                </DialogDescription>
                <div className="flex flex-col gap-4">
                    <div className="flex gap-4 items-center">
                        <Label htmlFor="select" className="w-full">
                            Especifíque o motivo da finalização
                        </Label>
                        <Select value={payload.razaoFechamento} onValueChange={(newValue) => setPayload({ ...payload, razaoFechamento: newValue })}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {options.map((option, idx) => (
                                        <SelectItem key={idx} value={option}>{formatReason(option)}</SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex gap-4 items-center">
                        <Label htmlFor="select" className="w-full">
                            Detalhe a motivação
                        </Label>
                        <Textarea onChange={(e) => setPayload({ ...payload, detalhesFechamento: e.target.value })} rows={4} placeholder="Estou finalizando pois o usuário achou satisfatória a solução." />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="button" variant={"ghost"} onClick={() => handleDialog(false)}>
                        Cancelar
                    </Button>
                    <Button disabled={Object.values(payload).every((item) => item == "")} onClick={handleFinishTicket} variant={"default"} className="bg-[#77b233]">
                        Finalizar ticket
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}