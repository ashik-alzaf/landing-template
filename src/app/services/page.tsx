"use client";
import React, { useState, useEffect } from "react";
import { List } from "react-virtualized";

const list = Array.from({ length: 1000 }, (_, i) => `Item ${i + 1}`);
export default function MyList() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // avoid rendering on first render to prevent mismatch

  const rowRenderer = ({ index, key, style }: any) => (
    <div key={key} style={style} >
      {list[index]}
    </div>
  );

  return (
    <div>
      <List
        width={1920}
        height={700}
        rowCount={list.length}
        rowHeight={50}
        rowRenderer={rowRenderer}
      />
    </div>
  );
}
