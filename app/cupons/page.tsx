import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { montserrat } from "@/lib/utils/utils";

export default function Cupons() {
    const data = [{
        nomeDoCliente: "João Guilherme",
        itemDoPedido: "1x celular",
        statusDoPedido: "Aceito",
        statusOrdemDePagamento: "Liberado",
    }]

    return (
        <section className="w-full h-dvh flex flex-col gap-8 py-8 pr-8">
            <h1 className={`text-2xl font-bold ${montserrat.className}`}>Financeiro</h1>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Invoice</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((item, idx) => (
                        <TableRow key={idx}>
                            <TableCell className="font-medium">{item.nomeDoCliente}</TableCell>
                            <TableCell>{item.itemDoPedido}</TableCell>
                            <TableCell>{item.statusDoPedido}</TableCell>
                            <TableCell className="text-right">{item.statusOrdemDePagamento}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={3}>Total</TableCell>
                        <TableCell className="text-right">$2,500.00</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </section>
    )
}