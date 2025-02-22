import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { ProductTableProps } from "../../types/types";

export default function ProductTable({ data, showConfirmationModal, setProductId }: ProductTableProps) {
    function handleConfirmatioModal(id: string | number) {
        setProductId(id)
        showConfirmationModal(true)
    }

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Id</TableHead>
                        <TableHead>Descrição</TableHead>
                        <TableHead>Resolução</TableHead>
                        <TableHead>Cor</TableHead>
                        <TableHead>Tempo limite</TableHead>
                        <TableHead>Valor</TableHead>
                        <TableHead>Ações</TableHead> {/* Nova coluna */}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((item, idx) => (
                        <TableRow key={idx}>
                            <TableCell>{item.id}</TableCell>
                            <TableCell>{item.descricao}</TableCell>
                            <TableCell>{item.resolucao ?? "Não definida"}</TableCell>
                            <TableCell>
                                <div className={`h-3 w-3 rounded-full ${!item.cor && "hidden"}`} style={{ background: `${item.cor}` }}></div>
                                {!item.cor && "Cor não definida"}
                            </TableCell>
                            <TableCell>{item.tempoLimite}</TableCell>
                            <TableCell>{item.valor.toLocaleString("pt-br", { style: "currency", currency: "BRL" })}</TableCell>
                            <TableCell>
                                <div className="flex gap-2">
                                    <Button variant="destructive" size="icon" onClick={() => handleConfirmatioModal(item.id)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
}
