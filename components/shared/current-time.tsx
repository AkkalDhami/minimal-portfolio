"use client";

import { cn } from "@/lib/utils";
import NumberFlow from "@number-flow/react";
import { useEffect, useState } from "react";
import { IconClock } from "@tabler/icons-react";

export function CurrentTime({ className }: { className?: string }) {
  const [time, setTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
    period: "AM"
  });

  useEffect(() => {
    const updateTime = () => {
      const parts = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Kathmandu",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true
      }).formatToParts(new Date());

      const get = (type: string) =>
        parts.find(part => part.type === type)?.value ?? "";

      setTime({
        hours: Number(get("hour")),
        minutes: Number(get("minute")),
        seconds: Number(get("second")),
        period: get("dayPeriod")
      });
    };

    updateTime();

    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={cn(
        "text-muted-primary flex items-center gap-1 text-sm",
        className
      )}>
      <IconClock stroke={1.8} className="size-4" />
      <span className="text-sm -tracking-tight">Local Time: </span>
      <time
        className={"flex items-center gap-px font-mono text-sm tabular-nums"}
        aria-label="Current time in Nepal">
        <NumberFlow value={time.hours} format={{ minimumIntegerDigits: 2 }} />
        <span>:</span>
        <NumberFlow value={time.minutes} format={{ minimumIntegerDigits: 2 }} />
        <span>:</span>
        <NumberFlow value={time.seconds} format={{ minimumIntegerDigits: 2 }} />
        <span className="ml-1">{time.period}</span>
      </time>
    </div>
  );
}
