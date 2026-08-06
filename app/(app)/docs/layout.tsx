import { DocsSidebar } from "@/components/layouts/docs-sidebar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { IconMenu4 } from "@tabler/icons-react";

export default function DocsLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="border-edge screen-line-after relative mx-auto w-full max-w-4xl border-x px-4 pt-10 font-sans">
      <DocsSidebar className="hidden xl:block" />
      <div className="xl:hidden">
        <Sheet>
          <SheetTrigger
            className={
              "bg-muted fixed bottom-22 left-6 z-40 rounded-lg border p-1.5"
            }>
            <IconMenu4 />
          </SheetTrigger>
          <SheetContent side="left" className={"w-full"}>
            <DocsSidebar className="top-14 w-full max-w-90 border-none bg-transparent p-2 ring-0 ring-transparent" />
          </SheetContent>
        </Sheet>
      </div>
      {children}
    </div>
  );
}
