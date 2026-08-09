"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  IconRocket,
  IconBug,
  IconWifi,
  IconAntenna,
  IconRefresh,
  IconTrophy,
  IconArrowLeft,
  IconArrowRight
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSound } from "@/hooks/use-sound";
import { back004Sound } from "@/sounds/back-004";
import { cardSlide5Sound } from "@/sounds/card-slide-5";

type ObstacleType = "debris" | "signal";

interface Obstacle {
  id: number;
  x: number; // percent, 0-100
  y: number; // px from top of game area
  type: ObstacleType;
  size: number; // px
}

type GameStatus = "idle" | "playing" | "over";

const GAME_HEIGHT = 380;
const SHIP_SIZE = 30;
const SHIP_Y = GAME_HEIGHT - 54;
const HIGH_SCORE_KEY = "signal-lost-high-score";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function SignalLostGame({ className }: { className?: string }) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [playError] = useSound(back004Sound);
  const [play] = useSound(cardSlide5Sound);
  const [status, setStatus] = React.useState<GameStatus>("idle");
  const [shipX, setShipX] = React.useState(50);
  const [obstacles, setObstacles] = React.useState<Obstacle[]>([]);
  const [score, setScore] = React.useState(0);
  const [highScore, setHighScore] = React.useState(0);
  const [isNewRecord, setIsNewRecord] = React.useState(false);
  const [flash, setFlash] = React.useState<"hit" | "collect" | null>(null);

  const shipXRef = React.useRef(50);
  const obstaclesRef = React.useRef<Obstacle[]>([]);
  const scoreRef = React.useRef(0);
  const highScoreRef = React.useRef(0);
  const elapsedRef = React.useRef(0);
  const lastSpawnRef = React.useRef(0);
  const lastTimeRef = React.useRef<number | null>(null);
  const idRef = React.useRef(0);
  const keysRef = React.useRef<Set<string>>(new Set());
  const rafRef = React.useRef<number | null>(null);

  // Load high score once on mount.
  React.useEffect(() => {
    const stored = window.localStorage.getItem(HIGH_SCORE_KEY);
    const value = stored ? Number(stored) : 0;
    highScoreRef.current = value;
    setHighScore(value);
  }, []);

  const stopLoop = React.useCallback(() => {
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  const endGame = React.useCallback(() => {
    stopLoop();
    const finalScore = Math.floor(scoreRef.current);
    const record = finalScore > highScoreRef.current;
    if (record) {
      highScoreRef.current = finalScore;
      window.localStorage.setItem(HIGH_SCORE_KEY, String(finalScore));
      setHighScore(finalScore);
    }
    setIsNewRecord(record);
    setFlash("hit");
    setStatus("over");
    playError();
  }, [stopLoop, playError]);

  const startGame = React.useCallback(() => {
    obstaclesRef.current = [];
    scoreRef.current = 0;
    elapsedRef.current = 0;
    lastSpawnRef.current = 0;
    lastTimeRef.current = null;
    idRef.current = 0;
    shipXRef.current = 50;
    setObstacles([]);
    setScore(0);
    setShipX(50);
    setFlash(null);
    setIsNewRecord(false);
    setStatus("playing");
  }, []);

  React.useEffect(() => {
    if (status !== "playing") return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (["ArrowLeft", "ArrowRight", " "].includes(e.key)) {
        e.preventDefault();
      }
      keysRef.current.add(e.key.toLowerCase());
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current.delete(e.key.toLowerCase());
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    const loop = (time: number) => {
      if (lastTimeRef.current == null) lastTimeRef.current = time;
      const dt = Math.min(0.05, (time - lastTimeRef.current) / 1000);
      lastTimeRef.current = time;
      elapsedRef.current += dt * 1000;

      let dx = 0;
      if (keysRef.current.has("arrowleft") || keysRef.current.has("a")) dx -= 1;
      if (keysRef.current.has("arrowright") || keysRef.current.has("d"))
        dx += 1;
      if (dx !== 0) {
        shipXRef.current = clamp(shipXRef.current + dx * dt * 95, 6, 94);
        setShipX(shipXRef.current);
      }

      const spawnInterval = Math.max(320, 900 - elapsedRef.current / 30);
      const fallSpeed = Math.min(260, 70 + elapsedRef.current / 90);

      if (elapsedRef.current - lastSpawnRef.current > spawnInterval) {
        lastSpawnRef.current = elapsedRef.current;
        idRef.current += 1;
        const isSignal = Math.random() < 0.18;
        obstaclesRef.current = [
          ...obstaclesRef.current,
          {
            id: idRef.current,
            x: 8 + Math.random() * 84,
            y: -24,
            type: isSignal ? "signal" : "debris",
            size: isSignal ? 22 : 26
          }
        ];
      }

      let collided = false;
      let collected = false;
      let scoreGain = dt * 12;

      const nextObstacles: Obstacle[] = [];
      for (const o of obstaclesRef.current) {
        const ny = o.y + fallSpeed * dt;
        if (ny > GAME_HEIGHT + 30) continue;

        const yOverlap = ny + o.size >= SHIP_Y - 4 && ny <= SHIP_Y + SHIP_SIZE;
        const xOverlap = Math.abs(o.x - shipXRef.current) < 9;

        if (yOverlap && xOverlap) {
          if (o.type === "debris") {
            collided = true;
          } else {
            scoreGain += 25;
            collected = true;
            play();
          }
          continue;
        }
        nextObstacles.push({ ...o, y: ny });
      }

      obstaclesRef.current = nextObstacles;
      setObstacles(nextObstacles);

      scoreRef.current += scoreGain;
      setScore(Math.floor(scoreRef.current));

      if (collected) {
        setFlash("collect");
        window.setTimeout(() => {
          setFlash(f => (f === "collect" ? null : f));
        }, 200);
      }

      if (collided) {
        playError();
        endGame();
        return;
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      stopLoop();
    };
  }, [status, endGame, stopLoop, playError, play]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (status !== "playing" || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const percent = clamp(((e.clientX - rect.left) / rect.width) * 100, 6, 94);
    shipXRef.current = percent;
    setShipX(percent);
  };

  const nudge = (dir: -1 | 1) => {
    if (status !== "playing") return;
    shipXRef.current = clamp(shipXRef.current + dir * 10, 6, 94);
    setShipX(shipXRef.current);
  };

  return (
    <div className={cn("mx-auto w-full max-w-sm select-none", className)}>
      <motion.div
        ref={containerRef}
        onPointerMove={handlePointerMove}
        role="img"
        aria-label="404 dodge game: steer the rocket away from bugs and toward signal icons"
        animate={flash === "hit" ? { x: [0, -8, 8, -6, 6, 0] } : { x: 0 }}
        transition={{ duration: 0.4 }}
        style={{ height: GAME_HEIGHT, touchAction: "none" }}
        className="bg-background relative touch-none overflow-hidden rounded-2xl border">
        <div
          aria-hidden
          className="text-foreground pointer-events-none absolute inset-0 opacity-[0.06]"
        />
        {/* HUD */}
        <div className="text-muted-foreground absolute inset-x-0 top-0 z-10 flex items-center justify-between px-3 py-2 font-mono text-xs">
          <span className="flex items-center gap-1">
            <IconAntenna
              size={14}
              className={cn(status === "playing" && "animate-pulse")}
            />
            SIGNAL {String(score).padStart(4, "0")}
          </span>
          <span className="flex items-center gap-1">
            <IconTrophy size={14} />
            {String(highScore).padStart(4, "0")}
          </span>
        </div>
        {/* obstacles */}
        {obstacles.map(o => (
          <div
            key={o.id}
            aria-hidden
            className={cn(
              "absolute -translate-x-1/2",
              o.type === "debris" ? "text-destructive" : "text-primary"
            )}
            style={{
              left: `${o.x}%`,
              top: o.y,
              width: o.size,
              height: o.size
            }}>
            {o.type === "debris" ? (
              <IconBug size={o.size} />
            ) : (
              <IconWifi
                size={o.size}
                className="drop-shadow-[0_0_6px_currentColor]"
              />
            )}
          </div>
        ))}
        {/* ship */}
        <div
          aria-hidden
          className="text-primary absolute -translate-x-1/2"
          style={{
            left: `${shipX}%`,
            top: SHIP_Y,
            width: SHIP_SIZE,
            height: SHIP_SIZE
          }}>
          <IconRocket size={SHIP_SIZE} className="-rotate-45" />
        </div>
        {/* idle / game over overlays */}
        <AnimatePresence>
          {status !== "playing" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-background/90 absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 px-6 text-center backdrop-blur-sm">
              {status === "idle" ? (
                <>
                  <IconRocket size={32} className="text-primary" />
                  <p className="text-foreground font-mono text-sm">
                    Dodge the bugs.
                    <br />
                    Catch the signal.
                  </p>
                  <Button
                    type="button"
                    onClick={startGame}
                    size="sm"
                    className="mt-1">
                    Launch
                  </Button>
                  <div className="text-muted-foreground flex items-center gap-3 text-[11px]">
                    Drag, or steer with <IconArrowLeft className="size-4" />
                    <IconArrowRight className="size-4" />
                  </div>
                </>
              ) : (
                <>
                  <p className="text-muted-foreground font-mono text-xs tracking-widest uppercase">
                    Connection lost
                  </p>
                  <p className="text-foreground font-mono text-2xl font-bold">
                    {score}
                  </p>
                  {isNewRecord && (
                    <p className="text-primary flex items-center gap-1 text-xs">
                      <IconTrophy size={14} /> new best
                    </p>
                  )}
                  <Button
                    type="button"
                    onClick={startGame}
                    size="sm"
                    className="mt-1 gap-1.5">
                    <IconRefresh size={16} />
                    Try again
                  </Button>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* mobile steer buttons */}
      <div className="mt-3 flex justify-center gap-3 sm:hidden">
        <Button
          type="button"
          variant="outline"
          size="icon"
          onPointerDown={() => nudge(-1)}
          aria-label="Steer left">
          ←
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onPointerDown={() => nudge(1)}
          aria-label="Steer right">
          →
        </Button>
      </div>
    </div>
  );
}
