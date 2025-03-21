"use client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CouponsTableProps } from "../types/types";
import { formatDate } from "@/lib/utils/utils";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function CouponTable({ data, loading, setCoupomId, showConfirmationModal }: CouponsTableProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFiltro, setStatusFiltro] = useState("ATIVO");
    const [sortConfig, setSortConfig] = useState<{ key: string | null, direction: "asc" | "desc" }>({ key: null, direction: "asc" });

    const handleSort = (key: string) => {
        let direction: "asc" | "desc" = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });
    };

    const dadosFiltrados = data && data.length > 0 ? data
        .filter(item => statusFiltro === "todos" || item.status === statusFiltro)
        .filter(item =>
            item.id.toString().includes(searchTerm) ||
            item.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.quantidade.toString().toLowerCase().includes(searchTerm.toLowerCase())
        ) : [];

    const dadosOrdenados = [...dadosFiltrados].sort((a, b) => {
        if (!sortConfig.key) return 0;
        const valueA = a[sortConfig.key];
        const valueB = b[sortConfig.key];

        if (typeof valueA === "string" && typeof valueB === "string") {
            return sortConfig.direction === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
        } else if (typeof valueA === "number" && typeof valueB === "number") {
            return sortConfig.direction === "asc" ? valueA - valueB : valueB - valueA;
        }
        return 0;
    });

    const handleConfirmatioModal = (id: string | number, modalType: "remove" | "edit") => {
        setCoupomId(id);
        showConfirmationModal(true, modalType);
    };

    const options = ["ATIVO", "INATIVO"];

    function formatHeader(headerName: string) {
        switch (headerName) {
            case "dataCriacao":
                return "Data de criação";
            case "dataValidade":
                return "Data de validade";
            default:
                return headerName.charAt(0).toUpperCase() + headerName.slice(1)
        }
    }

    return (
        <>
            <div className="w-full flex justify-end gap-4">
                <Select value={statusFiltro} onValueChange={setStatusFiltro}>
                    <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Filtrar por status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="todos">Todos</SelectItem>
                            {options.map((option, idx) => (
                                <SelectItem key={idx} value={option}>{option}</SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
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
                        {["id", "codigo", "valor", "quantidade", "dataCriacao", "dataValidade", "status"].map((key) => (
                            <TableHead key={key} onClick={() => handleSort(key)} className="cursor-pointer select-none">
                                {formatHeader(key)}
                                {sortConfig.key === key && (
                                    <span className="ml-1">{sortConfig.direction === "asc" ? "▲" : "▼"}</span>
                                )}
                            </TableHead>
                        ))}
                        <TableHead>Ações</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {dadosOrdenados.length > 0 ? dadosOrdenados.map((item, idx) => (
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
                                    <Button title="Editar" variant="outline" size="icon" onClick={() => handleConfirmatioModal(item.id, "edit")}>
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button variant="destructive" size="icon" onClick={() => handleConfirmatioModal(item.id, "remove")}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    )) : []}
                </TableBody>
            </Table>
        </>
    );
}