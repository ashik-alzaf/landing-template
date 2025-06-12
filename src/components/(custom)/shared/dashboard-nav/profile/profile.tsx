"use client";
import { useOutsideClick } from "@/hooks/outside-click/outside-click";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";

const Profile = ({ data }: any) => {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<boolean>(false);

  useOutsideClick(ref, () => setOpen(false));
  async function handleLogout() {
    await fetch("/api/auth/singout");
    router.push("/sign-up");
  }
  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="rounded-full cursor-pointer"
      >
        <Image
          src={data?.image || "/default-avatar.png"}
          alt="Profile Image"
          width={30}
          height={30}
          className="rounded-full cursor-pointer"
        />
      </button>
      <div
        className={`fixed top-10 transition-all ease-in duration-300 right-3 bg-white shadow-2xl border py-5 px-3 rounded-md h-28 w-64 ${
          open ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"
        }`}
      >
        <div className="text-sm space-y-4">
          <p className="">{data?.email}</p>
          <button
            onClick={handleLogout}
            className="bg-blue-500 w-full py-2 rounded text-sm text-white"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
