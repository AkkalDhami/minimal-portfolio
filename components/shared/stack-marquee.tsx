import { Marquee, MarqueeContent, MarqueeItem } from "@/components/ui/marquee";
import { cn } from "@/lib/utils";
import { STACKS } from "@/utils/stack";
import { Section } from "@/components/ui/section";
import { getIconForLanguageExtension } from "@/components/docs/icon";

export function StackMarquee({ home = false }: { home?: boolean }) {
  return (
    <Section
      id="stack-marquee"
      className={cn("px-4", home && "screen-line-before pb-2")}>
      <Marquee className="space-y-5">
        <MarqueeContent speed={70} direction="right" gradient={false}>
          {STACKS.map(s => (
            <StackMarqueeItem key={s.value} stack={s} />
          ))}
        </MarqueeContent>
        <MarqueeContent speed={70} gradient={false}>
          {STACKS.toSorted().map(s => (
            <StackMarqueeItem key={s.value} stack={s} />
          ))}
        </MarqueeContent>
      </Marquee>
    </Section>
  );
}

function StackMarqueeItem({
  stack,
  className
}: {
  stack: (typeof STACKS)[number];
  className?: string;
}) {
  const Icon = getIconForLanguageExtension({
    name: stack.value,
    className: "size-7"
  });

  return (
    <MarqueeItem
      className={cn(
        "group flex items-center gap-2 text-xl font-medium",
        className
      )}>
      <div className="p-1.5">{Icon}</div>
      <span className="text-muted-primary group-hover:text-primary text-3xl leading-0.5 font-medium">
        {stack.label}
      </span>
    </MarqueeItem>
  );
}
