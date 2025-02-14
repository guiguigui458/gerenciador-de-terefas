import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { app } from "./firebase"; // Importa a configuração do Firebase

const auth = getAuth(app);

export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw new Error("Erro ao fazer login: " + error.message);
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw new Error("Erro ao sair: " + error.message);
  }
};
