"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { TagsTableProps } from "../types/types";

export default function TagTable({ data }: TagsTableProps) {
    const [searchTerm, setSearchTerm] = useState("");

    const dadosFiltrados = data && data.length > 0 ? data
        .filter(item =>
            item.id.toString().includes(searchTerm) ||
            item.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.cor.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.sigla.toString().toLowerCase().includes(searchTerm.toLowerCase())
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
                        <TableHead>Sigla</TableHead>
                        <TableHead>Cor</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {dadosFiltrados && dadosFiltrados.length > 0 ? dadosFiltrados.map((item, idx) => (
                        <TableRow key={idx}>
                            <TableCell>{item.id}</TableCell>
                            <TableCell>{item.descricao}</TableCell>
                            <TableCell>{item.sigla}</TableCell>
                            <TableCell>{item.cor}</TableCell>
                        </TableRow>
                    )) : []}
                </TableBody>
            </Table>
        </>
    )
}