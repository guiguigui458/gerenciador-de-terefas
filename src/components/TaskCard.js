import { useState } from "react";
import { Trash } from "lucide-react";

export default function TaskCard({ task, updateTask, deleteTask }) {
  // Estados para armazenar o título, observações e status da tarefa
  const [title, setTitle] = useState(task.title);
  const [observations, setObservations] = useState(task.observations || "");
  const [status, setStatus] = useState(task.status);

  // Atualiza a tarefa ao sair do campo ou ao mudar o status
  const handleUpdate = () => {
    updateTask(task.id, status, title, observations);
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-md mb-2">
      {/* Campo de edição do título */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onBlur={handleUpdate}
        className="w-full font-bold text-lg p-2 border rounded-md focus:ring"
      />

      {/* Seletor de status */}
      <select
        value={status}
        onChange={(e) => {
          setStatus(e.target.value);
          updateTask(task.id, e.target.value, title, observations);
        }}
        className="w-full mt-2 p-2 border rounded-md focus:ring"
      >
        <option value="A Fazer">📝 A Fazer</option>
        <option value="Em Progresso">⏳ Em Progresso</option>
        <option value="Concluído">✅ Concluído</option>
      </select>

      {/* Campo de observação */}
      <textarea
        value={observations}
        onChange={(e) => setObservations(e.target.value)}
        onBlur={handleUpdate}
        placeholder="Adicione observações..."
        className="w-full mt-2 p-2 border rounded-md focus:ring"
      ></textarea>

      {/* Botão para excluir */}
      <button
        onClick={() => deleteTask(task.id)}
        className="mt-2 text-red-500 hover:text-red-700 flex items-center"
      >
        <Trash className="w-5 h-5 mr-1" />
        Excluir
      </button>
    </div>
  );
}
