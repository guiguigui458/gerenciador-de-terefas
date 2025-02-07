"use client";

import { useState, useEffect } from "react";
import { DndContext, closestCorners } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
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
      observations: "",  // Evita erro de input não controlado
      deadline: ""       // Evita erro de input não controlado
    });
  };  

  const updateTask = async (id, field, value) => {
    await updateDoc(doc(db, "tasks", id), { [field]: value });
  };

  const deleteTask = async (id) => {
    await deleteDoc(doc(db, "tasks", id));
  };

  const onDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const task = tasks.find((t) => t.id === active.id);
    if (task) {
      updateTask(task.id, "status", over.id); // Atualiza o status ao soltar a tarefa
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4 text-gray-700">Gerenciador de Tarefas</h1>

      <button onClick={addTask} className="bg-blue-500 text-white px-4 py-2 rounded flex items-center mb-4">
        <PlusCircle className="mr-2" /> Adicionar Tarefa
      </button>

      <DndContext collisionDetection={closestCorners} onDragEnd={onDragEnd}>
        <div className="grid grid-cols-3 gap-6 w-full max-w-4xl">
          {["A Fazer", "Em Progresso", "Concluído"].map((status) => (
            <div key={status} id={status} className={`p-4 rounded-lg shadow-md min-h-[300px] ${
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
  );
}
