import { useEffect, useRef, useState } from "react";

/**
 * Session play clock. Counts up in seconds from mount, pauseable, resettable.
 * Session only — nothing is written to localStorage.
 */
export function GameClock({ resetKey = 0, running = true }: { resetKey?: number; running?: boolean }) {
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setSeconds(0);
  }, [resetKey]);

  useEffect(() => {
    if (!running) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }
    intervalRef.current = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running, resetKey]);

  const mm = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const ss = (seconds % 60).toString().padStart(2, "0");

  return (
    <div
      className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 font-mono text-sm tabular-nums text-foreground shadow-sm"
      aria-label={`Time played ${mm} minutes ${ss} seconds`}
    >
      <span aria-hidden>⏱️</span>
      <span>{mm}:{ss}</span>
    </div>
  );
}
