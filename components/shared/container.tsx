import React from "react";

export function Container({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`animate-fade-in-blur container mx-auto max-w-4xl ${className}`}
      {...props}>
      {children}
    </div>
  );
}
