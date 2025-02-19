"use client";
import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

import Avatar from "./avatar";
import SearchBar from "./SearchBar";
import Link from "next/link";

const Navbar = () => {

  return (
    <div className="flex items-center justify-between p-5">
      <Link href="/" className="flex items-center gap-3">
        <div className="w-[50px] h-[50px] relative ">
          <Image fill src="/logo.png" alt="" />
        </div>
        <div className="font-bold">
          <h1>Impuls</h1>
          <h1>Tibbiyot Instituti</h1>
        </div>
      </Link>
      <div>
        <SearchBar />
      </div>
      <div className="flex items-center gap-3">
        <Avatar />
      </div>
    </div>
  );
};

export default Navbar;
