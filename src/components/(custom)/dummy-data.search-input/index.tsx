"use client";

import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { startTransition, useEffect, useState } from "react";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const currentParams = useSearchParams();

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(currentParams.toString());
      if (search.trim()) {
        params.set("search", search.trim());
      } else {
        params.delete("search");
      }

      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`);
      });
    }, 500);

    return () => clearTimeout(timeout);
  }, [search]);

  return (
    <div className="w-1/6 mx-auto">
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search"
      />
    </div>
  );
};

export default SearchInput;
