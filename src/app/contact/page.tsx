"use client";
import useSWR from "swr";
import { fetcher } from "@/lib/actions/fetcher";
import Button from "@/components/(custom)/Button";
import { useRouter } from "next/navigation";

type Product = {
  id: number;
  title: string;
  price: number;
};

type ProductResponse = {
  products: Product[];
};

export default function Page() {
    const router = useRouter()
  const { data, error, isLoading } = useSWR<ProductResponse>("/products", fetcher);
  console.log(data);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Failed to load data</p>;

  return (
    <div className="grid grid-cols-4 gap-5 m-10">
      {data?.products?.map((item: any) => (
        <div key={item.id} className="border rounded-lg p-6 space-y-3">
          <span>{item.title}</span>
          <p>${item.price}</p>
          <Button onClick={()=>router.push(`/contact/${item.id}`)}>See More</Button>
        </div>
      ))}
    </div>
  );
}
