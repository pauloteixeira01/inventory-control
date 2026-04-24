"use client"

import { useState } from "react"

type Produto = {
  id: number
  nome: string
  quantidade: number
  preco: number
}

type Venda = {
  id: number
  produto: string
  quantidade: number
  total: number
  data: string
}

export default function VendasPage() {
  const [produtos, setProdutos] = useState<Produto[]>([
    { id: 1, nome: "Produto A", quantidade: 10, preco: 50 },
    { id: 2, nome: "Produto B", quantidade: 5, preco: 30 },
    { id: 3, nome: "Produto C", quantidade: 20, preco: 20 },
  ])

  const [produtoSelecionado, setProdutoSelecionado] = useState<number>(1)
  const [quantidade, setQuantidade] = useState<number>(1)
  const [vendas, setVendas] = useState<Venda[]>([])

  const produtoAtual = produtos.find(p => p.id === produtoSelecionado)!

  function realizarVenda() {
    if (quantidade <= 0) return
    if (quantidade > produtoAtual.quantidade) {
      alert("Estoque insuficiente")
      return
    }

    const total = quantidade * produtoAtual.preco

    const novaVenda: Venda = {
      id: Date.now(),
      produto: produtoAtual.nome,
      quantidade,
      total,
      data: new Date().toLocaleString(),
    }

    setProdutos(prev =>
      prev.map(p =>
        p.id === produtoSelecionado
          ? { ...p, quantidade: p.quantidade - quantidade }
          : p
      )
    )

    setVendas(prev => [novaVenda, ...prev])
    setQuantidade(1)
  }

  const faturamentoTotal = vendas.reduce((acc, venda) => acc + venda.total, 0)

  return (
    <div style={{ padding: 40, maxWidth: 800, margin: "0 auto" }}>
      <h1 style={{ marginBottom: 30 }}>💰 Sistema de Vendas</h1>

      {/* Formulário */}
      <div style={{ 
        border: "1px solid #ddd",
        padding: 20,
        borderRadius: 10,
        marginBottom: 30
      }}>
        <h2>Nova Venda</h2>

        <div style={{ marginBottom: 15 }}>
          <label>Produto</label>
          <select
            value={produtoSelecionado}
            onChange={(e) => setProdutoSelecionado(Number(e.target.value))}
            style={{ width: "100%", padding: 8, marginTop: 5 }}
          >
            {produtos.map(produto => (
              <option key={produto.id} value={produto.id}>
                {produto.nome} (Estoque: {produto.quantidade})
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: 15 }}>
          <label>Quantidade</label>
          <input
            type="number"
            value={quantidade}
            min={1}
            onChange={(e) => setQuantidade(Number(e.target.value))}
            style={{ width: "100%", padding: 8, marginTop: 5 }}
          />
        </div>

        <div style={{ marginBottom: 15 }}>
          <strong>Total: R$ {quantidade * produtoAtual.preco}</strong>
        </div>

        <button
          onClick={realizarVenda}
          style={{
            padding: "10px 20px",
            backgroundColor: "#22c55e",
            color: "white",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Finalizar Venda
        </button>
      </div>

      {/* Histórico */}
      <div>
        <h2>📊 Histórico de Vendas</h2>

        {vendas.length === 0 && <p>Nenhuma venda realizada ainda.</p>}

        {vendas.map(venda => (
          <div
            key={venda.id}
            style={{
              border: "1px solid #eee",
              padding: 15,
              borderRadius: 8,
              marginBottom: 10
            }}
          >
            <strong>{venda.produto}</strong><br />
            Quantidade: {venda.quantidade} <br />
            Total: R$ {venda.total} <br />
            Data: {venda.data}
          </div>
        ))}
      </div>

      {/* Resumo */}
      <div style={{ marginTop: 30 }}>
        <h3>🔥 Faturamento Total: R$ {faturamentoTotal}</h3>
      </div>
    </div>
  )
}