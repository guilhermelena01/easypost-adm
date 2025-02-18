import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ProductTableProps } from "../../types/types";

export default function ProductTable({ data }: ProductTableProps) {

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nome do produto</TableHead>
                        <TableHead>Valor</TableHead>
                        <TableHead>Prazo estimado para entrega</TableHead>
                        <TableHead>Comissão do colaborador</TableHead>
                        <TableHead>Descrição</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((item, idx) => (
                        <TableRow key={idx}>
                            <TableCell>{item.nomeDoProduto}</TableCell>
                            <TableCell>{item.valor}</TableCell>
                            <TableCell>{item.prazo}</TableCell>
                            <TableCell>{item.statusOrdemDePagamento}</TableCell>
                            <TableCell>{item.descricao}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    )
}