import { X } from "lucide-react";
import { toast } from "sonner";
interface ToastType {
  status: "success" | "failed";
  message: any;
}
export const showToast = ({ status, message }: ToastType) => {
  toast.custom((t) => (
    <div
      className={`flex items-center justify-between gap-4 h-12 px-5 py-3.5 rounded shadow text-white min-w-[280px] ${
        status === "success"
          ? "bg-green-500"
          : status === "failed"
          ? "bg-red-500"
          : ""
      }`}
    >
      <h3 className="text-sm">{message}</h3>
      <button onClick={() => toast.dismiss(t)} className="text-white">
        <X size={16} />
      </button>
    </div>
  ));
};
