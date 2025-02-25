"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { OrderTableProps } from "../../types/types";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Input } from "@/components/ui/input";

export default function OrdersTable({ data, showConfirmationModal, setOrderId, setSelectedStatusPayment }: OrderTableProps) {
    const [statusFiltro, setStatusFiltro] = useState("todos"); // Guarda o status selecionado
    const [searchTerm, setSearchTerm] = useState("");

    function handleConfirmatioModal(id: string | number, value: string) {
        setOrderId(id)
        setSelectedStatusPayment(value)
        showConfirmationModal(true)
    }

    const options = ["LIBERADO", "PAGO", "NEGADO", "ESTORNADO"]

    const dadosFiltrados = data && data.length > 0 ? data
        .filter(item => statusFiltro === "todos" || item.pagamentoStatus === statusFiltro)
        .filter(item =>
            item.id.toString().includes(searchTerm) ||
            item.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.status.toLowerCase().includes(searchTerm.toLowerCase())
        ) : []

    return (
        <>
            <div className="w-full flex justify-end gap-4">
                <Select value={statusFiltro} onValueChange={setStatusFiltro}>
                    <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Filtrar por status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="todos">Todos</SelectItem> {/* Exibir todos os itens */}
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
                        <TableHead>Id</TableHead>
                        <TableHead>Descrição</TableHead>
                        <TableHead>Descrição do pedido</TableHead>
                        <TableHead>Status do pedido</TableHead>
                        <TableHead>Valor</TableHead>
                        <TableHead>Status do pagamento</TableHead>
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
