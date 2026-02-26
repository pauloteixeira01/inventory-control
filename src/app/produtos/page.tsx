"use client";

import { useState } from "react";
import FormProduto from "./FormProduto";
import ListaProdutos from "./ListaProdutos";
import { Produto } from "./types";
import MovimentacaoEstoque from "./MovimentacaoEstoque";
export default function Produtos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);

  function adicionarProduto(dados: Omit<Produto, "id">) {
    const novoProduto: Produto = {
      id: Date.now(),
      ...dados,
    };

    setProdutos((prev) => [...prev, novoProduto]);
  }

  function editarProduto(
    id: number,
    dados: Partial<Omit<Produto, "id">>
  ) {
    setProdutos((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, ...dados } : p
      )
    );
  }

  function deletarProduto(id: number) {
    setProdutos((prev) =>
      prev.filter((p) => p.id !== id)
    );
  }
function saidaEstoque(id: number, quantidade: number) {
  setProdutos((prev) =>
    prev.map((p) => {
      if (p.id === id) {
        if (p.estoque < quantidade) {
          alert("Estoque insuficiente!");
          return p;
        }

        return {
          ...p,
          estoque: p.estoque - quantidade,
        };
      }
      return p;
    })

  );
  }
  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="mx-auto max-w-xl space-y-8">

        <h1 className="text-3xl font-bold tracking-tight">
          Inventory
        </h1>

        <div className="border border-gray-800 rounded-lg p-6">
          <FormProduto onAdd={adicionarProduto} />
        </div>

        <div className="border border-gray-800 rounded-lg p-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-400">
            Produtos
          </h2>

          <ListaProdutos
            produtos={produtos}
            onEdit={editarProduto}
            onDelete={deletarProduto}
          />

        </div>

      </div>
    </main>
  );
}