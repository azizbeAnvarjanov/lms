"use client";
import { useEffect, useState } from "react";
import { getCourses } from "@/lib/getCourses";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

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
    <div className="p-4 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-6">
       <Skeleton className="h-[200px] rounded-lg" />
       <Skeleton className="h-[200px] rounded-lg" />
       <Skeleton className="h-[200px] rounded-lg" />
       <Skeleton className="h-[200px] rounded-lg" />
       <Skeleton className="h-[200px] rounded-lg" />
       <Skeleton className="h-[200px] rounded-lg" />

    </div>
      )
  }



  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {courses.map((course, idx) => (
        <Link
          href={`course/${course.id}`}
          key={idx}
          className="relative h-[200px] rounded-lg shadow-xl overflow-hidden group"
        >
          <div className="relative w-full h-full">
            <Image
              fill
              src={course?.banner}
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              alt=""
            />
          </div>
          <div className="course px-4 absolute bottom-0 h-[150px] bg-gradient-to-b from-white/0 to-white w-full flex items-end pb-4">
            <h1 className="text-xl font-bold">{course.name}</h1>
          </div>
        </Link>
      ))}
    </div>
  );
}
