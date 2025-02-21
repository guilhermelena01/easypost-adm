import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CouponsTableProps } from "../types/types";
import { formatDate } from "@/lib/utils/utils";

export default function CouponTable({ data }: CouponsTableProps) {

    return (
        <>
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
                    {data.map((item, idx) => (
                        <TableRow key={idx}>
                            <TableCell>{item.id}</TableCell>
                            <TableCell>{item.codigo}</TableCell>
                            <TableCell>{item.valor.toLocaleString("pt-br", {style: "currency", currency: "BRL"})}</TableCell>
                            <TableCell>{item.quantidade}</TableCell>
                            <TableCell>{formatDate(item.dataCriacao)}</TableCell>
                            <TableCell>{formatDate(item.dataValidade)}</TableCell>
                            <TableCell>{item.status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    )
}