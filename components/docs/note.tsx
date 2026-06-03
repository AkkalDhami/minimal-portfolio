export default function Note({ text }: { text: string }) {
  return (
    <div className="animate-fade-in-blur max-w-code mt-3 mb-7 flex gap-2 rounded-lg border border-green-200 bg-green-500/10 px-3 py-2 text-green-600 dark:border-green-950">
      <p className="text-sm leading-relaxed sm:text-base">{text}</p>
    </div>
  );
}
