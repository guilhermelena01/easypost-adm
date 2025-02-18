import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

interface ProductDialogFormProps {
    registerProduct: () => void;
    handlePayload: (payload: object) => void;
}

export default function ProductDialogForm({ handlePayload, registerProduct }: ProductDialogFormProps) {

    const [productPayload, setProductPayload] = useState({
        nome: "",
        descricao: "",
        prazo: "",
        valor: "",
        comissao: ""
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
                            Nome
                        </Label>
                        <Input
                            className="col-span-3"
                            value={productPayload.nome}
                            onChange={(e) => setProductPayload({ ...productPayload, nome: e.target.value })}
                            placeholder="Insira o nome do produto" />
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
                            Prazo estimado para entrega
                        </Label>
                        <Input
                            className="col-span-3"
                            value={productPayload.prazo}
                            onChange={(e) => setProductPayload({ ...productPayload, prazo: e.target.value })}
                            placeholder="Insira prazo estimado para a entrega do produto" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username">
                            Comissão do colaborador
                        </Label>
                        <Input
                            className="col-span-3"
                            value={productPayload.comissao}
                            onChange={(e) => setProductPayload({ ...productPayload, comissao: e.target.value })}
                            placeholder="Preencha com o valor da comissão do colaborador" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username">
                            Descrição
                        </Label>
                        <Textarea
                            value={productPayload.descricao}
                            onChange={(e) => setProductPayload({ ...productPayload, descricao: e.target.value })}
                            placeholder="Insira uma descrição detalhada sobre o produto que está sendo cadastrado"
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