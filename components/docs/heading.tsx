import { cn } from "@/lib/utils";
import { CopyButton } from "./copy-button";
import {
  Children,
  ComponentProps,
  isValidElement,
  ReactElement,
  ReactNode
} from "react";

export function HeadingWithCopy({
  tag: Tag,
  baseClassName,
  children,
  className,
  ...props
}: ComponentProps<"h1"> & {
  tag: "h1" | "h2" | "h3" | "h4" | "h5";
  baseClassName: string;
}) {
  const headingText = getTextFromChildren(children);

  return (
    <div className="group relative">
      <Tag className={cn(baseClassName, className)} {...props}>
        {children}
      </Tag>
      <CopyButton
        text={headingText}
        docs={false}
        className="hover:bg-muted text-muted-foreground pointer-events-auto absolute top-1/2 right-0 -translate-y-1/2 py-1.5 opacity-0 transition-opacity duration-200 ease-in-out group-hover:opacity-100"
      />
    </div>
  );
}

function getTextFromChildren(children: ReactNode): string {
  return Children.toArray(children)
    .map(child => {
      if (typeof child === "string" || typeof child === "number") {
        return child;
      }
      if (isValidElement(child)) {
        const element = child as ReactElement<{ children?: ReactNode }>;
        return getTextFromChildren(element.props.children);
      }
      return "";
    })
    .join("");
}
