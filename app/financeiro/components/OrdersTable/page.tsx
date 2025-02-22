import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { OrderTableProps } from "../../types/types";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function OrdersTable({ data, showConfirmationModal, setOrderId, setSelectedStatusPayment }: OrderTableProps) {

    function handleConfirmatioModal(id: string | number, value: string) {
        setOrderId(id)
        setSelectedStatusPayment(value)
        showConfirmationModal(true)
    }

    const options = ["LIBERADO", "PAGO", "NEGADO", "ESTORNADO"]

    return (
        <>
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
                    {data.map((item, idx) => (
                        <TableRow key={idx}>
                            <TableCell className="w-1/6">{item.id}</TableCell>
                            <TableCell className="w-1/6">{item.descricao}</TableCell>
                            <TableCell className="w-1/6">{item.descricaoProduto}</TableCell>
                            <TableCell className="w-1/6">{item.status}</TableCell>
                            <TableCell className="w-1/6">{item.valor.toLocaleString("pt-br", { style: "currency", currency: "BRL" })}</TableCell>
                            <TableCell className="w-1/6">
                                <Select onValueChange={(value) => handleConfirmatioModal(item.id, value)}>
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
