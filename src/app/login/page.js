"use client";

import { useState } from "react";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const auth = getAuth();
    try {
      if (isRegistering) {
        // Criar um novo usuário
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        // Fazer login com e-mail e senha
        await signInWithEmailAndPassword(auth, email, password);
      }
      router.push("/"); // Redireciona para a página principal
    } catch (err) {
      setError("Erro: Verifique suas credenciais e tente novamente.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-blue-600">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          {isRegistering ? "Crie uma conta" : "Faça login"}
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">E-mail:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Senha:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition duration-300 flex justify-center items-center"
            disabled={loading}
          >
            {loading ? "Aguarde..." : isRegistering ? "Cadastrar" : "Entrar"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-gray-700">
            {isRegistering ? "Já tem uma conta?" : "Ainda não tem uma conta?"}{" "}
            <button
              onClick={() => setIsRegistering(!isRegistering)}
              className="text-blue-500 hover:underline font-semibold"
            >
              {isRegistering ? "Faça login" : "Cadastre-se"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
