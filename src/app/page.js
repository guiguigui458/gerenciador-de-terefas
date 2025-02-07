"use client";
import { useState, useEffect } from "react";
import { DndContext, closestCorners } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { collection, addDoc, deleteDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import TaskCard from "@/components/TaskCard";
import { Clock, Loader, CheckCircle, PlusCircle } from "lucide-react";

export default function TaskManager() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "tasks"), (snapshot) => {
      setTasks(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const addTask = async () => {
    await addDoc(collection(db, "tasks"), {
      title: "Nova Tarefa",
      status: "A Fazer",
      observations: "",
      deadline: "", 
    });
  };

  const updateTask = async (id, field, value) => {
    await updateDoc(doc(db, "tasks", id), { [field]: value });
  };

  const deleteTask = async (id) => {
    await deleteDoc(doc(db, "tasks", id));
  };

  return (
    <div className="container">
   
    <div className="p-10 bg-gray-200 min-h-screen flex flex-col items-center">
      {/* Título principal */}
      <h1 className="text-4xl font-bold mb-6 text-gray-700">📌 Gerenciador de Tarefas</h1>

      {/* Botão de adicionar nova tarefa */}
      <button onClick={addTask} className="bg-blue-500 text-white px-6 py-2 rounded-lg flex items-center mb-6 shadow-lg hover:bg-blue-600 transition">
        <PlusCircle className="mr-2" /> Adicionar Nova Tarefa
      </button>

      {/* Área das colunas de tarefas */}
      <DndContext collisionDetection={closestCorners}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
          {["A Fazer", "Em Progresso", "Concluído"].map((status) => (
            <div key={status} className={`p-5 rounded-lg shadow-lg min-h-[400px] ${
              status === "A Fazer" ? "bg-blue-100" :
              status === "Em Progresso" ? "bg-yellow-100" :
              "bg-green-100"
            }`}>
              {/* Título da coluna */}
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                {status === "A Fazer" && <Clock className="inline-block mr-2 text-blue-600" />}
                {status === "Em Progresso" && <Loader className="inline-block mr-2 text-yellow-600 animate-spin" />}
                {status === "Concluído" && <CheckCircle className="inline-block mr-2 text-green-600" />}
                {status}
              </h2>

              {/* Área das tarefas */}
              <SortableContext items={tasks.filter((task) => task.status === status).map((task) => task.id)} strategy={verticalListSortingStrategy}>
                {tasks.filter((task) => task.status === status).map((task) => (
                  <TaskCard key={task.id} task={task} updateTask={updateTask} deleteTask={deleteTask} />
                ))}
              </SortableContext>
            </div>
          ))}
        </div>
      </DndContext>
    </div>
    </div>
  );
}
