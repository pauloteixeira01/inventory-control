"use client";
import { useState } from "react";
import { Produto } from "./types";

interface FormProps {
  onAdd: (dados: Omit<Produto, "id">) => void;
}

export default function FormProduto({ onAdd }: FormProps) {
  const [nome, setNome] = useState("");
  const [quantidade, setQuantidade] = useState<number>(0);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!nome || !quantidade) return;

    onAdd({ nome, quantidade });
    setNome("");
    setQuantidade(0);
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
        value={quantidade}
        onChange={(e) => setQuantidade(Number(e.target.value))}
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