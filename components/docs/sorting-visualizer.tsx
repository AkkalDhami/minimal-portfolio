/* eslint-disable react-hooks/refs */
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconPlayerPause,
  IconPlayerPlayFilled,
  IconRefresh
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { CopyButton } from "./copy-button";

export type SortAlgo = "bubble" | "selection" | "insertion";

export interface SortingVisualizerProps {
  algorithm?: SortAlgo;
  defaultValues?: number[];
  maxElements?: number;
  showInput?: boolean;
  showResult?: boolean;
  title?: string;
  className?: string;
}

type BarState =
  | "default"
  | "comparing"
  | "swapping"
  | "sorted"
  | "pivot"
  | "inserting";

interface Bar {
  value: number;
  id: number;
  state: BarState;
}

interface Step {
  bars: Bar[];
  description: string;
  passIndex: number;
  swapIndices: number[];
}

interface SortStats {
  comparisons: number;
  swaps: number;
  passes: number;
}

const ALL_ALGOS: {
  key: SortAlgo;
  label: string;
  tagline: string;
  complexity: string;
}[] = [
  {
    key: "bubble",
    label: "Bubble Sort",
    tagline: "Adjacent swaps",
    complexity: "O(n²)"
  },
  {
    key: "selection",
    label: "Selection Sort",
    tagline: "Find minimum",
    complexity: "O(n²)"
  },
  {
    key: "insertion",
    label: "Insertion Sort",
    tagline: "Build sorted half",
    complexity: "O(n²)"
  }
];

const SPEEDS = [
  { label: "Slow", ms: 1600 },
  { label: "Normal", ms: 1000 },
  { label: "Fast", ms: 500 },
  { label: "Super Fast", ms: 200 }
];

const DEFAULT_ARRAY = [64, 34, 25, 12, 22, 11, 90];

const STATE_BG: Record<BarState, string> = {
  default: "bg-slate-600",
  comparing: "bg-amber-400",
  swapping: "bg-rose-500",
  sorted: "bg-emerald-500",
  pivot: "bg-violet-500",
  inserting: "bg-sky-400"
};

const STATE_LABEL_COLOR: Record<BarState, string> = {
  default: "#fbbf24",
  comparing: "#fbbf24",
  swapping: "#f43f5e",
  sorted: "#10b981",
  pivot: "#a78bfa",
  inserting: "#38bdf8"
};

const LEGEND: { state: BarState; label: string }[] = [
  { state: "default", label: "Unsorted" },
  { state: "comparing", label: "Comparing" },
  { state: "swapping", label: "Swapping" },
  { state: "sorted", label: "Sorted" },
  { state: "pivot", label: "Min / Key" },
  { state: "inserting", label: "Inserting" }
];

function clone(bars: Bar[]): Bar[] {
  return bars.map(b => ({ ...b }));
}

function generateBubbleSteps(initial: Bar[]): {
  steps: Step[];
  stats: SortStats;
} {
  const steps: Step[] = [];
  const bars = clone(initial);
  const n = bars.length;
  let comparisons = 0,
    swaps = 0;

  for (let pass = 0; pass < n - 1; pass++) {
    let swapped = false;
    for (let j = 0; j < n - pass - 1; j++) {
      comparisons++;
      const cmp = clone(bars);
      cmp[j].state = "comparing";
      cmp[j + 1].state = "comparing";
      for (let s = n - pass; s < n; s++) cmp[s].state = "sorted";
      steps.push({
        bars: cmp,
        description: `Pass ${pass + 1}: Compare [${j}]=${bars[j].value} vs [${j + 1}]=${bars[j + 1].value}`,
        passIndex: pass,
        swapIndices: []
      });

      if (bars[j].value > bars[j + 1].value) {
        [bars[j], bars[j + 1]] = [bars[j + 1], bars[j]];
        swaps++;
        const sw = clone(bars);
        sw[j].state = "swapping";
        sw[j + 1].state = "swapping";
        for (let s = n - pass; s < n; s++) sw[s].state = "sorted";
        steps.push({
          bars: sw,
          description: `Pass ${pass + 1}: Swap → ${bars[j].value} ↔ ${bars[j + 1].value}`,
          passIndex: pass,
          swapIndices: [j, j + 1]
        });
        swapped = true;
      }
    }
    bars[n - pass - 1].state = "sorted";
    if (!swapped) {
      const done = clone(bars);
      done.forEach(b => (b.state = "sorted"));
      steps.push({
        bars: done,
        description: `Pass ${pass + 1}: No swaps — already sorted!`,
        passIndex: pass,
        swapIndices: []
      });
      return { steps, stats: { comparisons, swaps, passes: pass + 1 } };
    }
  }
  const final = clone(bars);
  final.forEach(b => (b.state = "sorted"));
  steps.push({
    bars: final,
    description: "🎉 Array fully sorted!",
    passIndex: n - 1,
    swapIndices: []
  });
  return { steps, stats: { comparisons, swaps, passes: n - 1 } };
}

