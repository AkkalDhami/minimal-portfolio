// import { CopyButton } from "./copy-button";

// export default function Note({ text }: { text: string }) {
//   return (
//     <div className="animate-fade-in-blur group max-w-code not-typeset text-foreground relative mx-1 my-4 flex gap-2 rounded-md bg-neutral-200 px-3 py-2 ring-2 ring-neutral-200 dark:bg-[#121212] dark:ring-neutral-950">
//       <p className="font-inter text-sm leading-relaxed sm:text-base">{text}</p>
//       <CopyButton
//         text={text}
//         docs={false}
//         className={
//           "hover:bg-muted text-muted-foreground absolute right-1 bottom-1 py-1.5 opacity-0 duration-200 group-hover:opacity-100"
//         }
//       />
//     </div>
//   );
// }

import { IconInfoCircle } from "@tabler/icons-react";
import { CopyButton } from "./copy-button";

export default function Note({ text }: { text: string }) {
  return (
    <div className="animate-fade-in-blur group not-typeset max-w-code relative mx-1 my-4 overflow-hidden rounded-lg border border-blue-500/20 py-3 pr-10 pl-4">
      <div className="flex gap-4">
        <div className="mt-0.5 size-4">
          <IconInfoCircle className="size-5 text-blue-500" />
        </div>

        <p className="font-inter not-typeset flex-1 text-base leading-relaxed text-blue-500">
          {text}
        </p>
      </div>

      <CopyButton
        text={text}
        docs={false}
        className={
          "absolute right-1.5 bottom-1.5 py-1.5 opacity-0 duration-200 group-hover:opacity-100"
        }
      />
    </div>
  );
}
