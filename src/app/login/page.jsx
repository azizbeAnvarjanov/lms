"use client"; // Next.js client component

import { useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function LoginPage() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // 🔹 **Foydalanuvchini Firestore'dan qidirish funksiyasi**
  const handleLogin = async () => {
    try {
      const usersCollection = collection(db, "users"); // "users" kolleksiyasini olamiz
      const querySnapshot = await getDocs(usersCollection); // Barcha hujjatlarni olamiz

      let userFound = null;

      // 🔍 **Barcha 15 ta hujjatni tekshiramiz**
      querySnapshot.forEach((doc) => {
        const usersArray = doc.data().users; // Har bir hujjat ichidagi `users` array
        const foundUser = usersArray.find(
          (user) => user.login === login && user.parol === password
        );

        if (foundUser) {
          userFound = foundUser; // Agar foydalanuvchi topilsa, saqlaymiz
        }
      });

      if (userFound) {
        // ✅ Foydalanuvchi topildi -> localStorage'ga saqlaymiz va sahifani o‘zgartiramiz
        localStorage.setItem("user", JSON.stringify(userFound));
        router.push("/"); // Dashboard sahifasiga yo‘naltiramiz
      } else {
        // ❌ Login yoki parol noto‘g‘ri
        setError("Login yoki parol noto‘g‘ri!");
      }
    } catch (err) {
      console.error("Xatolik:", err);
      setError("Tizimda xatolik yuz berdi.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Tizimga Kirish</h2>

        {error && <p className="text-red-500">{error}</p>}

        <input
          type="text"
          placeholder="Login"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />

        <input
          type="password"
          placeholder="Parol"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Kirish
        </button>
      </div>
    </div>
  );
}
