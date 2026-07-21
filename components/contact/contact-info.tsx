"use client";

import type { Route } from "next";
import Link from "next/link";
import {
  EMAIL,
  GITHUB_URL,
  GITHUB_USERNAME,
  LOCATION,
  NAME,
  PHONE
} from "@/lib/constants";
import { CopyButton } from "@/components/docs/copy-button";
import { cn } from "@/lib/utils";
import { withUTM } from "@/utils/link";
import { IconGitHub } from "@/components/icons";
import { IconMail, IconMapPin, IconPhone, IconUser } from "@tabler/icons-react";

export const CONTACT_INFO = [
  {
    label: "Name",
    value: NAME,
    icon: IconUser
  },
  {
    label: "Github",
    value: `github.com/${GITHUB_USERNAME}`,
    icon: IconGitHub,
    href: GITHUB_URL
  },
  {
    label: "Email",
    value: EMAIL,
    icon: IconMail,
    href: `mailto:${EMAIL}`
  },
  {
    label: "Phone",
    value: PHONE,
    icon: IconPhone,
    href: `tel:${PHONE}`
  },
  {
    label: "Location",
    value: LOCATION,
    icon: IconMapPin
  }
];

export function ContactInfo() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 text-xl font-normal">Contact Information</h3>
      </div>
      <div className="grid grid-cols-1 space-y-4">
        {CONTACT_INFO.map(item => (
          <div key={item.label} className="group relative">
            <div className="flex items-center gap-3">
              <div className="relative">
                <item.icon className="primary-ring rounded-primary text-muted-primary border-edge from-background to-muted size-9 border bg-linear-to-b p-1.5" />
              </div>
              <div className="text-primary flex flex-col space-y-1">
                <span className="text-muted-foreground text-xs font-normal tracking-widest uppercase">
                  {item.label}
                </span>
                {item.href ? (
                  <div className="flex w-full items-center justify-between">
                    <Link
                      href={withUTM(item.href) as Route}
                      target="_blank"
                      className="decoration-primary text-sm font-normal underline-offset-4 hover:underline">
                      {item.value}
                    </Link>
                    <CopyButton
                      text={item.value}
                      docs={false}
                      className={cn(
                        "hover:bg-muted text-muted-foreground py-1.5 opacity-0",
                        "duration-200 ease-in-out group-hover:opacity-100"
                      )}
                    />
                  </div>
                ) : (
                  <span className="text-sm font-normal">{item.value}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
