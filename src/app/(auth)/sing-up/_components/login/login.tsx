"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { handleLogin } from "@/lib/actions/auth";
import { showToast, ShowToast } from "@/components/hook/show-toast";
import { redirect } from "next/dist/server/api-utils";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "username is required",
  }),
  password: z.string().min(2, {
    message: "username is required",
  }),
});

export default function Login() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await handleLogin(values);
      if (response?.accessToken) {
        const token = response?.accessToken;
        document.cookie = `${token}  path=/; secure; HttpOnly; SameSite=Strict; max-age=3600`;
      }

      const status = response.accessToken ? "success" : "failed";
      const message = response.accessToken
        ? "Login successful"
        : response.message || "Login failed";
      showToast({ status, message });
    } catch (error: any) {
      showToast({
        status: "failed",
        message: error?.message || "Something went wrong",
      });
    }
  }

  return (
    <div className="w-[20%] mx-auto h-screen flex flex-col justify-center ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 shadow-2xl border-[0.5px] p-8 rounded-lg"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>username</FormLabel>
                <FormControl>
                  <Input type="username" placeholder="username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
