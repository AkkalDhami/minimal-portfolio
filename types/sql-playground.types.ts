export type EngineStatus = "loading" | "ready" | "error";

export interface QueryResult {
  columns: string[];
  rows: unknown[][];
  elapsedMs: number;
  rowCount: number;
}

export interface QueryError {
  message: string;
}

export interface SampleQuery {
  id: string;
  label: string;
  description?: string;
  sql: string;
}

export interface TableColumn {
  name: string;
  isPrimaryKey?: boolean;
}

export interface TableSchema {
  name: string;
  columns: TableColumn[];
}