function generateSelectionSteps(initial: Bar[]): {
  steps: Step[];
  stats: SortStats;
} {
  const steps: Step[] = [];
  const bars = clone(initial);
  const n = bars.length;
  let comparisons = 0,
    swaps = 0;

  for (let pass = 0; pass < n - 1; pass++) {
    let minIdx = pass;
    for (let j = pass + 1; j < n; j++) {
      comparisons++;
      const cmp = clone(bars);
      for (let s = 0; s < pass; s++) cmp[s].state = "sorted";
      cmp[minIdx].state = "pivot";
      cmp[j].state = "comparing";
      steps.push({
        bars: cmp,
        description: `Pass ${pass + 1}: Min = ${bars[minIdx].value}, checking  arr[${j}] = ${bars[j].value}`,
        passIndex: pass,
        swapIndices: []
      });
      if (bars[j].value < bars[minIdx].value) minIdx = j;
    }
    if (minIdx !== pass) {
      [bars[pass], bars[minIdx]] = [bars[minIdx], bars[pass]];
      swaps++;
      const sw = clone(bars);
      for (let s = 0; s < pass; s++) sw[s].state = "sorted";
      sw[pass].state = "swapping";
      sw[minIdx].state = "swapping";
      steps.push({
        bars: sw,
        description: `Pass ${pass + 1}: Place min ${bars[pass].value} → position ${pass}`,
        passIndex: pass,
        swapIndices: [pass, minIdx]
      });
    }
    bars[pass].state = "sorted";
  }
  const final = clone(bars);
  final.forEach(b => (b.state = "sorted"));
  steps.push({
    bars: final,
    description: "🎉 Array fully sorted!",
    passIndex: n - 1,
    swapIndices: []
  });
  return { steps, stats: { comparisons, swaps, passes: n - 1 } };
}

function generateInsertionSteps(initial: Bar[]): {
  steps: Step[];
  stats: SortStats;
} {
  const steps: Step[] = [];
  const bars = clone(initial);
  const n = bars.length;
  bars[0].state = "sorted";
  let comparisons = 0,
    swaps = 0;

  for (let pass = 1; pass < n; pass++) {
    const key = bars[pass].value;
    let j = pass - 1;
    const pick = clone(bars);
    pick[pass].state = "inserting";
    steps.push({
      bars: pick,
      description: `Pass ${pass}: Pick key=${key} to insert`,
      passIndex: pass,
      swapIndices: []
    });

    while (j >= 0 && bars[j].value > key) {
      comparisons++;
      bars[j + 1] = { ...bars[j], state: "swapping" };
      const mv = clone(bars);
      mv[j].state = "comparing";
      steps.push({
        bars: mv,
        description: `Pass ${pass}: Shift ${bars[j].value} right for key=${key}`,
        passIndex: pass,
        swapIndices: [j + 1]
      });
      swaps++;
      j--;
    }
    bars[j + 1] = { ...bars[j + 1], value: key, state: "sorted" };
    for (let s = 0; s <= pass; s++) bars[s].state = "sorted";
    const placed = clone(bars);
    steps.push({
      bars: placed,
      description: `Pass ${pass}: Inserted ${key} at index ${j + 1}`,
      passIndex: pass,
      swapIndices: [j + 1]
    });
  }
  const final = clone(bars);
  final.forEach(b => (b.state = "sorted"));
  steps.push({
    bars: final,
    description: "🎉 Array fully sorted!",
    passIndex: n,
    swapIndices: []
  });
  return { steps, stats: { comparisons, swaps, passes: n - 1 } };
}

