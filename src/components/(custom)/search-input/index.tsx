"use client";
import { Input } from "@/components/ui/input";
import { LoaderCircle } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState, useTransition } from "react";
const RealTimeSearchInput = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [search, setSearch] = useState<string>(
    searchParams.get("search") || ""
  );
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (search.trim()) {
        params.set("search", search.trim());
      } else {
        params.delete("search");
      }

      const url = `${pathname}?${params.toString()}`;

      startTransition(() => {
        router.push(url);
      });
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [search, pathname, router]);

  return (
    <div className="w-1/6 mx-auto">
      <div className="relative">
        {isPending && (
          <LoaderCircle className="animate-spin absolute size-3.5 left-2 top-3 text-teal-500" />
        )}
        <Input
          className="pl-6"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
        />
      </div>
    </div>
  );
};

export default RealTimeSearchInput;
