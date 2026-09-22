"use client";

import { cn } from "@/lib/utils";
import NumberFlow from "@number-flow/react";
import { useEffect, useState } from "react";

export function CurrentTime({ className }: { className?: string }) {
  const [time, setTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
    period: "AM"
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours24 = now.getHours();
      const period = hours24 >= 12 ? "PM" : "AM";
      const hours12 = hours24 % 12 || 12;

      setTime({
        hours: hours12,
        minutes: now.getMinutes(),
        seconds: now.getSeconds(),
        period
      });
    };

    updateTime();

    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <time
      className={cn(
        "text-muted-primary flex items-center gap-px font-mono text-sm tabular-nums",
        className
      )}
      aria-label="Current local time">
      <NumberFlow
        value={time.hours}
        format={{
          minimumIntegerDigits: 2
        }}
      />
      <span>:</span>
      <NumberFlow
        value={time.minutes}
        format={{
          minimumIntegerDigits: 2
        }}
      />
      <span>:</span>
      <NumberFlow
        value={time.seconds}
        format={{
          minimumIntegerDigits: 2
        }}
      />
      <span className="ml-1">{time.period}</span>
    </time>
  );
}
