import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ProductTableProps } from "../../types/types";

export default function ProductTable({ data }: ProductTableProps) {
    const bgColor = data && data.length > 0 ? data.find((item) => item.cor) : ""
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
                            <TableCell><div className={`h-3 w-3 rounded-full ${!item.cor && "hidden"}`} style={{background: `${item.cor}`}}></div>{!item.cor && "Cor não definida"}</TableCell>
                            <TableCell>{item.tempoLimite}</TableCell>
                            <TableCell>{item.valor.toLocaleString("pt-br", { style: "currency", currency: "BRL" })}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    )
}