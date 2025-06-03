"use server";
import { fetcher } from "@/lib/action/fetcher";
import React from "react";

const page = async ({ params }: any) => {
  const postId = await params;
  const data: any = await fetcher(`https://dummyjson.com/posts/${postId.id}`);
  return (
    <div>
      <>
        <div className="border border-teal-500 p-5 rounded-md flex flex-col gap-2.5 h-60 w-96 mx-auto mt-10">
          <span>id: {data.id}</span>
          <p>title: {data?.title}</p>
          <p>body: {data?.body?.slice(0, 100)}</p>
          <p>views: {data?.views}</p>
        </div>
      </>
      )
    </div>
  );
};

export default page;
