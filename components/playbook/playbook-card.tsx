import { IPlaybook } from "@/types/app.types";
import { cn } from "@/lib/utils";
import { cardSlide5Sound } from "@/sounds/card-slide-5";
import { useSound } from "@/hooks/use-sound";

export function PlaybookCard({ data }: { data: IPlaybook }) {
  const [play] = useSound(cardSlide5Sound);
  return (
    <a
      href={`/docs/playbook/${data.slug}`}
      onClick={() => play()}
      className={cn(
        "group hover:bg-card-hover screen-line-before relative p-4 duration-300",
        "animate-fade-in-blur",
        "last:border-r"
      )}>
      <h2 className="text-muted-primary group-hover:text-foreground font-noraml mb-2 line-clamp-1 text-lg underline-offset-4 group-hover:underline">
        {data.title}
      </h2>
      {data.description && (
        <p className="text-muted-secondary line-clamp-2">{data.description}</p>
      )}
    </a>
  );
}
