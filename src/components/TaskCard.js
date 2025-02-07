import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Trash } from "lucide-react";

export default function TaskCard({ task, updateTask, deleteTask }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="bg-white p-4 rounded shadow mb-2 cursor-grab">
      {/* Campo do título da tarefa */}
      <input
        type="text"
        value={task.title || ""}
        onChange={(e) => updateTask(task.id, "title", e.target.value)}
        className="w-full p-1 text-lg font-semibold bg-transparent border-b border-gray-300 focus:outline-none"
      />

      {/* Campo de observação */}
      <textarea
        value={task.observations || ""}
        onChange={(e) => updateTask(task.id, "observations", e.target.value)}
        className="w-full p-1 mt-2 text-sm bg-gray-100 border border-gray-300 rounded focus:outline-none"
        placeholder="Adicione observações..."
      />

      {/* Campo de data */}
      <input
        type="date"
        value={task.deadline || ""}
        onChange={(e) => updateTask(task.id, "deadline", e.target.value)}
        className="w-full p-1 mt-2 text-sm bg-gray-100 border border-gray-300 rounded focus:outline-none"
      />

      {/* Botão de deletar */}
      <button onClick={() => deleteTask(task.id)} className="text-red-500 mt-2 float-right">
        <Trash size={18} />
      </button>
    </div>
  );
}
