"use client";
import { supabase } from "@/lib/supabaseClient";
import { createContext, useContext, useState, useMemo, ReactNode, useEffect } from "react";

export type Produto = {
  id: number;
  nome: string;
  quantidade: number;
  preco: number;
  estoqueMinimo: number;
  unidade: string;
  categoria?: string;
  fornecedor?: string;
};

export type Movimentacao = {
  id: number;
  produtoId: number;
  tipo: "entrada" | "saida";
  quantidade: number;
  data: Date;
};

type ProdutosContextType = {
  produtos: Produto[];
  movimentacoes: Movimentacao[];
  adicionarProduto: (dados: Omit<Produto, "id">) => Promise<void>;
  editarProduto: (id: number, nome: string, quantidade: number) => void;
  deletarProduto: (id: number) => void;
  retirarProduto: (id: number, quantidade: number) => void;
  adicionarQuantidade: (id: number, quantidade: number) => void;
  valorTotalEstoque: string;
};

const ProdutosContext = createContext<ProdutosContextType | undefined>(undefined);

export const ProdutosProvider = ({ children }: { children: ReactNode }) => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [movimentacoes, setMovimentacoes] = useState<Movimentacao[]>([]);

  useEffect(() => {
  async function carregarProdutos() {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("name");

    if (error) {
      console.error("Erro ao carregar produtos:", error);
      return;
    }

    const produtosFormatados = data.map((item) => ({
  id: item.id,
  nome: item.name,
  quantidade: item.quantity,
  preco: item.price ?? 0,
  estoqueMinimo: item.min_stock ?? 0,
  unidade: item.unit ?? "un",
}));

    setProdutos(produtosFormatados);
  }

  carregarProdutos();
}, []);

  const adicionarProduto = async (dados: Omit<Produto, "id">) => {
  const { data, error } = await supabase
    .from("products")
    .insert([
      {
        name: dados.nome,
        quantity: dados.quantidade,
        price: dados.preco,
        min_stock: dados.estoqueMinimo,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("Erro ao adicionar produto:", error);
    return;
  }

 const novoProduto: Produto = {
  id: data.id,
  nome: data.name,
  quantidade: data.quantity,
  preco: data.price,
  estoqueMinimo: data.min_stock,
  unidade: data.unit,
};

  setProdutos((prev) => [...prev, novoProduto]);
};

  const editarProduto = (id: number, nome: string, quantidade: number) => {
    setProdutos((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, nome, quantidade } : p
      )
    );
  };

  const deletarProduto = (id: number) => {
    setProdutos((prev) => prev.filter((p) => p.id !== id));
  };

  const adicionarQuantidade = (id: number, quantidade: number) => {
    if (quantidade <= 0) return;

    setProdutos((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, quantidade: p.quantidade + quantidade }
          : p
      )
    );

    setMovimentacoes((prev) => [
      ...prev,
      {
        id: Date.now(),
        produtoId: id,
        tipo: "entrada",
        quantidade,
        data: new Date(),
      },
    ]);
  };

  const retirarProduto = (id: number, quantidade: number) => {
    if (quantidade <= 0) return;

    setProdutos((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          if (quantidade > p.quantidade) {
            alert("Estoque insuficiente");
            return p;
          }

          return { ...p, quantidade: p.quantidade - quantidade };
        }
        return p;
      })
    );

    setMovimentacoes((prev) => [
      ...prev,
      {
        id: Date.now(),
        produtoId: id,
        tipo: "saida",
        quantidade,
        data: new Date(),
      },
    ]);
  };

  const valorTotalEstoque = useMemo(() => {
    const total = produtos.reduce(
      (acc, p) => acc + p.quantidade * p.preco,
      0
    );

    return total.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }, [produtos]);

  const value = {
    produtos,
    movimentacoes,
    adicionarProduto,
    editarProduto,
    deletarProduto,
    retirarProduto,
    adicionarQuantidade,
    valorTotalEstoque,
  };

  return (
    <ProdutosContext.Provider value={value}>
      {children}
    </ProdutosContext.Provider>
  );
};

export const useProdutos = () => {
  const context = useContext(ProdutosContext);
  if (!context) {
    throw new Error("useProdutos deve ser usado dentro do ProdutosProvider");
  }
  return context;
};