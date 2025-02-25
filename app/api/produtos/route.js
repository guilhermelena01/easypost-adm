/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";

let produtos = [
    {
        nomeDoProduto: "Produto teste",
        valor: 200.00,
        prazo: "20 dias",
        statusOrdemDePagamento: "Liberado",
        descricao: ""
    }
];

const corsHeaders = {
    "Access-Control-Allow-Origin": "*", // Permite requisições de qualquer origem
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS", // Métodos permitidos
    "Access-Control-Allow-Headers": "Content-Type" // Cabeçalhos permitidos
};

export async function GET() {
    return NextResponse.json(produtos, {headers: corsHeaders});
}

export async function POST(request) {
    try {
        const novoProduto = await request.json();
        produtos.push(novoProduto);
        return NextResponse.json({ message: "Produto cadastrado com sucesso!", produto: novoProduto }, { status: 201, headers: corsHeaders });
    } catch (error) {
        return NextResponse.json({ message: "Erro ao cadastrar produto." }, { status: 400, headers: corsHeaders });
    }
}

export async function OPTIONS() {
    return NextResponse.json({}, { status: 200, headers: corsHeaders });
}
