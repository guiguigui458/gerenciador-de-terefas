"use client"; 

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Importação correta para roteamento
import { collection, addDoc, deleteDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import TaskCard from "@/components/TaskCard";
import { Clock, Loader, CheckCircle, PlusCircle } from "lucide-react";

export default function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const router = useRouter(); // Deve estar DENTRO da função, não fora!

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "tasks"), (snapshot) => {
      setTasks(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe(); // Remove o listener ao desmontar o componente
  }, []);

  return (
    <div>
      <h1>Gerenciador de Tarefas</h1>
    </div>
  );
}

  // Carrega as tarefas do Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "tasks"), (snapshot) => {
      setTasks(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  // Atualiza status da tarefa (Baseado na seleção de status)
  const updateTaskStatus = async (id, status) => {
    if (userRole !== "viewer") {
      await updateDoc(doc(db, "tasks", id), { status });
    } else {
      alert("Você não tem permissão para editar tarefas.");
    }
  };

  // Adiciona uma nova tarefa
  const addTask = async () => {
    await addDoc(collection(db, "tasks"), {
      title: "Nova Tarefa",
      status: "A Fazer",
      observations: "",
    });
  };

  // Atualiza título e observação da tarefa
  const updateTask = async (id, field, value) => {
    await updateDoc(doc(db, "tasks", id), { [field]: value });
  };

  // Excluir tarefa
  const deleteTask = async (id) => {
    await deleteDoc(doc(db, "tasks", id));
  };

  // Gera um relatório de tarefas concluídas
  const generateReport = () => {
    const completedTasks = tasks.filter((task) => task.status === "Concluído");
    let reportText = "Relatório de Tarefas Concluídas:\n\n";
    
    completedTasks.forEach(task => {
      reportText += `Título: ${task.title}\nObservação: ${task.observations}\n\n`;
    });

    const blob = new Blob([reportText], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "relatorio_tarefas.txt";
    link.click();
  };

  // Se o usuário não estiver carregado, exibe "Carregando..."
  if (!user) return <p className="text-center">Carregando...</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <button
        onClick={generateReport}
        className="bg-green-500 text-white px-4 py-2 rounded flex items-center mb-4"
      >
        📄 Gerar Relatório
      </button>

      <h1 className="text-2xl font-bold mb-4 text-gray-700">Gerenciador de Tarefas</h1>
      <button onClick={addTask} className="bg-blue-500 text-white px-4 py-2 rounded flex items-center mb-4">
        <PlusCircle className="mr-2" /> Adicionar Tarefa
      </button>

      <div className="grid grid-cols-3 gap-6">
        {["A Fazer", "Em Progresso", "Concluído"].map((status) => (
          <div key={status} className={`p-4 rounded-lg shadow-md min-h-[300px] ${
            status === "A Fazer" ? "bg-blue-100" :
            status === "Em Progresso" ? "bg-yellow-100" :
            "bg-green-100"
          }`}>
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              {status === "A Fazer" && <Clock className="inline-block mr-2" />}
              {status === "Em Progresso" && <Loader className="inline-block mr-2 animate-spin" />}
              {status === "Concluído" && <CheckCircle className="inline-block mr-2 text-green-500" />}
              {status}
            </h2>

            {tasks.filter((task) => task.status === status).map((task) => (
              <div key={task.id} className="bg-white p-4 rounded-lg shadow-md mb-2">
                <input
                  type="text"
                  className="border-b w-full mb-2"
                  value={task.title}
                  onChange={(e) => updateTask(task.id, "title", e.target.value)}
                  placeholder="Título da Tarefa"
                />
                <textarea
                  className="border w-full mb-2 p-2"
                  value={task.observations}
                  onChange={(e) => updateTask(task.id, "observations", e.target.value)}
                  placeholder="Observações..."
                />
                
                {/* Seleção de status */}
                <select
                  className="w-full p-2 border rounded"
                  value={task.status}
                  onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                >
                  <option value="A Fazer">A Fazer</option>
                  <option value="Em Progresso">Em Progresso</option>
                  <option value="Concluído">Concluído</option>
                </select>

                <button
                  onClick={() => deleteTask(task.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded mt-2 w-full"
                >
                  🗑️ Excluir
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
