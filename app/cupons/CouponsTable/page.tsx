"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CouponsTableProps } from "../types/types";
import { formatDate } from "@/lib/utils/utils";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import TableSkeleton from "@/components/TableSkeleton";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export default function CouponTable({ data, loading, setCoupomId, showConfirmationModal }: CouponsTableProps) {
    const [searchTerm, setSearchTerm] = useState("");

    const dadosFiltrados = data && data.length > 0 ? data
        .filter(item =>
            item.id.toString().includes(searchTerm) ||
            item.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.quantidade.toString().toLowerCase().includes(searchTerm.toLowerCase())
        ) : []

    function handleConfirmatioModal(id: string | number) {
        setCoupomId(id)
        showConfirmationModal(true)
    }

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
                        <TableHead>Código</TableHead>
                        <TableHead>Valor</TableHead>
                        <TableHead>Quantidade</TableHead>
                        <TableHead>Data de criação</TableHead>
                        <TableHead>Data de validade</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Ações</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {dadosFiltrados && dadosFiltrados.length > 0 ? dadosFiltrados.map((item, idx) => (
                        <TableRow key={idx}>
                            <TableCell>{item.id}</TableCell>
                            <TableCell>{item.codigo}</TableCell>
                            <TableCell>{item.valor.toLocaleString("pt-br", { style: "currency", currency: "BRL" })}</TableCell>
                            <TableCell>{item.quantidade}</TableCell>
                            <TableCell>{formatDate(item.dataCriacao)}</TableCell>
                            <TableCell>{formatDate(item.dataValidade)}</TableCell>
                            <TableCell>{item.status}</TableCell>
                            <TableCell>
                                <div className="flex gap-2">
                                    <Button variant="destructive" size="icon" onClick={() => handleConfirmatioModal(item.id)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    )) : []}
                </TableBody>
            </Table>
        </>
    )
}