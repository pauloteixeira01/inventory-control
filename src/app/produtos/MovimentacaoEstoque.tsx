"use client"

import { useState } from "react"
import { Produto } from "./types"

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
    setProdutos((prev) =>
      prev.map((produto) => {
        if (produto.id === idSelecionado) {
          if (tipo === "entrada") {
            return { ...produto, estoque: produto.estoque + quantidade }
          } else {
            if (produto.estoque < quantidade) {
              alert("Estoque insuficiente!")
              return produto
            }
            return { ...produto, estoque: produto.estoque - quantidade }
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
            {produto.nome} - Estoque: {produto.estoque}
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