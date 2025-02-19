"use client";

import React, { useState, useEffect } from "react";
import { collection, addDoc, doc, updateDoc, onSnapshot } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import db from "../firebase";
import { DialogTitle } from "@radix-ui/react-dialog";

export default function Admin() {
  const [courses, setCourses] = useState([]);
  const [courseName, setCourseName] = useState("");
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "courses"), (snapshot) => {
      setCourses(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const createCourse = async () => {
    if (!courseName) return;
    const docRef = await addDoc(collection(db, "courses"), { name: courseName, banner: "" });
    router.push(`/course-details/${docRef.id}`);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Panel - Kurslar</h1>
      
      <Dialog>
        <DialogTrigger asChild>
          <Button>+ Yangi Kurs</Button>
        </DialogTrigger>
        <DialogContent>
            <DialogTitle></DialogTitle>
          <h2 className="text-xl font-semibold">Yangi Kurs Qo‘shish</h2>
          <Input placeholder="Kurs nomi..." value={courseName} onChange={(e) => setCourseName(e.target.value)} />
          <Button onClick={createCourse}>Create</Button>
        </DialogContent>
      </Dialog>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {courses.map((course) => (
          <div key={course.id} className="p-4 shadow-lg rounded-md border cursor-pointer" onClick={() => router.push(`/course-details/${course.id}`)}>
            <p className="text-lg font-semibold">{course.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