function runAlgo(
  algo: SortAlgo,
  bars: Bar[]
): { steps: Step[]; stats: SortStats } {
  if (algo === "bubble") return generateBubbleSteps(bars);
  if (algo === "selection") return generateSelectionSteps(bars);
  return generateInsertionSteps(bars);
}

function valuesToBars(values: number[] = []): Bar[] {
  return values.length > 0
    ? values.map((v, i) => ({
        value: v,
        id: i,
        state: "default" as BarState
      }))
    : [];
}

interface ArrayInputProps {
  values: number[];
  maxElements: number;
  onApply: (vals: number[]) => void;
}

function ArrayInputPanel({
  values = [],
  maxElements,
  onApply
}: ArrayInputProps) {
  const [raw, setRaw] = useState(values?.join(", "));
  const [error, setError] = useState("");
  const randomItem = <T,>(arr: T[]) =>
    arr[Math.floor(Math.random() * arr.length)];

  const nearlySorted = [
    [1, 2, 3, 4, 5],
    [5, 2, 3, 4, 1],
    [1, 2, 3, 4, 6, 5],
    [1, 2, 5, 3, 4, 6, 7],
    [1, 2, 5, 6, 4, 3, 7],
    [1, 2, 3, 4, 5, 6],
    [6, 2, 3, 4, 5, 1],
    [1, 2, 3, 4, 5, 6, 7],
    [7, 2, 3, 4, 5, 6, 1]
  ];

  const reverseData = [
    [4, 3, 2, 1],
    [5, 4, 3, 2, 1],
    [6, 5, 4, 3, 2, 1],
    [7, 6, 5, 4, 3, 2, 1],
    [8, 7, 6, 5, 4, 3, 2, 1],
    [9, 8, 7, 6, 5, 4, 3, 2, 1]
  ];

  const duplicatesData = [
    [1, 2, 2, 3, 4, 5],
    [2, 2, 2, 3, 4, 5],
    [1, 3, 2, 3, 4, 5],
    [6, 3, 6, 1, 3, 4, 5],
    [7, 3, 6, 7, 3, 7, 5],
    [3, 6, 7, 3, 7, 5]
  ];

  const presets = [
    {
      label: "Nearly Sorted",
      vals: () => randomItem(nearlySorted)
    },
    {
      label: "Reversed",
      vals: () => randomItem(reverseData)
    },
    {
      label: "Random 5",
      vals: () =>
        Array.from({ length: 5 }, () => Math.floor(Math.random() * 90 + 10))
    },
    {
      label: "Random 8",
      vals: () =>
        Array.from({ length: 8 }, () => Math.floor(Math.random() * 90 + 10))
    },
    {
      label: "Random 12",
      vals: () =>
        Array.from({ length: 12 }, () => Math.floor(Math.random() * 90 + 10))
    },
    {
      label: "Random 16",
      vals: () =>
        Array.from({ length: 16 }, () => Math.floor(Math.random() * 90 + 10))
    },
    {
      label: "Duplicates",
      vals: () => randomItem(duplicatesData)
    }
  ];

  function handleApply() {
    const parts = raw.split(/[\s,]+/).filter(Boolean);
    const nums = parts.map(Number);
    if (nums.some(isNaN) || nums.some(n => n < 1 || n > 999)) {
      setError("Enter numbers between 1-999, comma or space separated.");
      return;
    }
    if (nums.length < 2) {
      setError("Enter at least 2 numbers.");
      return;
    }
    if (nums.length > maxElements) {
      setError(`Max ${maxElements} elements.`);
      return;
    }
    setError("");
    onApply(nums);
  }

  function loadPreset(preset: (typeof presets)[0]) {
    const vals =
      typeof preset.vals === "function" ? preset.vals() : preset.vals;
    setRaw(vals?.join(", "));
    setError("");
    onApply(vals);
  }

  return (
    <div className="border-edge mb-4 rounded-2xl border p-5">
      <p className="text-muted-foreground mb-3 text-xs tracking-widest uppercase">
        Array Input
      </p>

      <div className="mb-3 flex flex-wrap gap-2">
        {presets.map(p => (
          <button
            key={p.label}
            onClick={() => loadPreset(p)}
            className="ring-edge bg-muted hover:bg-primary hover:text-accent rounded-lg px-3 py-1 text-xs ring-1 transition-all">
            {p.label}
          </button>
        ))}
      </div>

      <div className="flex items-start gap-2">
        <div className="flex-1">
          <div className="relative flex items-center">
            <Input
              type="text"
              value={raw}
              onChange={e => {
                setRaw(e.target.value);
                setError("");
              }}
              onKeyDown={e => e.key === "Enter" && handleApply()}
              placeholder="e.g. 38, 27, 43, 3, 9, 82"
              className="focus:ring-muted-foreground w-full rounded-lg border border-neutral-500/30 px-3 py-2 pr-8 text-lg focus:ring-2 focus:outline-none"
            />
            <CopyButton
              text={raw}
              docs={false}
              className={cn(
                "hover:bg-muted text-muted-foreground right-2 py-1.5",
                "duration-200 ease-in-out"
              )}
            />
          </div>
          {error && <p className="mt-2 px-1 text-xs text-rose-400">{error}</p>}
          <p className="text-muted-foreground mt-2 px-1 text-xs">
            Comma or space separated · 2-{maxElements} numbers · 1-999 each
          </p>
        </div>
        <Button
          onClick={handleApply}
          className="h-9 shrink-0 px-4 py-2 text-sm font-normal transition-all">
          Apply
        </Button>
      </div>
    </div>
  );
}

