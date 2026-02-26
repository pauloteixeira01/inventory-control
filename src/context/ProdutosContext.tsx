"use client";

import { createContext, useContext, useState, useMemo, ReactNode } from "react";

// Define o tipo do produto
export type Produto = {
  id: number;
  nome: string;
  quantidade: number;
  preco?: number;
};

// Define o que o contexto vai fornecer
type ProdutosContextType = {
  produtos: Produto[];
  atualizarProduto: (id: number, quantidade: number) => void;
  adicionarProduto: (produto: Produto) => void;
};

// Cria o contexto
const ProdutosContext = createContext<ProdutosContextType | undefined>(undefined);

// Provider
export const ProdutosProvider = ({ children }: { children: ReactNode }) => {
  const [produtos, setProdutos] = useState<Produto[]>([
    { id: 1, nome: "Produto A", quantidade: 10, preco: 15 },
    { id: 2, nome: "Produto B", quantidade: 5, preco: 20 },
  ]);

  // Atualiza a quantidade, nunca deixando negativo
  const atualizarProduto = (id: number, quantidade: number) => {
    setProdutos((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, quantidade: Math.max(0, p.quantidade + quantidade) }
          : p
      )
    );
  };

  // Adiciona produto novo
  const adicionarProduto = (produto: Produto) => {
    setProdutos((prev) => [...prev, produto]);
  };

  // Memoiza o valor do contexto pra evitar rerenders desnecessários
  const value = useMemo(
    () => ({ produtos, atualizarProduto, adicionarProduto }),
    [produtos]
  );

  return (
    <ProdutosContext.Provider value={value}>
      {children}
    </ProdutosContext.Provider>
  );
};

// Hook customizado pra acessar o contexto
export const useProdutos = () => {
  const context = useContext(ProdutosContext);
  if (!context)
    throw new Error("useProdutos só pode ser usado dentro do ProdutosProvider");
  return context;
};