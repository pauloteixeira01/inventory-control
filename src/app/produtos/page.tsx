"use client";

import { useState } from "react";

interface Produto {
  id: number;
  nome: string;
  quantidade: string;
}

export default function Produtos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [nome, setNome] = useState("");
  const [quantidade, setQuantidade] = useState("");

  
  function adicionarProdutoTemp() {
    if (!nome || !quantidade) return;

    const novoProduto: Produto = {
      id: produtos.length + 1, 
      nome,
      quantidade,
    };

    setProdutos([...produtos, novoProduto]);

   
    setNome("");
    setQuantidade("");
  }

  return (
    <main style={{ padding: 32 }}>
      <h1>📦 Produtos </h1>

      <form
        onSubmit={(e) => {
          e.preventDefault(); 
          adicionarProdutoTemp();
        }}
      >
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          type="text"
          placeholder="Quantidade"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
        />
        <button type="submit">Adicionar</button>
      </form>

      <ul>
        {produtos.map((produto) => (
          <li key={produto.id}>
            {produto.nome} - {produto.quantidade}
          </li>
        ))}
      </ul>
    </main>
  );
}