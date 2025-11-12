import { Loader2 } from "lucide-react";

export default function LoadingOverlay({ loading = false, message = "" }) {
  if (!loading) return null;

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white/30 backdrop-blur-[1px] z-[100]">
      <Loader2 className="animate-spin text-blue-600 w-10 h-10 mb-3" />
      {message && (
        <p className="text-gray-700 text-sm font-medium animate-pulse">
          {message}
        </p>
      )}
    </div>
  );
}
