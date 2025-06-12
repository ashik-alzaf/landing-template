"use client";
import { useEffect } from "react";

export const useOutsideClick = (
  ref: React.RefObject<HTMLDivElement | null>,
  setButton: () => void
) => {
  useEffect(() => {
    const handleEvent = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event?.target as Node)) {
        setButton();
      }
    };
    document.addEventListener("mousedown", handleEvent);
    return () => document.removeEventListener("mousedown", handleEvent);
  }, [ref, setButton]);
};
