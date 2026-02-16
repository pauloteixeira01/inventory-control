import Link from "next/link"

export default function HomePage() {
  return (
    <main style={{ padding: 32 }}>
      <h1>📦 Sistema de Estoque</h1>
      <p>Escolha uma opção:</p>

      <ul style={{ marginTop: 20 }}>
        <li>
          <Link href="/produtos">➡️ Produtos</Link>
        </li>

        <li>
          <Link href="/entrada">➡️ Entrada de Estoque</Link>
        </li>

        <li>
          <Link href="/saida">➡️ Saída de Estoque</Link>
        </li>

        <li>
          <Link href="/vendas">➡️ Vendas</Link>
        </li>
      </ul>
    </main>
  )
}