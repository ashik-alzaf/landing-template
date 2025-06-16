"use server";
import Button from "@/components/(custom)/Button";
import { PaginationDemo } from "@/components/(custom)/paginate";
import RealTimeSearchInput from "@/components/(custom)/search-input";
import { fetcher } from "@/lib/actions/fetcher";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = async ({ searchParams }: any) => {
  const search = searchParams.search || "";
  const page = Number(searchParams.page || 1);
  const limit = 10;
  const skip = (page - 1) * limit;

  const data: any = await fetcher(
    `/posts/search?q=${search}&limit=${limit}&skip=${skip}`
  );

  return (
    <div className="mt-5">
      <RealTimeSearchInput />
      {data?.posts?.length > 0 ? (
        <div className="grid grid-cols-5 gap-6 mt-10 mx-5">
          {data?.posts?.map((post: any, postId: number) => (
            <div
              key={postId}
              className="border border-teal-500 p-5 rounded-md flex flex-col gap-2.5 h-60"
            >
              <div className="space-y-2">
                <p className="font-bold">{post?.title}</p>
                <p className="text-sm text-gray-700">
                  {post?.body.slice(0, 100)}...
                </p>
                <p className="text-xs text-gray-500">{post?.views} views</p>
              </div>
              <div className="mt-auto">
                <Link href={`/posts/${post.id}`}>
                  <Button>View</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex h-screen justify-center items-center">
          <Image src={"/images/error.jpg"} alt="" width={300} height={300} />
        </div>
      )}
      
      <div className="my-10">
        <PaginationDemo
          meta={{
            from: 1,
            to: 10,
            total_items: 200,
            per_page: 10,
          }}
        />
      </div>
    </div>
  );
};

export default page;
