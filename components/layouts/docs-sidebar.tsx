"use client";

import { getDocsItems } from "@/lib/source";
import { LineNav } from "@/components/ui/line-nav";
import { usePathname } from "next/navigation";
import { useSound } from "@/hooks/use-sound";
import { cardSlide5Sound } from "@/sounds/card-slide-5";

export function DocsSidebar() {
  const pathname = usePathname();

  const [play] = useSound(cardSlide5Sound);

  const isDsa = pathname.includes("/docs/dsa");

  const items = getDocsItems(isDsa ? "dsa" : "playbook");

  return (
    <aside className="primary-ring fixed top-1/2 left-1 hidden w-70 -translate-y-1/2 rounded-lg border p-2 lg:block">
      <h2 className="font-inter font-medium">{isDsa ? "DSA" : "Playbook"}</h2>

      <LineNav activeHref={pathname} items={items} onItemClick={() => play()} />
    </aside>
  );
}
