"use client";

import { useState } from "react";
import { useSqlDatabase } from "@/hooks/use-sql-database";
import {
  BOOKS_TABLE_QUERIES,
  BOOKS_TABLE_SCHEMA,
  DEFAULT_QUERY,
  SAMPLE_QUERIES,
  TABLE_SCHEMAS
} from "@/data/sql-sample";
import type { QueryResult } from "@/types/sql-playground.types";
import { SchemaDiagram } from "@/components/sql-playground/schema-diagram";
import { SampleQueryList } from "@/components/sql-playground/sample-query-list";
import { ResultsPanel } from "@/components/sql-playground/results-panel";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { SubHeading } from "@/components/ui/sub-heading";
import { Section } from "@/components/ui/section";
import { SqlEditor } from "./sql-editor";
import { back004Sound } from "@/sounds/back-004";
import { useSound } from "@/hooks/use-sound";
import { successChimeSound } from "@/sounds/success-chime";
import { useSearchParams } from "next/navigation";

interface SqlPlaygroundProps {
  docs?: boolean;
  query?: string;
}

export function SqlPlayground({ docs = false, query }: SqlPlaygroundProps) {
  // console.log({ query });
  const searchParams = useSearchParams();

  const search = searchParams.get("q");

  const isAggregate = search === "aggregate";

  const { status, initError, execute } = useSqlDatabase({ isAggregate });
  const [playError] = useSound(back004Sound);
  const [playSuccess] = useSound(successChimeSound);
  const [selectedQueryId, setSelectedQueryId] = useState(
    isAggregate ? BOOKS_TABLE_QUERIES[0].id : SAMPLE_QUERIES[0].id
  );
  const [sql, setSql] = useState(
    isAggregate
      ? (BOOKS_TABLE_QUERIES[0].sql ?? DEFAULT_QUERY)
      : (query ?? DEFAULT_QUERY)
  );
  const [result, setResult] = useState<QueryResult | null>(null);
  const [queryError, setQueryError] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  function runQuery() {
    if (status !== "ready" || !sql.trim()) return;
    setIsRunning(true);
    try {
      const res = execute(sql);
      setResult(res);
      playSuccess();
      setQueryError(null);
    } catch (err) {
      setQueryError(err instanceof Error ? err.message : "Query failed.");
      setResult(null);
      playError();
    } finally {
      setIsRunning(false);
    }
  }

  if (isAggregate) {
    return (
      <Section id="sql-playground" className="animate-fade-in-blur">
        {!docs && (
          <>
            <div className="px-4">
              <Heading>MySQL playground</Heading>
              <SubHeading className="">
                Real SQLite, compiled to WebAssembly, running entirely in your
                browser. Write joins, aggregates, subqueries — nothing touches a
                server, nothing is stored.
              </SubHeading>
            </div>
            <div className="screen-line-before mt-5 px-4 pt-6">
              <SchemaDiagram tables={BOOKS_TABLE_SCHEMA} />
            </div>
          </>
        )}

        <div className="mt-4 px-4">
          {!docs && (
            <SampleQueryList
              selectedQueryId={selectedQueryId}
              queries={BOOKS_TABLE_QUERIES}
              onSelect={q => {
                setSelectedQueryId(q.id);
                setSql(q.sql);
                setResult(null);
                setQueryError(null);
              }}
            />
          )}
          <div>
            <Card className="overflow-hidden px-0">
              {initError ? (
                <p className="text-destructive p-4 font-mono text-xs">
                  Failed to load SQL engine: {initError}
                </p>
              ) : (
                <>
                  <SqlEditor
                    value={sql}
                    onChange={setSql}
                    onRun={runQuery}
                    status={status}
                    isRunning={isRunning}
                  />
                  <ResultsPanel result={result} error={queryError} />
                </>
              )}
            </Card>
          </div>
        </div>
      </Section>
    );
  }

  return (
    <Section id="sql-playground" className="animate-fade-in-blur">
      {!docs && (
        <>
          <div className="px-4">
            <Heading>MySQL playground</Heading>
            <SubHeading className="">
              Real SQLite, compiled to WebAssembly, running entirely in your
              browser. Write joins, aggregates, subqueries — nothing touches a
              server, nothing is stored.
            </SubHeading>
          </div>
          <div className="screen-line-before mt-5 px-4 pt-6">
            <SchemaDiagram tables={TABLE_SCHEMAS} />
          </div>
        </>
      )}

      <div className="px-4">
        {!docs && (
          <SampleQueryList
            selectedQueryId={selectedQueryId}
            queries={SAMPLE_QUERIES}
            onSelect={q => {
              setSelectedQueryId(q.id);
              setSql(q.sql);
              setResult(null);
              setQueryError(null);
            }}
          />
        )}
        <div>
          <Card className="overflow-hidden px-0">
            {initError ? (
              <p className="text-destructive p-4 font-mono text-xs">
                Failed to load SQL engine: {initError}
              </p>
            ) : (
              <>
                <SqlEditor
                  value={sql}
                  onChange={setSql}
                  onRun={runQuery}
                  status={status}
                  isRunning={isRunning}
                />
                <ResultsPanel result={result} error={queryError} />
              </>
            )}
          </Card>
        </div>
      </div>
    </Section>
  );
}
