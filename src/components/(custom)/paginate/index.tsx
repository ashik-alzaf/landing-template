// "use client";
// import React, { startTransition } from "react";
// import { useRouter, usePathname, useSearchParams } from "next/navigation";
// import {
//   Pagination,
//   PaginationContent,
//   PaginationEllipsis,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination";

// interface Meta {
//   from: number;
//   to: number;
//   total_items: number;
// }

// interface PaginationDemoProps {
//   totalPages: number;
//   meta?: Meta;
// }

// export function PaginationDemo({ totalPages, meta }: PaginationDemoProps) {
//   const router = useRouter();
//   const pathname = usePathname();
//   const searchParams = useSearchParams();

//   const currentPage = Number(searchParams.get("page") || "1");
//   const search = searchParams.get("search") || "";

//   const handlePageChange = (page: number) => {
//     const params = new URLSearchParams(searchParams.toString());
//     params.set("page", page.toString());
//     if (search) {
//       params.set("search", search);
//     }

//     startTransition(() => {
//       router.replace(`${pathname}?${params.toString()}`);
//     });
//   };

//   return (
//     <div className="flex flex-col items-center gap-2">
//       {meta && (
//         <p className="text-xs text-[var(--muted-60)] leading-[18px]">
//           Showing {meta.from}-{meta.to} from {meta.total_items}
//         </p>
//       )}

//       <Pagination>
//         <PaginationContent>
//           {/* Previous */}
//           <PaginationItem>
//             <PaginationPrevious
//               href="#"
//               onClick={(e) => {
//                 e.preventDefault();
//                 if (currentPage > 1) handlePageChange(currentPage - 1);
//               }}
//             />
//           </PaginationItem>

//           {/* Page Numbers */}
//           {[...Array(totalPages)].map((_, i) => {
//             const page = i + 1;
//             const isActive = page === currentPage;

//             return (
//               <PaginationItem key={page}>
//                 <PaginationLink
//                   className={`${
//                     isActive && "bg-red-500 text-white"
//                   } hover:bg-red-500 hover:text-white`}
//                   isActive={isActive}
//                   href="#"
//                   onClick={(e) => {
//                     e.preventDefault();
//                     handlePageChange(page);
//                   }}
//                 >
//                   {page}
//                 </PaginationLink>
//               </PaginationItem>
//             );
//           })}

//           {totalPages > 5 && <PaginationEllipsis />}

//           {/* Next */}
//           <PaginationItem>
//             <PaginationNext
//               href="#"
//               onClick={(e) => {
//                 e.preventDefault();
//                 if (currentPage < totalPages) handlePageChange(currentPage + 1);
//               }}
//             />
//           </PaginationItem>
//         </PaginationContent>
//       </Pagination>
//     </div>
//   );
// }
"use client";
import React, { useMemo, startTransition } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Meta {
  from: number;
  to: number;
  total_items: number;
  per_page: number;
}

interface PaginationDemoProps {
  meta: Meta;
}

export function PaginationDemo({ meta }: PaginationDemoProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page") || 1);
  const totalPages = Math.ceil(meta.total_items / meta.per_page);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    
    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`);
    });
  };

  const pageNumbers = useMemo(() => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 3) {
      console.log(currentPage,"currentPage",totalPages)
      return [1, 2, 3, 4, "...", totalPages];
    }

    if (currentPage >= totalPages - 2) {
      return [1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }

    return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
  }, [totalPages, currentPage]);

  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-xs text-muted-foreground leading-[18px]">
        Showing {meta.from}-{meta.to} from {meta.total_items}
      </p>

      <Pagination>
        <PaginationContent>
          {/* Previous Button */}
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(currentPage - 1);
              }}
              className={
                currentPage <= 1 ? "pointer-events-none opacity-50" : ""
              }
              aria-disabled={currentPage <= 1}
            />
          </PaginationItem>

          {/* Page Numbers */}
          {pageNumbers?.map((page, index) => {
            if (page === "...") {
              return (
                <PaginationItem key={`ellipsis-${index}`}>
                  <PaginationEllipsis className="pointer-events-none" />
                </PaginationItem>
              );
            }

            const pageNum = page as number;
            const isActive = pageNum === currentPage;

            return (
              <PaginationItem key={pageNum}>
                <PaginationLink
                  className={`transition-colors ${
                    isActive 
                      ? "bg-red-500 !text-white hover:bg-red-600" 
                      : "hover:bg-red-500 hover:text-white"
                  }`}
                  isActive={isActive}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(pageNum);
                  }}
                  aria-current={isActive ? "page" : undefined}
                >
                  {pageNum}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          {/* Next Button */}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(currentPage + 1);
              }}
              className={
                currentPage >= totalPages 
                  ? "pointer-events-none opacity-50 bg-[#d1d1d1d1]" 
                  : ""
              }
              aria-disabled={currentPage >= totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}