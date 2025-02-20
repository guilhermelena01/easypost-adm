import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ProductTableProps } from "../../types/types";

export default function ProductTable({ data }: ProductTableProps) {

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Id</TableHead>
                        <TableHead>Descrição</TableHead>
                        <TableHead>Resolução</TableHead>
                        <TableHead>Cor</TableHead>
                        <TableHead>Tempo limite</TableHead>
                        <TableHead>Valor</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((item, idx) => (
                        <TableRow key={idx}>
                            <TableCell>{item.id}</TableCell>
                            <TableCell>{item.descricao}</TableCell>
                            <TableCell>{item.resolucao ?? "Não definida"}</TableCell>
                            <TableCell>{item.cor}</TableCell>
                            <TableCell>{item.tempoLimite}</TableCell>
                            <TableCell>{item.valor}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    )
}