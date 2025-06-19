"use client";
import { LoaderCircle } from "lucide-react";
import React, { useRef, useState } from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const VirtualizedList = ({ height = 760, itemHeight = 120 }: any) => {
  const [items, setItems] = useState([0, Math.floor(height / itemHeight)]);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (e: any) => {
    const scrollTop = e.target.scrollTop;
    const newStartIndex = Math.floor(scrollTop / itemHeight);

    const newEndIndex = newStartIndex + Math.floor(height / itemHeight);
    setItems([newStartIndex, newEndIndex]);
  };

  const { data, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/comments`,
    fetcher
  );

  const visibleList = data?.slice(items[0], items[1] + 1);

  if (isLoading)
    return (
      <div className="flex justify-center h-screen items-center">
        <LoaderCircle className="animate-spin" /> Loading...
      </div>
    );

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      style={{ height, overflowY: "auto", position: "relative" }}
      className="space-y-3"
    >
      <div
        className="grid grid-cols-6 m-10 "
        style={{
          height: data?.length * itemHeight,
          position: "relative",
        }}
      >
        {visibleList?.map((item: any, index: number) => (
          <div
            key={item.id}
            style={{
              position: "absolute",
              top: (items[0] + index) * itemHeight,
              height: itemHeight,
              left: 0,
              right: 0,
              width: "100%",
            }}
            className="border border-red-500 rounded-md p-5 space-y-3"
          >
            <p>{item?.name}</p>
            <p>{item?.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VirtualizedList;
