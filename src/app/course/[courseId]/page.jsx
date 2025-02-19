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
      <div className="flex flex-col md:flex-row gap-4 p-4">
        <div className="w-full md:w-2/3">
          <div className="aspect-w-16 h-[700px] border rounded-xl overflow-hidden">
            <Skeleton className="w-full h-full"/>
          </div>
          <br />
          <Skeleton className="w-full h-[10px] mb-3"/>
          <Skeleton className="w-full h-[50px] mb-3"/>

        </div>
        <div className="w-full md:w-1/3">
          <div className="bg-white rounded-xl border p-5">
          <Skeleton className="w-full h-[50px] mb-3"/>
          <Skeleton className="w-full h-[50px] mb-3"/>
          <Skeleton className="w-full h-[50px] mb-3"/>
          <Skeleton className="w-full h-[50px] mb-3"/>
          <Skeleton className="w-full h-[50px] mb-3"/>
          <Skeleton className="w-full h-[50px] mb-3"/>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4">
      {/* Chap tomonda video va note */}
      <div className="w-full md:w-2/3">
        <div className="aspect-w-16 h-[700px] border rounded-xl overflow-hidden shadow-xl">
          <ReactPlayer
            url={selectedVideo}
            width="100%"
            height="100%"
            controls
            playing
            config={{
              youtube: {
                playerVars: {
                  modestbranding: 1,
                  rel: 0,
                  showinfo: 0,
                  fs: 1,
                  disablekb: 1,
                  iv_load_policy: 3,
                  playsinline: 1,
                },
              },
            }}
          />
        </div>
        {/* Note (mavzu haqida eslatma) */}
        <div className="flex items-center justify-between mb-2 pt-5 px-3">
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
                className="text-blue-500 underline hover:text-blue-700"
              >
                PDF ni ochish
              </a>
            )
          ) : (
            <p className="text-gray-700">Eslatma mavjud emas.</p>
          )}
        </div>
      </div>

      {/* Ong tomonda mavzular ro‘yxati */}
      <div className="w-full md:w-1/3">
        <Card className="bg-white rounded-xl shadow-lg">
          <CardHeader>
            <CardTitle>Mavzular</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1">
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
                  className={`cursor-pointer h-[50px] px-4 rounded-lg transition flex items-center justify-between ${
                    selectedVideo === topic.video ? "bg-gray-100" : "bg-white"
                  }`}
                >
                  <h3 className="font-semibold">{topic.name}</h3>
                  {selectedVideo === topic.video && <Equalizer />}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CoursePage;
