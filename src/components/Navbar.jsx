"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

import Avatar from "./avatar";
import SearchBar from "./SearchBar";
import Link from "next/link";

const Navbar = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // JSON formatidan obyektga o'tkazamiz
    }
    if (!storedUser) {
      router.push("/login"); // Agar user yo'q bo'lsa, login sahifasiga yo'naltiramiz
    }
  }, []);
  return (
    <div className="flex items-center justify-between p-5">
      <Link href="/" className="flex items-center gap-3">
        <div className="w-[30px] h-[30px] md:w-[50px] md:h-[50px] relative ">
          <Image fill src="/logo.png" alt="" />
        </div>
        <div className="font-bold hidden">
          <h1>Impuls</h1>
          <h1>Tibbiyot Instituti</h1>
        </div>
      </Link>
      <div>
        <SearchBar />
      </div>
      <div className="flex items-center gap-3">
        <Avatar user={user} />
      </div>
    </div>
  );
};

export default Navbar;
