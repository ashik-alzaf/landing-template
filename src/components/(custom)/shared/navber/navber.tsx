"use client";
import { Button } from "@/components/ui/button";
import { ArrowDownIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
interface MenuType {
  title: string;
  path: string;
}
const Navber = () => {
  const pathname = usePathname();
  const router = useRouter();
  const isRegistration = pathname.includes("sing-up");
  const data: MenuType[] = [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "About",
      path: "/about",
    },
    {
      title: "Serviecs",
      path: "/services",
    },
    {
      title: "Contact",
      path: "/contact",
    },
    {
      title: "Posts",
      path: "/posts",
    },
  ];
  const [isSticky, setIsSticky] = useState<number>(0);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const onScroll = () => {
    if (scrollRef.current) {
      const y = scrollRef.current.scrollTop;
      setIsSticky(y);
    }
  };
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div>
      {!isRegistration && (
        <div
          ref={scrollRef}
          onScroll={onScroll}
          className={`w-full bg-white transition-all z-50 duration-300 ${
            isSticky >= 100 ? "fixed top-0   shadow" : ""
          }`}
        >
          <div className="flex items-center justify-between py-3 px-5">
            <Link href={"/"} className="text-3xl font-bold text-teal-600">
              Amazon
            </Link>
            <ul className="flex gap-7">
              {data?.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.path}
                    className={`nav ${
                      pathname === item.path && "text-teal-500 active"
                    }`}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
            <Button onClick={() => router.push("/sing-up")}>Sing Up</Button>
          </div>
        </div>
      )}
      {/* {isSticky && (
        <button
          onClick={scrollUp}
          className="text-3xl fixed bottom-6 text-white p-1.5 bg-teal-500 rounded-full right-5 duration-300 z-40"
        >
          <ArrowDownIcon className="size-4" />
        </button>
      )} */}
    </div>
  );
};

export default Navber;
