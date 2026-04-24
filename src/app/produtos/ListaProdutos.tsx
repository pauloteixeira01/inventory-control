import { useState } from "react";
import { Produto } from "@/context/ProdutosContext";

interface ListaProps {
  produtos: Produto[];
  onEdit: (id: number, dados: Partial<Omit<Produto, "id">>) => void;
  onDelete: (id: number) => void;
}

export default function ListaProdutos({
  produtos,
  onEdit,
  onDelete,
}: ListaProps) {
  const [editId, setEditId] = useState<number | null>(null);
  const [editNome, setEditNome] = useState("");
  const [editQuantidade, setEditQuantidade] = useState(0);

  if (produtos.length === 0) {
    return <p className="text-gray-500">Nenhum produto cadastrado ainda.</p>;
  }

  return (
    <ul className="space-y-3">
      {produtos.map((produto) => {
        const isEditing = editId === produto.id;

        return (
          <li
            key={produto.id}
            className="border border-gray-800 rounded-md px-4 py-3"
          >
            {isEditing ? (
              <>
                <input
                  value={editNome}
                  onChange={(e) => setEditNome(e.target.value)}
                  className="w-full mb-2 bg-black border border-gray-700 px-2 py-1 text-white"
                />

                <input
                  type="number"
                  value={editQuantidade}
                  onChange={(e) =>
                    setEditQuantidade(Number(e.target.value))
                  }
                  className="w-full mb-2 bg-black border border-gray-700 px-2 py-1 text-white"
                />

                <button
                  onClick={() => {
                    onEdit(produto.id, {
                      nome: editNome,
                      quantidade: editQuantidade,
                    });
                    setEditId(null);
                  }}
                >
                  Salvar
                </button>
              </>
            ) : (
              <>
                <h3 className="font-semibold text-white">
                  {produto.nome}
                </h3>

                <p className="text-sm text-gray-400">
                  Estoque: {produto.quantidade} {produto.unidade}
                </p>

                <p className="text-sm text-gray-400">
                  Preço: R$ {produto.preco.toFixed(2)}
                </p>

                <p className="text-sm text-gray-400">
                  Mínimo: {produto.estoqueMinimo}
                </p>

                <div className="mt-2 flex gap-3">
                  <button
                    onClick={() => {
                      setEditId(produto.id);
                      setEditNome(produto.nome);
                      setEditQuantidade(produto.quantidade);
                    }}
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => onDelete(produto.id)}
                  >
                    Deletar
                  </button>
                </div>
              </>
            )}
          </li>
        );
      })}
    </ul>
  );
}
