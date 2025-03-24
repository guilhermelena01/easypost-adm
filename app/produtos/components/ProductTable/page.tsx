"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { ProductTableProps } from "../../types/types";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ProductTable({ data, showConfirmationModal, setProductId }: ProductTableProps) {

    const [searchTerm, setSearchTerm] = useState("");
    const [statusFiltro, setStatusFiltro] = useState("ATIVO");
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: string } | null>(null);

    function handleConfirmationModal(id: string | number, modalType: "remove" | "edit") {
        setProductId(id);
        showConfirmationModal(true, modalType);
    }

    function renderIcon(icon: string) {
        const formattedIcon = icon
            .split("-")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join("");

        const IconComponent = require("lucide-react")[formattedIcon];

        if (!IconComponent) {
            return "Sem ícone definido";
        }

        return <IconComponent size={20} color="#3b3a3d" />;
    }


    function handleSort(key: string) {
        let direction = "ascending";
        if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
            direction = "descending";
        }
        setSortConfig({ key, direction });
    }

    const sortedData = [...(data || [])].sort((a, b) => {
        if (!sortConfig) return 0;
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue < bValue) return sortConfig.direction === "ascending" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "ascending" ? 1 : -1;
        return 0;
    });

    const filteredData = sortedData
        .filter(item => statusFiltro === "todos" || item.status === statusFiltro)
        .filter(item =>
            item.cor.toString().includes(searchTerm) ||
            item.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.tempoLimite.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );

    const options = ["ATIVO", "INATIVO", "EXCLUIDO"];

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
                        {[
                            { key: "id", label: "Id" },
                            { key: "descricao", label: "Título" },
                            { key: "resolucao", label: "Descrição" },
                            { key: "cor", label: "Ícone" },
                            { key: "tempoLimite", label: "Tempo limite" },
                            { key: "valor", label: "Valor" },
                            { key: "status", label: "Status" }
                        ].map(({ key, label }) => (
                            <TableHead key={key} onClick={() => handleSort(key)} className="cursor-pointer">
                                {label} {sortConfig?.key === key ? (sortConfig.direction === "ascending" ? "▲" : "▼") : ""}
                            </TableHead>
                        ))}
                        <TableHead>Ações</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredData.map((item, idx) => (
                        <TableRow key={idx}>
                            <TableCell>{item.id}</TableCell>
                            <TableCell>{item.descricao}</TableCell>
                            <TableCell>{item.resolucao ?? "Não definida"}</TableCell>
                            <TableCell>{renderIcon(item.cor)}</TableCell>
                            <TableCell>{item.tempoLimite} hora(s)</TableCell>
                            <TableCell>{item.valor.toLocaleString("pt-br", { style: "currency", currency: "BRL" })}</TableCell>
                            <TableCell>{item.status ?? "Sem status definido"}</TableCell>
                            <TableCell className="flex gap-2">
                                <Button title="Editar" variant="outline" size="icon" onClick={() => handleConfirmationModal(item.id, "edit")}>
                                    <Edit className="h-4 w-4" />
                                </Button>
                                <Button title="Excluir" variant="destructive" size="icon" onClick={() => handleConfirmationModal(item.id, "remove")}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
}