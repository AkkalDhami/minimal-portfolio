import { DocsSidebar } from "@/components/layouts/docs-sidebar";

export default function DocsLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="border-edge screen-line-after relative mx-auto w-full max-w-4xl border-x pt-10 font-sans sm:px-4">
      <DocsSidebar />
      {children}
    </div>
  );
}
