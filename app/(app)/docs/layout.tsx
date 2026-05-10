export default function DocsLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="border-edge screen-line-after relative mx-auto w-full max-w-4xl border-x pt-16 pb-4 font-sans sm:px-4">
      {children}
    </div>
  );
}
