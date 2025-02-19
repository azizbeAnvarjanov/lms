"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  addDoc,
  getDocs,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import Image from "next/image";
import { db, storage } from "@/app/firebase";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft, CircleCheck, Trash } from "lucide-react";

const CourseDetails = () => {
  const searchParams = useParams();
  const courseId = searchParams.id;
  const [course, setCourse] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [banner, setBanner] = useState(null);
  const [topics, setTopics] = useState([]);
  const [newTopic, setNewTopic] = useState({
    name: "",
    description: "",
    video: "",
    note: null,
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(false);
  const [statusText, setStatusText] = useState("");

  useEffect(() => {
    if (!courseId) return;
    const fetchCourse = async () => {
      const docRef = doc(db, "courses", courseId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setCourse(docSnap.data());
        setName(docSnap.data().name);
        setDescription(docSnap.data().description);
        setBanner(docSnap.data().banner);
      }
    };

    const fetchTopics = async () => {
      const topicsRef = collection(db, "courses", courseId, "topics");
      const querySnapshot = await getDocs(topicsRef);
      const topicsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTopics(topicsList);
    };

    fetchCourse();
    fetchTopics();
  }, [courseId]);

  const handleNameChange = async (e) => {
    const newName = e.target.value;
    setName(newName);
    await updateDoc(doc(db, "courses", courseId), { name: newName });
    toast.success("Kurs nomi o'zgartirildi !");
  };
  const handleDescriptionChange = async (e) => {
    const newsDescription = e.target.value;
    setDescription(newsDescription);
    await updateDoc(doc(db, "courses", courseId), {
      description: newsDescription,
    });
    toast.success("Kurs tafsifi o'zgartirildi !");
  };

  const handleBannerUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);
    setStatus(true);
    setStatusText("Kurs rasmi yuklanmoqda");
    const storageRef = ref(storage, `banners/${courseId}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    setBanner(url);
    await updateDoc(doc(db, "courses", courseId), { banner: url });
    setStatus(false);
    setStatusText("Yuklandi 100%");
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    toast.success("Bnner muvafaqiyatli yuklandi !");
  };

  const handleDeleteBanner = async () => {
    if (!banner) return;
    setLoading(true);
    setStatus(true);
    setStatusText("Kurs rasmi o'chirilmoqda");
    const storageRef = ref(storage, `banners/${courseId}`);
    await deleteObject(storageRef);
    setBanner(null);
    await updateDoc(doc(db, "courses", courseId), { banner: null });
    setStatus(false);
    setStatusText("O'chirish yakunlandi !");

    setTimeout(() => {
      setLoading(false);
    }, 2000);
    toast.success("Banner o'chirildi !");
  };

  const handleTopicNoteUpload = async (e, topicId) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);
    setStatus(true);
    setStatusText("Mavzu yuklanmoqda");

    const storageRef = ref(storage, `topics/${courseId}/${topicId}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    await updateDoc(doc(db, "courses", courseId, "topics", topicId), {
      note: url,
    });
    setTopics((prevTopics) =>
      prevTopics.map((t) => (t.id === topicId ? { ...t, note: url } : t))
    );
    setStatus(false);
    setStatusText("Yuklandi !");

    setTimeout(() => {
      setLoading(false);
    }, 2000);
    toast.success("Mavzu muvafaqiyatli qo'sjildi !");
  };

  const handleAddTopic = async () => {
    if (!newTopic.name || !newTopic.description || !newTopic.video) return;
    const docRef = await addDoc(
      collection(db, "courses", courseId, "topics"),
      newTopic
    );
    setTopics([...topics, { id: docRef.id, ...newTopic }]);
    setNewTopic({ name: "", description: "", video: "", note: null });
  };

  if (!course) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-2 w-[70%] mx-auto pt-10 gap-5 ">
      <div>
        <div className="flex items-center gap-3 mb-3">
          <Link
            href="/admin"
            className="rounded-xl border w-[40px] h-[40px] flex items-center justify-center hover:bg-muted"
          >
            <ChevronLeft />
          </Link>
          <h1 className="text-3xl font-bold">Kurs ma'lumotlari</h1>
        </div>

        <div className="max-w-3xl mx-auto">
          <div
            className={`transition-all duration-700 absolute bg-black text-white rounded-full left-[50%] -translate-x-[50%] flex items-center justify-between w-[300px] gap-3 py-2 px-4 ${
              loading ? "duration-400 top-4" : "duration-900 -top-full"
            }`}
          >
            {statusText}
            {status ? (
              <div className="spinner center ">
                <div className="spinner-blade"></div>
                <div className="spinner-blade"></div>
                <div className="spinner-blade"></div>
                <div className="spinner-blade"></div>
                <div className="spinner-blade"></div>
                <div className="spinner-blade"></div>
                <div className="spinner-blade"></div>
                <div className="spinner-blade"></div>
                <div className="spinner-blade"></div>
                <div className="spinner-blade"></div>
                <div className="spinner-blade"></div>
                <div className="spinner-blade"></div>
              </div>
            ) : (
              <>
                <CircleCheck color="#00e038" />
              </>
            )}
          </div>
          <label>Kurs nomi</label>
          <Input
            type="text"
            value={name}
            onChange={handleNameChange}
            className="w-full p-2 border rounded mb-4"
          />

          <Textarea
            value={description}
            onChange={handleDescriptionChange}
          ></Textarea>

          <h2 className="text-2xl font-semibold mt-6">Mavzular</h2>
          <ul>
            {topics.map((topic) => (
              <li
                key={topic.id}
                className="px-2 py-2 border mb-2 rounded-lg flex items-center justify-between"
              >
                <h3 className="font-bold pl-2">{topic.name}</h3>
                <a href={topic.video} target="_blank" className="text-blue-500">
                  Mavzu videosi
                </a>
                <div className="">
                  {topic.note === null ? (
                    <>
                      <Input
                        type="file"
                        accept="application/pdf"
                        onChange={(e) => handleTopicNoteUpload(e, topic.id)}
                      />
                    </>
                  ) : (
                    <a
                      href={topic?.note}
                      target="_blank"
                      className="text-green-500"
                    >
                      View Note
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex items-start flex-col justify-end">
        <div className="w-full my-5">
          <h2 className="text-2xl font-semibold mt-6">Mavzu qo'shish</h2>
          <Input
            type="text"
            placeholder="Mavzu nomi"
            value={newTopic.name}
            onChange={(e) => setNewTopic({ ...newTopic, name: e.target.value })}
            className="w-full p-2 border rounded mb-2"
          />
          <Textarea
            placeholder="Mavzu tafsifi"
            value={newTopic.description}
            onChange={(e) =>
              setNewTopic({ ...newTopic, description: e.target.value })
            }
            className="w-full p-2 border rounded mb-2"
          ></Textarea>
          <Input
            type="text"
            placeholder="Mavzu video linki"
            value={newTopic.video}
            onChange={(e) =>
              setNewTopic({ ...newTopic, video: e.target.value })
            }
            className="w-full p-2 border rounded mb-2"
          />
          <Button onClick={handleAddTopic}>Qo'shish</Button>
        </div>
        <h1 className="font-bold text-xl mb-3">Kurs banneri</h1>
        {banner ? (
          <div className="relative w-[500px] h-[300px]">
            <Image src={banner} fill alt="Banner" className="rounded-lg" />
            <Button
              className="absolute bottom-1 right-1"
              onClick={handleDeleteBanner}
              variant="destructive"
            >
              <Trash />
            </Button>
          </div>
        ) : (
          <p>
            Kurs rasmi yuklanmagan{" "}
            <Input type="file" onChange={handleBannerUpload} className="mt-2" />
          </p>
        )}
      </div>
    </div>
  );
};

export default CourseDetails;
