import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CircleUserRound } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Avatar({ user }) {
  const router = useRouter();
  // Logout funksiyasi
  const handleLogout = () => {
    localStorage.removeItem("user"); // LocalStorage'dan foydalanuvchini o‘chiramiz
    router.push("/login"); // Login sahifasiga qaytaramiz
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="outline" aria-label="Open account menu">
          <CircleUserRound size={16} strokeWidth={2} aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-72">
        <DropdownMenuLabel className="flex flex-col">
          <span>Hush kelibsiz</span>
          <span className="text-xs font-normal text-foreground">
            {user?.fio || "FIO"}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => router.push("/profile")}>
            Mening kabinetim
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="bg-red-500 text-white"
          onClick={handleLogout}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
