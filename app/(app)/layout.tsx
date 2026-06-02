import { Footer } from "@/components/layouts/footer";
import { Navbar } from "@/components/layouts/navbar";
import { BackToTop } from "@/components/ui/back-to-top";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="relative max-w-svw overflow-hidden">{children}</main>
      <Footer />
      <BackToTop />
      <div className="to-background pointer-events-none fixed inset-x-0 bottom-0 z-50 h-[calc(--spacing(24)+env(safe-area-inset-bottom,0))] bg-linear-to-b from-transparent from-[calc(env(safe-area-inset-bottom,0%))] mask-linear-[to_top,var(--background)_25%,transparent] backdrop-blur-[1px]"></div>
    </>
  );
}
