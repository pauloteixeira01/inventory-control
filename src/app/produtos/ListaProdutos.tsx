import { useState } from "react";
import { Produto } from "./types";

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
  const [editEstoque, setEditEstoque] = useState(0);

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
            className={`flex justify-between items-center border rounded-md px-4 py-3 transition-all ${
              isEditing
                ? "bg-gray-800 border-green-500"
                : "border-gray-800 hover:border-gray-600"
            }`}
          >
            <div className="flex flex-col w-full max-w-[60%]">
              {isEditing ? (
                <>
                  <input
                    value={editNome}
                    onChange={(e) => setEditNome(e.target.value)}
                    className="bg-gray-900 border border-green-500 rounded-md px-3 py-1 text-white mb-1"
                  />
                  <input
                    type="number"
                    value={editEstoque}
                    onChange={(e) =>
                      setEditEstoque(
                        Math.max(0, Number(e.target.value) || 0)
                      )
                    }
                    className="bg-gray-900 border border-green-500 rounded-md px-3 py-1 text-white"
                  />
                </>
              ) : (
                <>
                  <p className="font-medium text-white">{produto.nome}</p>
                  <p className="text-sm text-gray-400">
                    Estoque: {produto.estoque}
                  </p>
                </>
              )}
            </div>

            <div className="flex gap-3">
              {isEditing ? (
                <>
                  <button
                    onClick={() => {
                      if (editNome) {
                        onEdit(produto.id, {
                          nome: editNome,
                          estoque: editEstoque,
                        });
                        setEditId(null);
                      }
                    }}
                    className="text-sm text-green-400 hover:text-green-600"
                  >
                    Salvar
                  </button>

                  <button
                    onClick={() => setEditId(null)}
                    className="text-sm text-gray-400 hover:text-white"
                  >
                    Cancelar
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      const confirmar = confirm("Tem certeza?");
                      if (confirmar) onDelete(produto.id);
                    }}
                    className="text-sm text-red-400 hover:text-red-600"
                  >
                    Deletar
                  </button>

                  <button
                    onClick={() => {
                      setEditId(produto.id);
                      setEditNome(produto.nome);
                      setEditEstoque(produto.estoque);
                    }}
                    className="text-sm text-gray-400 hover:text-white"
                  >
                    Editar
                  </button>
                </>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}