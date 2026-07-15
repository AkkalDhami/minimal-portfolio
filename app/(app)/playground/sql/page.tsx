import type { Metadata } from "next";
import { SqlPlaygroundClient } from "./sql-playground-client";

export const metadata: Metadata = {
  title: "SQL Playground",
  description: "An in-browser SQL editor running real SQLite via WebAssembly."
};

export default function page() {
  return (
    <div className="flex h-full min-h-screen w-full items-center justify-center">
      <SqlPlaygroundClient />
    </div>
  );
}
