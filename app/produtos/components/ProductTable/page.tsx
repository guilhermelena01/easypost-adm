"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { ProductTableProps } from "../../types/types";
import { useState } from "react";
import { Input } from "@/components/ui/input";

export default function ProductTable({ data, showConfirmationModal, setProductId }: ProductTableProps) {
    const [searchTerm, setSearchTerm] = useState("");

    function handleConfirmatioModal(id: string | number) {
        setProductId(id)
        showConfirmationModal(true)
    }

    const dadosFiltrados = data && data.length > 0 ? data
        .filter(item =>
            item.cor.toString().includes(searchTerm) ||
            item.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.tempoLimite.toString().toLowerCase().includes(searchTerm.toLowerCase())
        ) : []

    return (
        <>
            <div className="w-full flex justify-end gap-4">
                <Input
                    type="text"
                    placeholder="Pesquisar..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-1/4 p-2 border rounded-md shadow-sm"
                />
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Id</TableHead>
                        <TableHead>Descrição</TableHead>
                        <TableHead>Resolução</TableHead>
                        <TableHead>Ícone</TableHead>
                        <TableHead>Tempo limite</TableHead>
                        <TableHead>Valor</TableHead>
                        <TableHead>Ações</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {dadosFiltrados.map((item, idx) => (
                        <TableRow key={idx}>
                            <TableCell>{item.id}</TableCell>
                            <TableCell>{item.descricao}</TableCell>
                            <TableCell>{item.resolucao ?? "Não definida"}</TableCell>
                            <TableCell>
                                {/* <div className={`h-3 w-3 rounded-full ${!item.cor && "hidden"}`} style={{ background: `${item.cor}` }}></div> */}
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
