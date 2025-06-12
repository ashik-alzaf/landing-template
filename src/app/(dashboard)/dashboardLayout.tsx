import DashboardNav from "@/components/(custom)/shared/dashboard-nav/dashboard-nav";
import { AppSidebar } from "@/components/(custom)/shared/sidebar/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { fetcher } from "@/lib/actions/fetcher";
import { LoaderCircle } from "lucide-react";
import React from "react";
import useSWR from "swr";
interface UserProfile {
  id: string;
  email: string;
  name: string;
  image: string;
}
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { data, isLoading } = useSWR<UserProfile>("/auth/me", fetcher);

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        {!isLoading ? (
          <div className="flex items-center justify-between gap-2 bg-emerald-50 w-full pr-3.5 py-2">
            <SidebarTrigger />
            <DashboardNav data={data} />
          </div>
        ) : (
          <span className="flex h-screen justify-center items-center">
            <div className="flex items-center gap-2">
              <LoaderCircle className="animate-spin" />
              Loading...?
            </div>
          </span>
        )}
        {children}
      </main>
    </SidebarProvider>
  );
};

export default DashboardLayout;
