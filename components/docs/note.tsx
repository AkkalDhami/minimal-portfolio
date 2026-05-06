export default function Note({ text }: { text: string }) {
  return (
    <div className="bg-muted/60 text-muted-primary my-3 flex gap-2 rounded-lg border border-neutral-200 px-3 py-2 dark:border-neutral-800">
      <p className="text-sm leading-relaxed sm:text-base">{text}</p>
    </div>
  );
}
