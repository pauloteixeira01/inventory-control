
import { Produto } from "./types";
interface ListaProps {
  produtos: Produto[];
  onEdit: (id: number, dados: Omit<Produto, "id">) => void;
  onDelete: (id: number) => void;
}

export default function ListaProdutos({
  produtos,
  onEdit,
  onDelete,
}: ListaProps) {
  if (produtos.length === 0) {
    return (
      <p className="text-gray-500">
        Nenhum produto cadastrado ainda.
      </p>
    );
  }

  return (
    <ul className="space-y-3">
      {produtos.map((produto) => (
        <li
          key={produto.id}
          className="flex justify-between items-center border border-gray-800 rounded-md px-4 py-3"
        >
          <div>
            <p className="font-medium">{produto.nome}</p>
            <p className="text-sm text-gray-500">
              Quantidade: {produto.quantidade}
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => {
                const confirmar = confirm("Tem certeza?");
                if (confirmar) {
                  onDelete(produto.id);
                }
              }}
              className="text-sm text-red-400 hover:text-red-600 transition"
            >
              Deletar
            </button>

            <button
              onClick={() => {
                const novoNome = prompt("Novo nome", produto.nome);
                const novaQtd = prompt("Nova quantidade", String(produto.quantidade));

                if (novoNome && novaQtd) {
                   onEdit(produto.id, {
                   nome: novoNome,
                    quantidade: Number(novaQtd),
                  });
                  }
              }
            }
              className="text-sm text-gray-400 hover:text-white transition"
            >
              Editar
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}