"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { collection, getDocs } from "firebase/firestore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/app/firebase";
import ReactPlayer from "react-player";
import ShareButton from "@/components/ShareButton";
import Equalizer from "@/components/Equalizer";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlignJustify,
  ArrowUpRight,
  ChevronLeft,
  CirclePause,
  CirclePlay,
  FileAxis3d,
} from "lucide-react";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const CoursePage = () => {
  const params = useParams();
  const courseId = params.courseId;
  const [topics, setTopics] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState("");
  const [selectedNote, setSelectedNote] = useState("");
  const [selectedCourseName, setSelectedCourseName] = useState("");
  const [selectedCourseDescription, setSelectedCourseDescription] = useState(
    ""
  );

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        if (courseId) {
          const topicsCollection = collection(
            db,
            "courses",
            courseId,
            "topics"
          );
          const querySnapshot = await getDocs(topicsCollection);
          const topicsData = [];
          querySnapshot.forEach((doc) => {
            topicsData.push(doc.data());
          });
          setTopics(topicsData);

          if (topicsData.length > 0) {
            setSelectedVideo(topicsData[0].video);
            setSelectedNote(topicsData[0].note);
            setSelectedCourseName(topicsData[0].name);
            setSelectedCourseDescription(topicsData[0].description);
          }
        }
      } catch (error) {
        console.log("Error fetching topics:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopics();
  }, [courseId]);

  const handleVideoSelect = (video, note, name, desc) => {
    console.log("note", note);
    setSelectedVideo(video);
    setSelectedNote(note);
    setSelectedCourseName(name);
    setSelectedCourseDescription(desc);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-[23%]">
          <div className="bg-white">
            <div className="h-[70px] flex p-4 items-center justify-between">
              <Skeleton className="rounded-xl border w-[40px] h-[40px]" />
              <Skeleton className="w-[100px] h-[8px]" />
            </div>
            <Skeleton className="w-full h-[50px]" />
            <Skeleton className="w-full h-[50px]" />
            <Skeleton className="w-full h-[50px]" />
            <Skeleton className="w-full h-[50px]" />
            <Skeleton className="w-full h-[50px]" />
            <Skeleton className="w-full h-[50px]" />
          </div>
        </div>
        <div className="w-full md:w-[78%]">
          <div className="aspect-w-16 h-[700px] border overflow-hidden">
            <Skeleton className="w-full h-full" />
          </div>
          <br />
          <Skeleton className="w-full h-[10px]" />
          <Skeleton className="w-full h-[50px]" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row max-h-[100vh] overflow-hidden">
      {/* Ong tomonda mavzular ro‘yxati */}
      <div className="w-full md:w-[23%] overflow-y-scroll scrollth border-r">
        <div className="bg-white">
          <div className="flex items-center justify-between p-4 text-black">
            <Link
              href="/"
              className="rounded-xl border w-[40px] h-[40px] flex items-center justify-center hover:bg-muted"
            >
              <ChevronLeft />
            </Link>
            <h1 className="font-bold">Mavzular</h1>
            <div className="block md:hidden">
              <Sheet>
                <SheetTrigger>
                  <AlignJustify />
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle></SheetTitle>
                  </SheetHeader>
                  <ul className="">
                    {topics.map((topic, index) => (
                      <li
                        key={index}
                        onClick={() =>
                          handleVideoSelect(
                            topic.video,
                            topic.note,
                            topic.name,
                            topic.description
                          )
                        }
                        className={`cursor-pointer hover:bg-muted font-[400] border-t h-[60px] px-4 flex items-center justify-between ${
                          selectedVideo === topic.video
                            ? "bg-green-200 text-green-500"
                            : "bg-white text-[#718599]"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {selectedVideo !== topic.video ? (
                            <CirclePlay size={20} strokeWidth={1.75} />
                          ) : (
                            <CirclePause size={20} strokeWidth={1.75} />
                          )}
                          <h3>{topic.name}</h3>
                        </div>
                      </li>
                    ))}
                  </ul>
                </SheetContent>
              </Sheet>
            </div>
          </div>
          <ul className="hidden md:block">
            {topics.map((topic, index) => (
              <li
                key={index}
                onClick={() =>
                  handleVideoSelect(
                    topic.video,
                    topic.note,
                    topic.name,
                    topic.description
                  )
                }
                className={`cursor-pointer hover:bg-muted font-[400] border-t h-[60px] px-4 flex items-center justify-between ${
                  selectedVideo === topic.video
                    ? "bg-green-200 text-green-500"
                    : "bg-white text-[#718599]"
                }`}
              >
                <div className="flex items-center gap-2">
                  {selectedVideo !== topic.video ? (
                    <CirclePlay size={20} strokeWidth={1.75} />
                  ) : (
                    <CirclePause size={20} strokeWidth={1.75} />
                  )}
                  <h3>{topic.name}</h3>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Chap tomonda video va note */}
      <div className="w-full md:w-[78%] overflow-y-scroll scrollth text-black">
        <div className="aspect-w-16 h-[30vh] md:h-screen overflow-hidden ">
          <ReactPlayer
            url={selectedVideo}
            width="100%"
            height="100%"
            controls
            playing
          />
        </div>
        <div className="p-4">
          {/* Note (mavzu haqida eslatma) */}
          <div className="flex items-center justify-between mb-2 px-3">
            <h1 className="text-xl font-bold">{selectedCourseName}</h1>
            <ShareButton link={`http://localhost:3000/course/${courseId}`} />
          </div>
          <div className="mt-4 p-4 border rounded-lg bg-gray-50">
            <h3 className="font-semibold text-lg">Mavzu haqida</h3>
            <p>{selectedCourseDescription}</p>
            {selectedNote ? (
              selectedNote.includes("drive.google.com") ? (
                <a
                  href={selectedNote}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline hover:text-blue-700"
                >
                  PDF ni ochish
                </a>
              ) : (
                <a
                  href={selectedNote}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:bg-muted underline hover:text-blue-700 p-4 border rounded-md flex md:w-[500px] my-4 items-center justify-between"
                >
                  <span className="flex items-center gap-3">
                    <FileAxis3d />
                    Mavzu note fayli
                  </span>
                  <ArrowUpRight />
                </a>
              )
            ) : (
              <p className="text-gray-700">Eslatma mavjud emas.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
