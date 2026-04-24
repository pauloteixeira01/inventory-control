"use client";

import { useProdutos } from "@/context/ProdutosContext";

export default function RelatorioPage() {
  const { produtos, movimentacoes, valorTotalEstoque } = useProdutos();

  const totalEntradas = movimentacoes
    .filter((m) => m.tipo === "entrada")
    .reduce((acc, m) => acc + m.quantidade, 0);

  const totalSaidas = movimentacoes
    .filter((m) => m.tipo === "saida")
    .reduce((acc, m) => acc + m.quantidade, 0);

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">📊 Relatório de Estoque</h1>

        <div className="bg-gray-900 p-6 rounded-lg space-y-3">
          <p>Total de Produtos: {produtos.length}</p>
          <p>Total de Entradas: {totalEntradas}</p>
          <p>Total de Saídas: {totalSaidas}</p>
          <p className="text-green-400 font-semibold">
            Valor Total em Estoque: {valorTotalEstoque}
          </p>
        </div>
      </div>
    </main>
  );
}