import { useState } from "react";
import { Trash, FileText, Calendar } from "lucide-react";

export default function TaskCard({ task, updateTask, deleteTask }) {
  const [title, setTitle] = useState(task.title);
  const [observations, setObservations] = useState(task.observations || "");
  const [deadline, setDeadline] = useState(task.deadline || "");

  const handleBlur = () => {
    updateTask(task.id, "title", title);
  };

  const handleObservationsBlur = () => {
    updateTask(task.id, "observations", observations);
  };

  const handleDeadlineChange = (e) => {
    setDeadline(e.target.value);
    updateTask(task.id, "deadline", e.target.value);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      {/* Título da Tarefa */}
      <input
        className="text-lg font-semibold w-full border-b focus:outline-none"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onBlur={handleBlur}
      />

      {/* Observações */}
      <div className="mt-2 flex items-start">
        <FileText className="mr-2 text-gray-500" />
        <textarea
          className="w-full border rounded p-2 text-sm focus:outline-none"
          placeholder="Adicione observações..."
          value={observations}
          onChange={(e) => setObservations(e.target.value)}
          onBlur={handleObservationsBlur}
        />
      </div>

      {/* Data de Prazo */}
      <div className="mt-2 flex items-center">
        <Calendar className="mr-2 text-gray-500" />
        <input
          type="date"
          className="border rounded px-2 py-1 text-sm focus:outline-none"
          value={deadline}
          onChange={handleDeadlineChange}
        />
      </div>

      {/* Botão de Excluir */}
      <button onClick={() => deleteTask(task.id)} className="mt-3 bg-red-500 text-white px-3 py-1 rounded shadow hover:bg-red-600 transition flex items-center">
        <Trash className="mr-2" /> Excluir
      </button>
    </div>
  );
}
