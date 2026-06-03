"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function BackButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        router.back();
      }}
      className="group bg-muted hover:bg-secondary relative cursor-pointer rounded-lg px-3 py-1.5">
      <div className="flex items-center gap-2">
        <ArrowLeft className="size-4 transition-all group-hover:-translate-x-1" />{" "}
        Go Back
      </div>
    </button>
  );
}
