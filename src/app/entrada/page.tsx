"use client";

import { useState } from "react";
import { useProdutos } from "@/context/ProdutosContext";

export default function EntradaPage() {
  const { produtos, atualizarProduto } = useProdutos();

  const [produtoId, setProdutoId] = useState<number | null>(null);
  const [quantidade, setQuantidade] = useState(0);
  const [mensagem, setMensagem] = useState("");

  function handleEntrada() {
    if (!produtoId || quantidade <= 0) return;

    atualizarProduto(produtoId, quantidade);

    setMensagem("Entrada realizada com sucesso ✅");
    setQuantidade(0);
  }

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="max-w-xl mx-auto space-y-6">

        <h1 className="text-3xl font-bold">
          Entrada de Estoque
        </h1>

        <div className="border border-gray-800 rounded-lg p-6 space-y-4">

          <select
            className="w-full bg-black border border-gray-700 rounded-md px-3 py-2"
            onChange={(e) => setProdutoId(Number(e.target.value))}
            defaultValue=""
          >
            <option value="" disabled>
              Selecione um produto
            </option>

            {produtos.map((produto) => (
              <option key={produto.id} value={produto.id}>
                {produto.nome} (Atual: {produto.quantidade})
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Quantidade a adicionar"
            value={quantidade}
            onChange={(e) =>
              setQuantidade(Math.max(0, Number(e.target.value) || 0))
            }
            className="w-full bg-black border border-gray-700 rounded-md px-3 py-2"
          />

          <button
            onClick={handleEntrada}
            className="w-full bg-green-500 text-black font-semibold py-2 rounded-md hover:bg-green-600 transition"
          >
            Confirmar Entrada
          </button>

          {mensagem && (
            <p className="text-green-400 text-sm">{mensagem}</p>
          )}

        </div>

      </div>
    </main>
  );
}