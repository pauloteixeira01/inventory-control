"use client"

import { useState } from "react"
import type { Produto } from "@/context/ProdutosContext"

type Props = {
  produtos: Produto[]
  setProdutos: React.Dispatch<React.SetStateAction<Produto[]>>
  tipo: "entrada" | "saida"
}

export default function MovimentacaoEstoque({
  produtos,
  setProdutos,
  tipo
}: Props) {
  const [idSelecionado, setIdSelecionado] = useState<number>(0)
  const [quantidade, setQuantidade] = useState<number>(0)

  function movimentar() {
    if (!idSelecionado || quantidade <= 0) return

    setProdutos((prev) =>
      prev.map((produto) => {
        if (produto.id === idSelecionado) {
          if (tipo === "entrada") {
            return {
              ...produto,
              quantidade: produto.quantidade + quantidade
            }
          } else {
            if (produto.quantidade < quantidade) {
              alert("Estoque insuficiente!")
              return produto
            }

            return {
              ...produto,
              quantidade: produto.quantidade - quantidade
            }
          }
        }
        return produto
      })
    )
  }

  return (
    <div>
      <select onChange={(e) => setIdSelecionado(Number(e.target.value))}>
        <option value={0}>Selecione um produto</option>
        {produtos.map((produto) => (
          <option key={produto.id} value={produto.id}>
            {produto.nome} - Estoque: {produto.quantidade}
          </option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Quantidade"
        onChange={(e) => setQuantidade(Number(e.target.value))}
      />

      <button onClick={movimentar}>
        {tipo === "entrada" ? "Adicionar" : "Retirar"}
      </button>
    </div>
  )
}