export interface SortingInfo {
  name: string;
  description: string;
  timeComplexity: {
    best: string;
    average: string;
    worst: string;
  };
  spaceComplexity: {
    total: string;
    auxiliary: string;
  };
}

export const SORTING_DATA: Record<SortAlgo, SortingInfo> = {
  bubble: {
    name: "Bubble Sort",
    description:
      "Repeatedly swaps adjacent elements until the array is sorted.",
    timeComplexity: {
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)"
    },
    spaceComplexity: {
      total: "O(n)",
      auxiliary: "O(1)"
    }
  },

  selection: {
    name: "Selection Sort",
    description:
      "Repeatedly selects the smallest element and places it in its correct position.",
    timeComplexity: {
      best: "O(n²)",
      average: "O(n²)",
      worst: "O(n²)"
    },
    spaceComplexity: {
      total: "O(n)",
      auxiliary: "O(1)"
    }
  },

  insertion: {
    name: "Insertion Sort",
    description:
      "Builds the sorted array one element at a time by inserting elements into their correct position.",
    timeComplexity: {
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)"
    },
    spaceComplexity: {
      total: "O(n)",
      auxiliary: "O(1)"
    }
  }
};

interface ResultPanelProps {
  inputValues: number[];
  sortedValues: number[];
  stats: SortStats;
  algo: SortAlgo;
  visible: boolean;
}

