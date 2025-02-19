"use client";
import { useEffect, useState } from "react";
import { getCourses } from "@/lib/getCourses";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "@/components/Navbar";

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchCourses = async () => {
      const fetchedCourses = await getCourses();
      setCourses(fetchedCourses);
      setLoading(false);
    };
    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div>
        <div className="flex items-center justify-between p-5">
          <Skeleton className="h-[50px] w-[150px] rounded-lg" />
          <Skeleton className="h-[30px] w-[600px] rounded-lg" />
          <Skeleton className="h-[30px] w-[30px] rounded-lg" />
        </div>
        <div className="p-4 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-6">
          <div>
            <Skeleton className="h-[200px] rounded-lg" />
            <Skeleton className="h-[10px] w-[250px] rounded-lg" />
            <Skeleton className="h-[10px] w-[150px] rounded-lg" />
            <Skeleton className="h-[10px] w-[50px] rounded-lg" />
          </div>
          <div>
            <Skeleton className="h-[200px] rounded-lg" />
            <Skeleton className="h-[10px] w-[250px] rounded-lg" />
            <Skeleton className="h-[10px] w-[150px] rounded-lg" />
            <Skeleton className="h-[10px] w-[50px] rounded-lg" />
          </div>
          <div>
            <Skeleton className="h-[200px] rounded-lg" />
            <Skeleton className="h-[10px] w-[250px] rounded-lg" />
            <Skeleton className="h-[10px] w-[150px] rounded-lg" />
            <Skeleton className="h-[10px] w-[50px] rounded-lg" />
          </div>
          <div>
            <Skeleton className="h-[200px] rounded-lg" />
            <Skeleton className="h-[10px] w-[250px] rounded-lg" />
            <Skeleton className="h-[10px] w-[150px] rounded-lg" />
            <Skeleton className="h-[10px] w-[50px] rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      <div className="p-4 grid grid-cols-1 md:grid-cols-4 xl:grid-cols-5 gap-6">
        {courses.map((course, idx) => (
          <Link
            href={`course/${course.id}`}
            key={idx}
            className="relative overflow-hidden group border rounded-lg"
          >
            <div className="relative w-full h-[220px] overflow-hidden">
              <Image
                fill
                src={course?.banner}
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                alt=""
              />
            </div>
            <div className="p-3">
              <h1 className="font-bold">{course.name}</h1>
              <h1 className="">{course.description}</h1>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
