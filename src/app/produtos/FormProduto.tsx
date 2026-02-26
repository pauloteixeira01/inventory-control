"use client";
import { useState } from "react";
import { Produto } from "./types";

interface FormProps {
  onAdd: (dados: Omit<Produto, "id">) => void;
}

export default function FormProduto({ onAdd }: FormProps) {
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState<number>(0);
  const [unidade, setUnidade] = useState<number>(0);
  const [estoque, setEstoque] = useState<number>(0);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!nome) return;

    onAdd({ nome, preco, unidade, estoque });
    setNome("");
    setPreco(0);
    setUnidade(0);
    setEstoque(0);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        placeholder="Nome do produto"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        className="bg-black border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:border-white"
      />
      <input
        type="number"
        placeholder="Quantidade"
        value={estoque}
        onChange={(e) => setEstoque(Math.max(0, Number(e.target.value) || 0))}
        className="bg-black border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:border-white"
      />
      <button
        type="submit"
        className="bg-white text-black rounded-md py-2 font-medium hover:opacity-80 transition"
      >
        Adicionar
      </button>
    </form>
  );
}