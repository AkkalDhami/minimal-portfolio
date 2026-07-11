"use client";

import {
  IconDeviceMobile,
  IconServer2,
  IconArrowRight,
  IconArrowLeft,
  IconDeviceLaptop
} from "@tabler/icons-react";

export function ClientServerDiagram() {
  return (
    <div className="bg-background my-3 w-full overflow-x-auto rounded-lg border p-4">
      <div className="mx-auto flex min-w-200 items-center justify-between gap-6">
        <div className="bg-card w-64 rounded-xl border p-6">
          <h4 className="mb-6 text-center text-lg font-semibold">
            YOU (Client)
          </h4>

          <div className="space-y-4">
            <div className="flex items-center gap-3 rounded-lg border p-3">
              <IconDeviceLaptop className="size-8 text-blue-500" stroke={1.8} />
              <span className="font-medium">Laptop</span>
            </div>

            <div className="flex items-center gap-3 rounded-lg border p-3">
              <IconDeviceMobile
                className="size-8 text-emerald-500"
                stroke={1.8}
              />
              <span className="font-medium">Phone</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-10">
          <div className="flex items-center gap-4">
            <span className="bg-muted rounded-full border px-4 py-2 text-sm font-medium whitespace-nowrap">
              Request: <strong>Open google.com</strong>
            </span>

            <IconArrowRight className="size-8 text-blue-500" stroke={2} />
          </div>

          <div className="flex items-center gap-4">
            <IconArrowLeft className="size-8 text-emerald-500" stroke={2} />

            <span className="bg-muted rounded-full border px-4 py-2 text-sm font-medium whitespace-nowrap">
              Response: HTML, CSS, JavaScript & Images
            </span>
          </div>
        </div>

        <div className="bg-card w-64 rounded-xl border p-6">
          <h4 className="mb-6 text-center text-lg font-semibold">
            WEBSITE (Server)
          </h4>

          <div className="flex flex-col items-center rounded-lg border p-6">
            <IconServer2
              className="mb-3 size-16 text-orange-500"
              stroke={1.8}
            />

            <span className="text-lg font-semibold">Server</span>
            <span className="text-muted-foreground text-sm">Computer</span>
          </div>
        </div>
      </div>
    </div>
  );
}
