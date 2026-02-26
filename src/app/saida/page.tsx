"use client"

import { useState } from "react"
import { Produto } from "../produtos/types"
import MovimentacaoEstoque from "../produtos/MovimentacaoEstoque"

export default function SaidaPage() {
  const [produtos, setProdutos] = useState<Produto[]>([
    {
      id: 1,
      nome: "Arroz",
      preco: 25,
      unidade: "kg",
      estoque: 20
    },
    {
      id: 2,
      nome: "Feijão",
      preco: 12,
      unidade: "kg",
      estoque: 15
    }
  ])

  return (
    <div
      style={{
        padding: 40,
        maxWidth: 800,
        margin: "0 auto",
        fontFamily: "Arial, sans-serif"
      }}
    >
      <h1 style={{ marginBottom: 30 }}>📦 Saída de Estoque</h1>

      <div
        style={{
          border: "1px solid #7b7777",
          padding: 25,
          borderRadius: 12,
          backgroundColor: "#060606",
          boxShadow: "0 4px 12px rgba(88, 84, 84, 0.05)"
        }}
      >
        <MovimentacaoEstoque
          produtos={produtos}
          setProdutos={setProdutos}
          tipo="saida"
        />
      </div>
    </div>
  )
}