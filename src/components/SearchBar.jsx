"use client";

import {
  ArrowUpRight,
  CircleFadingPlus,
  FileInput,
  FolderPlus,
  Search,
} from "lucide-react";
import * as React from "react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { getCourses } from "@/lib/getCourses";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function SearchBar() {
  const [open, setOpen] = React.useState(false);
  const [courses, setCourses] = React.useState([]);
  React.useEffect(() => {
    const fetchCourses = async () => {
      const fetchedCourses = await getCourses();
      setCourses(fetchedCourses);
    };
    fetchCourses();
  }, []);

  React.useEffect(() => {
    const down = (e) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <button
        className="inline-flex h-9 w-[500px] rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm shadow-black/5 transition-shadow placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/20"
        onClick={() => setOpen(true)}
      >
        <span className="flex grow items-center">
          <Search
            className="-ms-1 me-3 text-muted-foreground/80"
            size={16}
            strokeWidth={2}
            aria-hidden="true"
          />
          <span className="font-normal text-muted-foreground/70">Search</span>
        </span>
        <kbd className="-me-1 ms-12 inline-flex h-5 max-h-full items-center rounded border border-border bg-background px-1 font-[inherit] text-[0.625rem] font-medium text-muted-foreground/70">
          ⌘K
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Kurs nomini kiriting...." />
        <CommandList>
          <CommandEmpty>Kurs topilamdi !</CommandEmpty>

          <CommandGroup>
            {courses?.map((course, idx) => (
              <CommandItem key={idx} className="mb-1">
                <Link
                  href={`/course/${course.id}`}
                  className="w-full flex items-center gap-2 justify-between"
                  target="_blank"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-[50px] h-[35px] rounded-md shadow-lg border relative overflow-hidden">
                      <Image src={course?.banner} alt="" fill />
                    </div>

                    <span>{course?.name}</span>
                  </div>
                  <ArrowUpRight
                    size={16}
                    strokeWidth={2}
                    className="opacity-60"
                    aria-hidden="true"
                  />
                </Link>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
