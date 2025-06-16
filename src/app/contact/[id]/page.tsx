"use client";
import React from "react";
import useSWR from "swr";
import { useParams } from "next/navigation";
import { fetcher } from "@/lib/actions/fetcher";

type Product = {
  id: number;
  title: string;
  price: number;
  description?: string;
};

export default function ProductDetailPage() {
  const params = useParams();
  const id = params?.id;

  const { data, isLoading } = useSWR<Product>(`/products/${id}`, fetcher);

  if (isLoading) return <p>Loading product details...</p>;

  if (!data) return <p>No product found.</p>;

  return (
    <div className="m-10 p-6 border rounded-md max-w-xl">
      <h1 className="text-2xl font-bold mb-3">{data.title}</h1>
      <p className="mb-2">Price: ${data.price}</p>
      <p className="mb-2">Description: ${data.description}</p>
    </div>
  );
}
