"use client";

import {
  IconArrowDown,
  IconArrowLeft,
  IconArrowRight,
  IconDeviceLaptop,
  IconDeviceMobile,
  IconServer2
} from "@tabler/icons-react";

export function ClientServerDiagram() {
  return (
    <div className="bg-background not-typeset my-3 hidden w-full rounded-lg border p-4 lg:block">
      <div className="flex flex-col items-center gap-6 lg:flex-row lg:justify-between">
        <div className="bg-card w-full max-w-50 rounded-xl border p-4">
          <h4 className="mt-0 mb-4 text-center font-medium">YOU (Client)</h4>

          <div className="space-y-3">
            <div className="flex items-center gap-3 rounded-lg border p-3">
              <IconDeviceLaptop
                className="text-muted-foreground size-8"
                stroke={1.8}
              />
              <span className="font-medium">Laptop</span>
            </div>

            <div className="flex items-center gap-3 rounded-lg border p-3">
              <IconDeviceMobile
                className="text-muted-foreground size-7"
                stroke={1.8}
              />
              <span className="font-medium">Phone</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-col items-center gap-3 lg:flex-row">
            <span className="bg-muted rounded-full border px-4 py-2 text-center text-sm">
              Request: <strong>Open google.com</strong>
            </span>

            <IconArrowRight
              className="text-muted-foreground hidden lg:block"
              size={32}
            />

            <IconArrowDown
              className="text-muted-foreground lg:hidden"
              size={28}
            />
          </div>

          <div className="flex flex-col-reverse items-center gap-3 lg:flex-row">
            <IconArrowLeft
              className="text-muted-foreground hidden lg:block"
              size={32}
            />

            <IconArrowDown
              className="text-muted-foreground rotate-180 lg:hidden"
              size={28}
            />

            <span className="bg-muted rounded-full border px-4 py-2 text-center text-sm">
              Response: HTML, CSS, JavaScript & Images
            </span>
          </div>
        </div>

        <div className="bg-card w-full max-w-50 rounded-xl border p-4">
          <h4 className="mt-0 mb-4 text-center font-medium">
            WEBSITE (Server)
          </h4>

          <div className="flex flex-col items-center rounded-lg border p-6">
            <IconServer2 className="text-muted-foreground mb-3 size-10" />

            <span className="font-medium">Server</span>
            <span className="text-muted-foreground text-sm">Computer</span>
          </div>
        </div>
      </div>
    </div>
  );
}
