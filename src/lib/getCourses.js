import { db } from "@/app/firebase";
import { collection, getDocs } from "firebase/firestore";

export const getCourses = async () => {
  const coursesCollection = collection(db, "courses");
  const coursesSnapshot = await getDocs(coursesCollection);
  const courses = coursesSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return courses;
};
