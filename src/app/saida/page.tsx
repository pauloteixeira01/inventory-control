"use client"

import { useState } from "react"
import { useProdutos } from "@/context/ProdutosContext"

export default function SaidaPage() {
  const { produtos, retirarProduto } = useProdutos()

  const [produtoId, setProdutoId] = useState<number | null>(null)
  const [quantidade, setQuantidade] = useState(0)
  const [mensagem, setMensagem] = useState("")

  function handleSaida() {
    if (!produtoId || quantidade <= 0) return

    retirarProduto(produtoId, quantidade)

    setMensagem("Saída realizada com sucesso ✅")
    setQuantidade(0)
  }

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
          backgroundColor: "#060606"
        }}
      >
        <select
          onChange={(e) => setProdutoId(Number(e.target.value))}
          defaultValue=""
        >
          <option value="" disabled>
            Selecione um produto
          </option>

          {produtos.map((produto) => (
            <option key={produto.id} value={produto.id}>
              {produto.nome} (Atual: {produto.quantidade})
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Quantidade"
          value={quantidade}
          onChange={(e) =>
            setQuantidade(Math.max(0, Number(e.target.value) || 0))
          }
          style={{ marginLeft: 10 }}
        />

        <button
          onClick={handleSaida}
          style={{ marginLeft: 10 }}
        >
          Retirar
        </button>

        {mensagem && (
          <p style={{ color: "lightgreen", marginTop: 15 }}>
            {mensagem}
          </p>
        )}
      </div>
    </div>
  )
}