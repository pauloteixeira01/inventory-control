"use client";
import { useState } from "react";
import { Produto } from "@/context/ProdutosContext";

interface FormProps {
  onAdd: (dados: Omit<Produto, "id">) => Promise<void>;
}

export default function FormProduto({ onAdd }: FormProps) {
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState<string>("");
  const [quantidade, setQuantidade] = useState<string>("");
  const [estoqueMinimo, setEstoqueMinimo] = useState<string>("");
  const [unidade, setUnidade] = useState("un");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!nome.trim()) return;

    await onAdd({
      nome,
      preco: Number(preco) || 0,
      quantidade: Number(quantidade) || 0,
      estoqueMinimo: Number(estoqueMinimo) || 5,
      unidade,
    });

    setNome("");
    setPreco("");
    setQuantidade("");
    setEstoqueMinimo("");
    setUnidade("un");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        placeholder="Nome do produto"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        className="bg-black border border-gray-700 rounded-md px-3 py-2 text-white"
      />

      <input
        type="number"
        step="0.01"
        min="0"
        placeholder="Preço"
        value={preco}
        onChange={(e) => setPreco(e.target.value)}
        className="bg-black border border-gray-700 rounded-md px-3 py-2 text-white"
      />

      <input
        type="number"
        min="0"
        placeholder="Quantidade inicial"
        value={quantidade}
        onChange={(e) => setQuantidade(e.target.value)}
        className="bg-black border border-gray-700 rounded-md px-3 py-2 text-white"
      />

      <input
        type="number"
        min="0"
        placeholder="Estoque mínimo"
        value={estoqueMinimo}
        onChange={(e) => setEstoqueMinimo(e.target.value)}
        className="bg-black border border-gray-700 rounded-md px-3 py-2 text-white"
      />

      <select
        value={unidade}
        onChange={(e) => setUnidade(e.target.value)}
        className="bg-black border border-gray-700 rounded-md px-3 py-2 text-white"
      >
        <option value="un">Unidade</option>
        <option value="kg">Kg</option>
        <option value="l">Litro</option>
      </select>

      <button
        type="submit"
        className="bg-white text-black rounded-md py-2 font-medium hover:opacity-80 transition"
      >
        Adicionar
      </button>
    </form>
  );
}