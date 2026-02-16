"use client"

import { useState } from "react"
import { supabase } from "../../lib/supabaseClient";

export default function FormProduto({ onAdd }: any) {
  const [nome, setNome] = useState("")
  const [quantidade, setQuantidade] = useState("")

  function handleSubmit(e: any) {
    e.preventDefault()
    if (!nome || !quantidade) return

    onAdd({ nome, quantidade })
    setNome("")
    setQuantidade("")
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 16 }}>
      <input
        placeholder="Nome do produto"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        style={{ marginRight: 8 }}
      />
      <input
        placeholder="Quantidade"
        value={quantidade}
        onChange={(e) => setQuantidade(e.target.value)}
        style={{ marginRight: 8 }}
      />
      <button type="submit">Adicionar</button>
    </form>
  )
}