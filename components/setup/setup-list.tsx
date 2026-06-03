"use client";

import { SETUP_DATA } from "@/data/setup";
import { SetupCard } from "@/components/setup/setup-card";

export function SetupList() {
  return (
    <div className="space-y-4 pt-4">
      {SETUP_DATA.map(category => (
        <section
          key={category.title}
          className="screen-line-after animate-fade-in-blur space-y-4 pb-4">
          <div className="flex items-center gap-3">
            <div className="from-background to-muted border-edge rounded-primary primary-ring text-primary flex size-7 items-center justify-center border bg-linear-to-b">
              <category.icon className="size-4" />
            </div>
            <h2 className="text-muted-primary text-xl font-medium tracking-tight">
              {category.title}
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            {category.items.map(item => (
              <SetupCard key={item.title} item={item} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
