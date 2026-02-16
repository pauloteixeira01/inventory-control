import { supabase } from "../../lib/supabaseClient";

export default function ListaProdutos({ produtos, onEdit }: any) {
  return (
    <ul>
      {produtos.map((produto: any) => (
        <li key={produto.id} style={{ marginBottom: 8 }}>
          {produto.nome} - {produto.quantidade}{" "}
          <button
            onClick={() => {
              const novoNome = prompt("Novo nome", produto.nome)
              const novaQtd = prompt("Nova quantidade", produto.quantidade)
              if (novoNome && novaQtd) {
                onEdit(produto.id, { nome: novoNome, quantidade: novaQtd })
              }
            }}
          >
            Editar
          </button>
        </li>
      ))}
    </ul>
  )
}