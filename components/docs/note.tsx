import { CopyButton } from "./copy-button";

export default function Note({ text }: { text: string }) {
  return (
    <div className="animate-fade-in-blur group max-w-code relative mt-3 mb-7 flex gap-2 rounded-lg border border-green-200 bg-green-500/5 px-3 py-2 text-green-500 dark:border-green-950">
      <p className="text-sm leading-relaxed sm:text-base">{text}</p>
      <CopyButton
        text={text}
        docs={false}
        className={
          "hover:bg-muted text-muted-foreground absolute right-1 bottom-1 py-1.5 opacity-0 duration-200 group-hover:opacity-100"
        }
      />
    </div>
  );
}
