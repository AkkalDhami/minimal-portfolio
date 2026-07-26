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
    <div className="animate-fade-in-blur group not-typeset max-w-code relative mx-1 my-4 overflow-hidden rounded-lg border border-blue-200/60 bg-blue-50/60 py-3 pr-10 pl-4 dark:border-blue-500/20 dark:bg-blue-500/[0.07]">
      <div className="flex gap-4">
        <div className="size-4">
          <IconInfoCircle className="size-5 text-blue-500" />
        </div>

        <p className="font-inter not-typeset flex-1 text-base leading-relaxed">
          {text}
        </p>
      </div>

      <CopyButton
        text={text}
        docs={false}
        className={
          "absolute right-1.5 bottom-1.5 py-1.5 text-blue-500/60 opacity-0 duration-200 group-hover:opacity-100 hover:bg-blue-100 hover:text-blue-600 dark:text-blue-400/60 dark:hover:bg-blue-500/10 dark:hover:text-blue-300"
        }
      />
    </div>
  );
}
