"use server";
import { fetcher } from "../fetcher";

export const posts = async () => {
  return await fetcher("https://dummyjson.com/posts");
};
