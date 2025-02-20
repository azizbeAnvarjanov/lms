"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ChevronLeft, LogOut } from "lucide-react";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      router.push("/login"); // Agar foydalanuvchi yo‘q bo‘lsa, login sahifasiga yo‘naltiramiz
    }
  }, []);

  // Logout funksiyasi
  const handleLogout = () => {
    localStorage.removeItem("user"); // LocalStorage'dan foydalanuvchini o‘chiramiz
    router.push("/login"); // Login sahifasiga qaytaramiz
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-96 shadow-lg">
        <CardHeader className="text-center">
          <Avatar className="w-24 h-24 mx-auto">
            <AvatarImage src="https://api.dicebear.com/7.x/bottts/svg?seed=User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <CardTitle className="mt-4 text-lg font-semibold">
            Foydalanuvchi Profili
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          {user ? (
            <div>
              <p className="text-gray-700">
                <strong>Login:</strong> {user.login}
              </p>

              <p className="text-gray-700">
                <strong>FIO:</strong> {user.fio || "Foydalanuvchi"}
              </p>
              <div className="flex items-center gap-2">
                <Button
                  className="mt-4 w-[50px]"
                  variant="outline"
                  onClick={() => router.push("/")}
                >
                  <ChevronLeft />
                </Button>
                <Button
                  className="mt-4 w-full"
                  variant="destructive"
                  onClick={handleLogout}
                >
                  Tizimdan chiqish
                  <LogOut />
                </Button>
              </div>
            </div>
          ) : (
            <p>Ma'lumotlar yuklanmoqda...</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
