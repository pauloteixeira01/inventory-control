"use client";

import { useProdutos } from "@/context/ProdutosContext";
import FormProduto from "./FormProduto";
import ListaProdutos from "./ListaProdutos";

export default function Produtos() {
  const {
    produtos,
    adicionarProduto,
    editarProduto,
    deletarProduto,
    valorTotalEstoque,
  } = useProdutos();

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="mx-auto max-w-xl space-y-8">

        <h1 className="text-3xl font-bold">Inventory</h1>

        <p className="text-green-400 font-semibold">
          💰 Valor total: {valorTotalEstoque}
        </p>

        <FormProduto onAdd={adicionarProduto} />

        <ListaProdutos
          produtos={produtos}
          onEdit={(id, dados) =>
            editarProduto(id, dados.nome!, dados.quantidade!)
          }
          onDelete={deletarProduto}
        />
      </div>
    </main>
  );
}