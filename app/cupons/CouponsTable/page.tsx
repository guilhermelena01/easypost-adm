"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CouponsTableProps } from "../types/types";
import { formatDate } from "@/lib/utils/utils";
import { useState } from "react";
import { Input } from "@/components/ui/input";

export default function CouponTable({ data }: CouponsTableProps) {
    const [searchTerm, setSearchTerm] = useState("");

    const dadosFiltrados = data && data.length > 0 ? data
        .filter(item =>
            item.id.toString().includes(searchTerm) ||
            item.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.quantidade.toString().toLowerCase().includes(searchTerm.toLowerCase())
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
                        <TableHead>Código</TableHead>
                        <TableHead>Valor</TableHead>
                        <TableHead>Quantidade</TableHead>
                        <TableHead>Data de criação</TableHead>
                        <TableHead>Data de validade</TableHead>
                        <TableHead>Status</TableHead>
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
                        </TableRow>
                    )) : []}
                </TableBody>
            </Table>
        </>
    )
}