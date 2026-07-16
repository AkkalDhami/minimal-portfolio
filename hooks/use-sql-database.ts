"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Database } from "sql.js";
import type { EngineStatus, QueryResult } from "@/types/sql-playground.types";
import { SCHEMA_SQL, SEED_SQL } from "@/data/sql-sample";
import {
  translateMySqlToSqlite,
  resolveInsertDefaults
} from "@/lib/mysql-compat";

// Served from /public — see package.json's "postinstall" script, which copies
// this file from node_modules/sql.js/dist on every `npm install`.
const WASM_PATH = "/playground/sql-wasm.wasm";

interface UseSqlDatabaseReturn {
  status: EngineStatus;
  initError: string | null;
  execute: (sql: string) => QueryResult;
  lastError: string | null;
}

/**
 * Loads SQLite compiled to WebAssembly (sql.js), seeds an in-memory demo
 * schema, and exposes a synchronous `execute` function for running
 * arbitrary SQL entirely client-side. Nothing here touches a server.
 */
export function useSqlDatabase(): UseSqlDatabaseReturn {
  const dbRef = useRef<Database | null>(null);
  const [status, setStatus] = useState<EngineStatus>("loading");
  const [initError, setInitError] = useState<string | null>(null);
  const [lastError, setLastError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function boot() {
      try {
        const initSqlJs = (await import("sql.js")).default;
        const SQL = await initSqlJs({
          locateFile: () => WASM_PATH
        });

        if (cancelled) return;

        const db = new SQL.Database();
        db.run(translateMySqlToSqlite(SCHEMA_SQL).sql);
        db.run(translateMySqlToSqlite(SEED_SQL).sql);

        dbRef.current = db;
        setStatus("ready");
      } catch (err) {
        if (cancelled) return;
        setInitError(
          err instanceof Error ? err.message : "Failed to load SQL engine."
        );
        setStatus("error");
      }
    }

    boot();

    return () => {
      cancelled = true;
      dbRef.current?.close();
    };
  }, []);

  const execute = useCallback((sql: string): QueryResult => {
    if (!dbRef.current) {
      throw new Error("Database is not ready yet.");
    }

    // 1. Rewrite common MySQL syntax (AUTO_INCREMENT, backticks, SHOW/DESC, ...)
    const { sql: translated, wasRewritten } = translateMySqlToSqlite(sql);

    const start = performance.now();
    let results: ReturnType<Database["exec"]>;
    try {
      // 2. Resolve bare `DEFAULT` tokens inside INSERT VALUES tuples against
      //    the live schema — done here, inside the try, so a resolution
      //    failure (e.g. column-count mismatch) surfaces the same way a
      //    SQL error would, instead of throwing somewhere the caller isn't
      //    expecting.
      const finalSql = resolveInsertDefaults(translated, dbRef.current);
      results = dbRef.current.exec(finalSql);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Query failed.";
      setLastError(message);
      throw new Error(
        wasRewritten
          ? `${message}\n\n(Note: some MySQL syntax in your query was auto-translated to SQLite before running — the error above refers to the translated version.)`
          : message
      );
    }
    const elapsedMs = performance.now() - start;

    if (results.length === 0) {
      setLastError(null);
      return { columns: [], rows: [], elapsedMs, rowCount: 0 };
    }

    const { columns, values } = results[0];
    setLastError(null);
    return { columns, rows: values, elapsedMs, rowCount: values.length };
  }, []);

  return { status, initError, execute, lastError };
}