function ResultPanel({
  inputValues,
  sortedValues,
  stats,
  algo,
  visible
}: ResultPanelProps) {
  const data = SORTING_DATA[algo];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          className="mb-4 rounded-lg bg-neutral-500/10 p-4">
          <p className="mb-4 text-sm font-medium tracking-widest uppercase">
            {algo} Sort Result
          </p>

          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <p className="text-muted-foreground mb-2 text-sm">Input array</p>
              <div className="flex flex-wrap gap-1.5">
                {inputValues.length > 0 &&
                  inputValues.map((v, i) => (
                    <span
                      key={i}
                      className="rounded-md border border-neutral-500/40 bg-neutral-500/20 px-2.5 py-1 text-sm">
                      {v}
                    </span>
                  ))}
              </div>
            </div>
            <div>
              <p className="text-muted-primary mb-2 text-sm">
                Sorted output (ascending order)
              </p>
              <div className="flex flex-wrap gap-1.5">
                {sortedValues.map((v, i) => (
                  <motion.span
                    key={i}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: i * 0.04 }}
                    className="rounded-md border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-1 text-sm text-emerald-600">
                    {v}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              {
                label: "Comparisons",
                value: stats.comparisons,
                color: "text-emerald-500"
              },
              {
                label: "Swaps",
                value: stats.swaps,
                color: "text-rose-500"
              },
              {
                label: "Passes",
                value: stats.passes,
                color: "text-blue-500"
              }
            ].map(s => (
              <div
                key={s.label}
                className="rounded-lg bg-neutral-500/10 p-3 text-center">
                <p className={`font-semiold text-xl ${s.color}`}>{s.value}</p>
                <p className="text-muted-foreground mt-0.5 text-sm">
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <h3 className="text-lg font-medium">Time complexity</h3>
              <ul className="list-inside">
                <li className="flex list-disc items-center gap-2">
                  <p className="font-bormal text-muted-foreground text-base">
                    Best Case:
                  </p>
                  <p className="text-base font-medium">
                    {data.timeComplexity.best}
                  </p>
                </li>
                <li className="flex list-disc items-center gap-2">
                  <p className="font-bormal text-muted-foreground text-base">
                    Worst Case:
                  </p>
                  <p className="text-base font-medium">
                    {data.timeComplexity.worst}
                  </p>
                </li>
                <li className="flex list-disc items-center gap-2">
                  <p className="font-bormal text-muted-foreground text-base">
                    Average Case:
                  </p>
                  <p className="text-base font-medium">
                    {data.timeComplexity.average}
                  </p>
                </li>
              </ul>
            </div>
            <div className="space-y-1.5">
              <h3 className="text-lg font-medium">Space complexity</h3>
              <ul className="list-inside">
                <li className="flex list-disc items-center gap-2">
                  <p className="font-bormal text-muted-foreground text-base">
                    Auxiliary Space:
                  </p>
                  <p className="text-base font-medium">
                    {data.spaceComplexity.auxiliary}
                  </p>
                </li>
                <li className="flex list-disc items-center gap-2">
                  <p className="font-bormal text-muted-foreground text-base">
                    Total Space:
                  </p>
                  <p className="text-base font-medium">
                    {data.spaceComplexity.total}
                  </p>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-muted-primary mt-3">
            {data.name} : {data.description}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function SortingVisualizer({
  algorithm,
  defaultValues = DEFAULT_ARRAY,
  maxElements = 12,
  showInput = true,
  showResult = true,
  title = "Sorting Algorithms",
  className
}: SortingVisualizerProps) {
  const [algo, setAlgo] = useState<SortAlgo>(algorithm ?? "bubble");
  const [inputValues, setInputValues] = useState<number[]>(
    defaultValues ?? DEFAULT_ARRAY
  );
  const [steps, setSteps] = useState<Step[]>([]);
  const [stats, setStats] = useState<SortStats>({
    comparisons: 0,
    swaps: 0,
    passes: 0
  });
  const [stepIdx, setStepIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speedIdx, setSpeedIdx] = useState(1);
  const [showResultPanel, setShowResultPanel] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const build = useCallback((values: number[], currentAlgo: SortAlgo) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setPlaying(false);
    setShowResultPanel(false);
    const bars = valuesToBars(values);
    const { steps: s, stats: st } = runAlgo(currentAlgo, bars);
    setSteps(s);
    setStats(st);
    setStepIdx(0);
  }, []);

  useEffect(() => {
    build(inputValues, algo);
  }, [algo, inputValues, build]);

  useEffect(() => {
    if (!playing) return;
    if (stepIdx >= steps.length - 1) {
      setPlaying(false);
      setShowResultPanel(showResult);
      return;
    }
    timerRef.current = setTimeout(
      () => setStepIdx(s => s + 1),
      SPEEDS[speedIdx].ms
    );
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [playing, stepIdx, steps.length, speedIdx, showResult]);

  const currentStep = steps[stepIdx];
  const bars = currentStep?.bars ?? [];
  const isDone = stepIdx === steps.length - 1 && steps.length > 0;
  const progress = steps.length > 1 ? (stepIdx / (steps.length - 1)) * 100 : 0;
  const maxVal = Math.max(...bars.map(b => b.value), 1);
  const sortedOutput = (inputValues || []).slice().sort((a, b) => a - b);

  function handleApply(vals: number[]) {
    setInputValues(vals);
  }

  function handleAlgoChange(key: SortAlgo) {
    setAlgo(key);
  }

  function handleStepTo(idx: number) {
    if (timerRef.current) clearTimeout(timerRef.current);
    setPlaying(false);
    setStepIdx(idx);
    if (idx === steps.length - 1 && showResult) setShowResultPanel(true);
  }

  return (
    <div
      className={cn(
        "bg-background border-edge my-6 rounded-lg border p-4",
        className
      )}>
      <div className="mb-4">
        <h1 className="text-2xl font-medium tracking-tight">{title}</h1>
      </div>

      {!algorithm && (
        <div className="mb-5 flex flex-wrap gap-2">
          {ALL_ALGOS.map(a => (
            <button
              key={a.key}
              onClick={() => handleAlgoChange(a.key)}
              className={`rounded-lg border border-neutral-500/30 px-4 py-2 text-sm transition-all ${
                algo === a.key
                  ? "bg-primary text-accent"
                  : "hover:bg-primary bg-secondary hover:text-accent"
              }`}>
              <span className="font-medium">{a.label}</span>
              <span className="ml-2 text-xs">
                {a.complexity} · {a.tagline}
              </span>
            </button>
          ))}
        </div>
      )}

      {showInput && (
        <ArrayInputPanel
          values={inputValues}
          maxElements={maxElements}
          onApply={handleApply}
        />
      )}

      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div className="flex gap-1 rounded-lg border p-1">
          <span className="text-muted-foreground self-center px-2 text-xs">
            Speed
          </span>
          {SPEEDS.map((sp, i) => (
            <button
              key={sp.label}
              onClick={() => setSpeedIdx(i)}
              className={`h-7 rounded px-3 text-xs font-semibold transition-all ${
                speedIdx === i
                  ? "bg-primary text-accent"
                  : "text-muted-foreground hover:text-primary"
              }`}>
              {sp.label}
            </button>
          ))}
        </div>
        <Button
          size={"sm"}
          variant={"outline"}
          onClick={() => build(inputValues, algo)}
          className="h-8 rounded-lg px-4 text-sm font-normal">
          <IconRefresh className="size-4" /> Reset
        </Button>
        {isDone && showResult && (
          <Button
            onClick={() => setShowResultPanel(v => !v)}
            className="h-8 font-normal">
            {showResultPanel ? "Hide result" : "Show result"}
          </Button>
        )}
      </div>

      <div className="border-border bg-card mb-4 rounded-2xl border p-5">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground text-base tracking-widest uppercase">
              Pass
            </span>
            <span className="text-primary text-base font-semibold">
              {(currentStep?.passIndex ?? 0) + 1}
            </span>
          </div>
          <span className="text-muted-primary text-xs">
            Step {stepIdx + 1} / {steps.length}
          </span>
        </div>

        <div
          className="mb-4 flex items-end justify-center gap-1.5"
          style={{ height: 200 }}
          role="img"
          aria-label="Sorting visualization">
          {bars.map((bar, idx) => {
            const h = Math.max((bar.value / maxVal) * 180, 8);
            const w = `${Math.max(Math.min(88 / bars.length, 9), 3)}%`;
            return (
              <motion.div
                key={bar.id}
                layout
                layoutId={`bar-${bar.id}`}
                className="flex flex-col items-center justify-end gap-0.5"
                style={{ width: w, minWidth: 22, height: 200 }}
                transition={{ type: "spring", stiffness: 360, damping: 26 }}>
                <motion.span
                  className="text-[9px] leading-none font-bold"
                  animate={{ color: STATE_LABEL_COLOR[bar.state] }}
                  transition={{ duration: 0.2 }}>
                  {bar.value}
                </motion.span>
                <motion.div
                  className={`w-full rounded-t-sm ${STATE_BG[bar.state]} transition-colors duration-200`}
                  animate={{ height: h }}
                  transition={{ type: "spring", stiffness: 380, damping: 28 }}
                />
                <span className="text-muted-primary text-xs leading-none">
                  {idx}
                </span>
              </motion.div>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={stepIdx}
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -3 }}
            transition={{ duration: 0.15 }}
            className={`mb-3 rounded-lg px-4 py-2.5 text-center text-base ${
              isDone ? "bg-muted" : "bg-neutral-500/20"
            }`}>
            {currentStep?.description ?? "—"}
          </motion.div>
        </AnimatePresence>

        <div className="h-1 overflow-hidden rounded-full bg-neutral-500/40">
          <motion.div
            className="h-full rounded-full bg-green-600"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.25 }}
          />
        </div>
      </div>

      <div className="mb-5 flex items-center gap-2">
        {[
          {
            id: "asdfasdf",
            label: IconChevronsLeft,
            onClick: () => handleStepTo(0),
            disabled: stepIdx === 0
          },
          {
            id: "bashdfadf",
            label: IconChevronLeft,
            onClick: () => handleStepTo(Math.max(0, stepIdx - 1)),
            disabled: stepIdx === 0
          }
        ].map(btn => (
          <button
            key={btn.id}
            onClick={btn.onClick}
            disabled={btn.disabled}
            className="text-muted-foreground hover:text-accent-foreground h-10 rounded-lg bg-neutral-600/20 px-3 text-sm transition-all disabled:opacity-25">
            {<btn.label />}
          </button>
        ))}

        <button
          onClick={() => {
            if (isDone) {
              build(inputValues, algo);
              return;
            }
            setPlaying(p => !p);
          }}
          className={`h-10 flex-1 rounded-lg text-sm font-medium transition-all ${
            isDone
              ? "bg-neutral-900 text-white hover:bg-neutral-800"
              : playing
                ? "bg-amber-600 text-white"
                : "bg-blue-600 text-white hover:bg-blue-700"
          }`}>
          {isDone ? (
            "↺ Replay"
          ) : playing ? (
            <div className="flex items-center justify-center gap-2">
              <IconPlayerPause className="size-4" />
              Pause
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              {" "}
              <IconPlayerPlayFilled className="size-4" />
              Play
            </div>
          )}
        </button>

        {[
          {
            id: "21312asdfvnkb12",
            label: IconChevronRight,
            onClick: () =>
              handleStepTo(Math.min(steps.length - 1, stepIdx + 1)),
            disabled: isDone
          },
          {
            id: "2134123412",
            label: IconChevronsRight,
            onClick: () => handleStepTo(steps.length - 1),
            disabled: isDone
          }
        ].map(btn => (
          <button
            key={btn.id}
            onClick={btn.onClick}
            disabled={btn.disabled}
            className="text-muted-foreground hover:text-accent-foreground h-10 rounded-lg bg-neutral-600/20 px-3 text-sm transition-all disabled:opacity-25">
            {<btn.label />}
          </button>
        ))}
      </div>

      {showResult && (
        <ResultPanel
          inputValues={inputValues}
          sortedValues={sortedOutput}
          stats={stats}
          algo={algo}
          visible={showResultPanel}
        />
      )}

      <div className="border-edge flex flex-wrap gap-x-4 gap-y-2 border-t pt-2">
        {LEGEND.map(item => (
          <div
            key={item.state}
            className="text-muted-foreground flex items-center gap-1.5 text-xs">
            <div className={`size-2.5 rounded-full ${STATE_BG[item.state]}`} />
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}
