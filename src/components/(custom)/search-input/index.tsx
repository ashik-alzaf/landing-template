"use client";
import { Input } from "@/components/ui/input";
import { LoaderCircle } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { startTransition, useEffect, useState } from "react";

const RealTimeSearchInput = () => {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const initialQuery = searchParams.get("q") || "";
  const [search, setSearch] = useState<string>(initialQuery);
  const pathname = usePathname();
  const router = useRouter();
  useEffect(() => {
    if (search !== initialQuery) {
      setIsLoading(true);
    }
    const daleyDebounce = setTimeout(() => {
      const params = new URLSearchParams();

      if (search?.trim()) {
        const cleanedSearch = search.trim().replace(/\s+/g, "%");
        params.set("q", cleanedSearch);
      } else {
        params.delete("q");
      }

      const queryString = params.toString();
      const url = queryString ? `${pathname}?${queryString}` : pathname;
      startTransition(() => {
        router.push(url);
        setIsLoading(false);
      });
    }, 500);

    return () => clearTimeout(daleyDebounce);
  }, [search, router, pathname]);

  return (
    <div className="w-1/6 mx-auto">
      <div className="relative">
        {isLoading && (
          <LoaderCircle className="animate-spin absolute size-3.5 left-2 top-3 text-teal-500" />
        )}
        <Input
          className="pl-6"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="search"
        />
      </div>
    </div>
  );
};

export default RealTimeSearchInput;
