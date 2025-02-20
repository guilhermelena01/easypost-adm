import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Product } from "../../types/types";

interface ProductDialogFormProps {
    registerProduct: () => void;
    handlePayload: (payload: object) => void;
    loading: boolean;
}

export default function ProductDialogForm({ handlePayload, registerProduct, loading }: ProductDialogFormProps) {

    const [productPayload, setProductPayload] = useState<Product>({
        cor: "",
        descricao: "",
        resolucao: "",
        tempoLimite: 0,
        valor: 0
    })

    useEffect(() => {
        handlePayload(productPayload)
    }, [productPayload])

    return (
        <Dialog>
            <DialogTrigger asChild className="fixed right-8 bottom-8">
                <Button>
                    <Plus />
                    Novo produto
                </Button>
            </DialogTrigger>
            <DialogContent className="w-full">
                <DialogHeader>
                    <DialogTitle>Cadastrar novo produto</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name">
                            Descrição
                        </Label>
                        <Input
                            className="col-span-3"
                            value={productPayload.descricao}
                            onChange={(e) => setProductPayload({ ...productPayload, descricao: e.target.value })}
                            placeholder="Insira a descrição do produto" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username">
                            Valor
                        </Label>
                        <Input
                            className="col-span-3"
                            value={productPayload.valor}
                            onChange={(e) => setProductPayload({ ...productPayload, valor: e.target.value })}
                            placeholder="Insira o valor do produto" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name">
                            Prazo limite para entrega
                        </Label>
                        <Input
                            className="col-span-3"
                            value={productPayload.tempoLimite}
                            onChange={(e) => setProductPayload({ ...productPayload, tempoLimite: e.target.value })}
                            placeholder="Insira o prazo limite para a entrega do produto" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username">
                            Cor
                        </Label>
                        <Input
                            className="col-span-3"
                            value={productPayload.cor}
                            onChange={(e) => setProductPayload({ ...productPayload, cor: e.target.value })}
                            placeholder="Preencha com a cor para o produto" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username">
                            Resolução
                        </Label>
                        <Input
                            value={productPayload.resolucao}
                            onChange={(e) => setProductPayload({ ...productPayload, resolucao: e.target.value })}
                            placeholder="Insira uma resolução para o produto"
                            className="col-span-3" />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={registerProduct}>
                        Cadastrar produto
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}