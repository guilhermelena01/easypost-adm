"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { OrderTableProps } from "../../types/types";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { ChevronUp, ChevronDown } from "lucide-react";

export default function OrdersTable({ data, showConfirmationModal, setOrderId, setSelectedStatusPayment }: OrderTableProps) {
    const [statusFiltro, setStatusFiltro] = useState("todos");
    const [searchTerm, setSearchTerm] = useState("");
    const [sortColumn, setSortColumn] = useState(null);
    const [sortOrder, setSortOrder] = useState("asc");

    function handleConfirmatioModal(id: string | number, value: string) {
        setOrderId(id);
        setSelectedStatusPayment(value);
        showConfirmationModal(true);
    }

    function handleSort(column) {
        if (sortColumn === column) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortColumn(column);
            setSortOrder("asc");
        }
    }

    const options = ["LIBERADO", "PAGO", "NEGADO", "ESTORNADO"];

    let dadosFiltrados = data && data.length > 0 ? data
        .filter(item => statusFiltro === "todos" || item.pagamentoStatus === statusFiltro)
        .filter(item =>
            item.id.toString().includes(searchTerm) ||
            item.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.status.toLowerCase().includes(searchTerm.toLowerCase())
        ) : [];

    if (sortColumn) {
        dadosFiltrados = [...dadosFiltrados].sort((a, b) => {
            const valueA = a[sortColumn];
            const valueB = b[sortColumn];
            if (typeof valueA === "string") {
                return sortOrder === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
            }
            return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
        });
    }

    function formatHeader(headerName: string) {
        switch (headerName) {
            case "descricaoProduto":
                return "Descrição do produto";
            case "pagamentoStatus":
                return "Status do pagamento";
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
                        {["id", "descricao", "descricaoProduto", "status", "valor", "pagamentoStatus"].map((column) => (
                            <TableHead key={column} onClick={() => handleSort(column)} className="cursor-pointer">
                                {formatHeader(column)}
                                {sortColumn === column ? (sortOrder === "asc" ? "▲" : "▼") : null}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {dadosFiltrados.map((item, idx) => (
                        <TableRow key={idx}>
                            <TableCell className="w-1/6">{item.id}</TableCell>
                            <TableCell className="w-1/6">{item.descricao}</TableCell>
                            <TableCell className="w-1/6">{item.descricaoProduto}</TableCell>
                            <TableCell className="w-1/6">{item.status}</TableCell>
                            <TableCell className="w-1/6">{item.valor.toLocaleString("pt-br", { style: "currency", currency: "BRL" })}</TableCell>
                            <TableCell className="w-1/6">
                                <Select value={item.pagamentoStatus ?? ""} onValueChange={(value) => handleConfirmatioModal(item.id, value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione o status do pagamento" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {options.map((option, idx) => (
                                                <SelectItem key={idx} value={option}>{option}</SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
}