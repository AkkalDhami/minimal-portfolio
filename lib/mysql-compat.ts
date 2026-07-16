/**
 * sql.js runs SQLite, not MySQL — there is no real MySQL engine that
 * compiles to WASM for the browser. This module is a *best-effort* rewrite
 * of the common MySQL-isms people naturally type (from tutorials, dumps,
 * or muscle memory) into their closest SQLite equivalent, so the editor
 * doesn't choke on cosmetic dialect differences.
 *
 * It does NOT give real MySQL semantics. Things it can't fix:
 *  - stored procedures / triggers / events
 *  - MySQL-specific functions with no SQLite equivalent
 *  - UNSIGNED overflow / strict-mode type coercion behavior
 *  - full-text search, spatial types, JSON functions (SQLite's JSON1
 *    extension is different from MySQL's JSON functions)
 *  - multi-database concepts (sql.js is a single in-memory database, so
 *    SHOW DATABASES / USE db_name have no real meaning here)
 */

import type { Database } from "sql.js";

interface TranslateResult {
  sql: string;
  /** true if we changed something — useful for showing a "translated" hint in the UI */
  wasRewritten: boolean;
}

// --- MySQL client commands (not real SQL statements) -> SQLite equivalents ---
// These only match when they're the *entire* statement, so `ORDER BY x DESC`
// is untouched — only the MySQL CLI shorthand `DESC table_name` is rewritten.
const SHOW_TABLES_RE = /^SHOW\s+TABLES\s*;?\s*$/i;
const SHOW_DATABASES_RE = /^SHOW\s+DATABASES\s*;?\s*$/i;
const SHOW_COLUMNS_RE =
  /^SHOW\s+(?:FULL\s+)?COLUMNS\s+FROM\s+[`"]?(\w+)[`"]?\s*;?\s*$/i;
const DESCRIBE_RE = /^DESC(?:RIBE)?\s+[`"]?(\w+)[`"]?\s*;?\s*$/i;
const SHOW_CREATE_TABLE_RE =
  /^SHOW\s+CREATE\s+TABLE\s+[`"]?(\w+)[`"]?\s*;?\s*$/i;
const SHOW_INDEX_RE =
  /^SHOW\s+(?:INDEX|INDEXES|KEYS)\s+FROM\s+[`"]?(\w+)[`"]?\s*;?\s*$/i;

function translateClientCommand(trimmed: string): string | null {
  if (SHOW_TABLES_RE.test(trimmed)) {
    return `SELECT name AS "Tables" FROM sqlite_master WHERE type = 'table' AND name NOT LIKE 'sqlite_%' ORDER BY name;`;
  }
  if (SHOW_DATABASES_RE.test(trimmed)) {
    // sql.js is a single in-memory database — there's only ever one "database".
    return `SELECT 'main' AS "Database";`;
  }

  let m = trimmed.match(SHOW_COLUMNS_RE);
  if (m) return `PRAGMA table_info(${m[1]});`;

  m = trimmed.match(DESCRIBE_RE);
  if (m) return `PRAGMA table_info(${m[1]});`;

  m = trimmed.match(SHOW_CREATE_TABLE_RE);
  if (m) {
    return `SELECT sql AS "Create Table" FROM sqlite_master WHERE type = 'table' AND name = '${m[1]}';`;
  }

  m = trimmed.match(SHOW_INDEX_RE);
  if (m) return `PRAGMA index_list(${m[1]});`;

  return null;
}

export function translateMySqlToSqlite(input: string): TranslateResult {
  const trimmedInput = input.trim();

  // Client-shorthand commands are whole-statement rewrites — handle first
  // and bail out early rather than running the fragment-level regexes below.
  const commandRewrite = translateClientCommand(trimmedInput);
  if (commandRewrite) {
    return { sql: commandRewrite, wasRewritten: true };
  }

  let sql = input;
  const original = input;

  // --- Identifiers: `backticks` -> "double quotes" ---
  sql = sql.replace(/`([^`]+)`/g, '"$1"');

  // --- AUTO_INCREMENT column patterns ---
  // Handles both orders: "INT AUTO_INCREMENT PRIMARY KEY" and
  // "INT PRIMARY KEY AUTO_INCREMENT", with optional NOT NULL in between.
  sql = sql.replace(
    /\b(?:INT|INTEGER|BIGINT|SMALLINT|TINYINT)(?:\s*\(\s*\d+\s*\))?\s+(?:NOT\s+NULL\s+)?AUTO_INCREMENT\s+PRIMARY\s+KEY\b/gi,
    "INTEGER PRIMARY KEY AUTOINCREMENT"
  );
  sql = sql.replace(
    /\b(?:INT|INTEGER|BIGINT|SMALLINT|TINYINT)(?:\s*\(\s*\d+\s*\))?\s+PRIMARY\s+KEY\s+AUTO_INCREMENT\b/gi,
    "INTEGER PRIMARY KEY AUTOINCREMENT"
  );
  // Bare "AUTO_INCREMENT" with no PRIMARY KEY on the same clause (rare, but
  // SQLite requires INTEGER PRIMARY KEY for autoincrement to mean anything).
  sql = sql.replace(
    /\b(?:INT|INTEGER|BIGINT|SMALLINT|TINYINT)(?:\s*\(\s*\d+\s*\))?\s+AUTO_INCREMENT\b/gi,
    "INTEGER"
  );

  // --- Integer display widths: INT(11) -> INTEGER, TINYINT(1) -> INTEGER ---
  sql = sql.replace(
    /\b(INT|INTEGER|BIGINT|SMALLINT|TINYINT)\s*\(\s*\d+\s*\)/gi,
    "INTEGER"
  );

  // --- UNSIGNED / ZEROFILL have no SQLite meaning ---
  sql = sql.replace(/\bUNSIGNED\b/gi, "");
  sql = sql.replace(/\bZEROFILL\b/gi, "");

  // --- Common MySQL type aliases SQLite doesn't recognize by those exact names ---
  sql = sql.replace(/\bDATETIME\b/gi, "TEXT");
  sql = sql.replace(/\bDOUBLE\b/gi, "REAL");
  sql = sql.replace(/\bFLOAT\b/gi, "REAL");
  sql = sql.replace(/\bENUM\s*\([^)]*\)/gi, "TEXT");

  // --- ON UPDATE CURRENT_TIMESTAMP has no SQLite equivalent (needs a trigger) ---
  sql = sql.replace(/\s+ON\s+UPDATE\s+CURRENT_TIMESTAMP(?:\(\))?/gi, "");

  // --- Table options after the closing paren: ENGINE=InnoDB, CHARSET, COLLATE ---
  sql = sql.replace(
    /\)\s*(?:ENGINE\s*=\s*\w+|DEFAULT\s+CHARSET\s*=\s*\w+|COLLATE\s*=?\s*\w+|AUTO_INCREMENT\s*=\s*\d+)\s*;/gi,
    ");"
  );
  // In case multiple options are chained, strip any leftovers before the semicolon.
  sql = sql.replace(
    /\)\s*((?:ENGINE|DEFAULT\s+CHARSET|COLLATE|AUTO_INCREMENT)\s*=?\s*[\w]+\s*)+;/gi,
    ");"
  );

  // --- INSERT IGNORE -> INSERT OR IGNORE ---
  sql = sql.replace(/\bINSERT\s+IGNORE\s+INTO\b/gi, "INSERT OR IGNORE INTO");

  // --- Common functions ---
  sql = sql.replace(/\bNOW\s*\(\s*\)/gi, "CURRENT_TIMESTAMP");
  sql = sql.replace(/\bIFNULL\s*\(/gi, "IFNULL("); // same name in SQLite, no-op, kept for clarity

  return { sql, wasRewritten: sql !== original };
}

// --- Splits a comma-separated list at depth 0, respecting quotes/parens so
// commas inside string literals or nested function calls aren't treated as
// separators. Used to safely parse INSERT ... VALUES (...), (...) tuples. ---
function splitTopLevel(input: string, separator: string): string[] {
  const parts: string[] = [];
  let depth = 0;
  let inSingle = false;
  let inDouble = false;
  let current = "";

  for (let i = 0; i < input.length; i++) {
    const ch = input[i];

    if (inSingle) {
      current += ch;
      if (ch === "'" && input[i - 1] !== "\\") inSingle = false;
      continue;
    }
    if (inDouble) {
      current += ch;
      if (ch === '"' && input[i - 1] !== "\\") inDouble = false;
      continue;
    }
    if (ch === "'") {
      inSingle = true;
      current += ch;
      continue;
    }
    if (ch === '"') {
      inDouble = true;
      current += ch;
      continue;
    }
    if (ch === "(") {
      depth++;
      current += ch;
      continue;
    }
    if (ch === ")") {
      depth--;
      current += ch;
      continue;
    }
    if (ch === separator && depth === 0) {
      parts.push(current);
      current = "";
      continue;
    }
    current += ch;
  }
  parts.push(current);
  return parts;
}

const INSERT_VALUES_RE =
  /^INSERT\s+INTO\s+[`"]?(\w+)[`"]?\s*(\([^)]*\))?\s*VALUES\s*([\s\S]*?);?\s*$/i;

/**
 * MySQL allows a bare `DEFAULT` token inside a VALUES(...) tuple to mean
 * "use this column's default." SQLite has no equivalent syntax — its
 * `DEFAULT VALUES` form only covers an entire all-default row, not a single
 * column inside a tuple. There's no way to fix this with text rewriting
 * alone, since the correct substitution depends on the actual table schema
 * (each column's real default, or NULL for an autoincrementing primary key
 * so SQLite assigns the next rowid) — so this looks the schema up live via
 * PRAGMA table_info before rewriting.
 *
 * Only touches INSERT ... VALUES statements that actually contain a bare
 * DEFAULT token; everything else passes through untouched.
 */
export function resolveInsertDefaults(
  sql: string,
  db: Database | null
): string {
  if (!db) return sql;

  const trimmed = sql.trim();
  if (!/\bDEFAULT\b/i.test(trimmed)) return sql;

  const match = trimmed.match(INSERT_VALUES_RE);
  if (!match) return sql;

  const [, tableName, explicitColumnsRaw, valuesSection] = match;

  let columnInfo: { name: string; dfltValue: string | null; pk: number }[];
  try {
    const res = db.exec(`PRAGMA table_info("${tableName}");`);
    if (res.length === 0) return sql;
    const { columns, values } = res[0];
    const nameIdx = columns.indexOf("name");
    const dfltIdx = columns.indexOf("dflt_value");
    const pkIdx = columns.indexOf("pk");
    columnInfo = values.map(row => ({
      name: String(row[nameIdx]),
      dfltValue: row[dfltIdx] === null ? null : String(row[dfltIdx]),
      pk: Number(row[pkIdx])
    }));
  } catch {
    // Can't introspect the table (e.g. it doesn't exist) — let sql.js
    // surface its own error rather than failing silently here.
    return sql;
  }

  const orderedColumnNames = explicitColumnsRaw
    ? splitTopLevel(explicitColumnsRaw.slice(1, -1), ",").map(c =>
        c.trim().replace(/[`"]/g, "")
      )
    : columnInfo.map(c => c.name);

  const tuples = splitTopLevel(valuesSection, ",");

  const rewrittenTuples = tuples.map(rawTuple => {
    const tuple = rawTuple.trim();
    if (!tuple.startsWith("(") || !tuple.endsWith(")")) return rawTuple;

    const inner = tuple.slice(1, -1);
    const values = splitTopLevel(inner, ",");

    const rewritten = values.map((rawVal, i) => {
      const val = rawVal.trim();
      if (val.toUpperCase() !== "DEFAULT") return rawVal;

      const colName = orderedColumnNames[i];
      if (!colName) {
        throw new Error(
          `Could not resolve DEFAULT at position ${i + 1} in "${tableName}": ` +
            `the VALUES list has more entries (${values.length}) than the table has columns ` +
            `(${orderedColumnNames.length}). Check the column count matches.`
        );
      }

      const col = columnInfo.find(c => c.name === colName);
      if (!col) {
        throw new Error(
          `Could not resolve DEFAULT for column "${colName}" in "${tableName}" — ` +
            `no such column found via PRAGMA table_info. Check the table/column names match.`
        );
      }

      // Autoincrementing primary key: NULL tells SQLite to assign the next rowid.
      if (col.pk === 1) return " NULL";
      // Real column default from the schema, e.g. "0", "'active'", "CURRENT_TIMESTAMP".
      if (col.dfltValue !== null) return ` ${col.dfltValue}`;
      // No default defined — NULL is the closest fallback.
      return " NULL";
    });

    return `(${rewritten.join(",")})`;
  });

  return `INSERT INTO ${tableName}${explicitColumnsRaw ?? ""} VALUES ${rewrittenTuples.join(", ")};`;
}

const INSERT_ON_DUP_RE =
  /^INSERT\s+(?:OR\s+IGNORE\s+)?INTO\s+[`"]?(\w+)[`"]?\s*(\([^)]*\))?\s*VALUES\s*([\s\S]*?)\s*ON\s+DUPLICATE\s+KEY\s+UPDATE\s+([\s\S]*?);?\s*$/i;

/**
 * Finds the column(s) SQLite should treat as the conflict target for an
 * upsert: prefer a single explicit UNIQUE index (the usual target of
 * MySQL's "ON DUPLICATE KEY UPDATE"), falling back to the primary key.
 * MySQL doesn't require naming the key that collided — SQLite's ON CONFLICT
 * does — so this is a best-effort guess when there's exactly one reasonable
 * candidate.
 */
function findConflictColumns(db: Database, tableName: string): string[] | null {
  try {
    const indexListRes = db.exec(`PRAGMA index_list("${tableName}");`);
    if (indexListRes.length > 0) {
      const { columns, values } = indexListRes[0];
      const uniqueIdx = columns.indexOf("unique");
      const nameIdx = columns.indexOf("name");
      const originIdx = columns.indexOf("origin");
      const uniqueIndexes = values.filter(
        row => Number(row[uniqueIdx]) === 1 && row[originIdx] !== "pk"
      );
      if (uniqueIndexes.length === 1) {
        const idxName = String(uniqueIndexes[0][nameIdx]);
        const infoRes = db.exec(`PRAGMA index_info("${idxName}");`);
        if (infoRes.length > 0) {
          const colNameIdx = infoRes[0].columns.indexOf("name");
          return infoRes[0].values.map(r => String(r[colNameIdx]));
        }
      }
    }
  } catch {
    // fall through to primary key check below
  }

  try {
    const tableInfoRes = db.exec(`PRAGMA table_info("${tableName}");`);
    if (tableInfoRes.length > 0) {
      const { columns, values } = tableInfoRes[0];
      const nameIdx = columns.indexOf("name");
      const pkIdx = columns.indexOf("pk");
      const pkCols = values
        .filter(row => Number(row[pkIdx]) > 0)
        .map(row => String(row[nameIdx]));
      if (pkCols.length > 0) return pkCols;
    }
  } catch {
    // give up — caller will throw a clear error
  }

  return null;
}

/**
 * Rewrites MySQL's `INSERT ... ON DUPLICATE KEY UPDATE col = val, ...` into
 * SQLite's `INSERT ... ON CONFLICT(col) DO UPDATE SET col = val, ...`.
 * Also translates MySQL's `VALUES(col)` reference (meaning "the value that
 * would have been inserted") to SQLite's `excluded.col`, since that idiom
 * is extremely common in real ON DUPLICATE KEY UPDATE clauses.
 *
 * Requires a live db connection to find a conflict target column — if none
 * can be determined automatically, throws a clear error rather than
 * producing SQL that silently does the wrong thing.
 */
export function resolveOnDuplicateKeyUpdate(
  sql: string,
  db: Database | null
): string {
  if (!db) return sql;

  const trimmed = sql.trim();
  if (!/\bON\s+DUPLICATE\s+KEY\s+UPDATE\b/i.test(trimmed)) return sql;

  const match = trimmed.match(INSERT_ON_DUP_RE);
  if (!match) return sql;

  const [, tableName, explicitColumnsRaw, valuesSection, updateAssignments] =
    match;

  const conflictColumns = findConflictColumns(db, tableName);
  if (!conflictColumns || conflictColumns.length === 0) {
    throw new Error(
      `Could not translate ON DUPLICATE KEY UPDATE for "${tableName}": SQLite's upsert ` +
        `syntax needs an explicit unique/primary key column to detect conflicts, and none ` +
        `could be found automatically. Add a UNIQUE constraint or PRIMARY KEY to "${tableName}", ` +
        `or rewrite the query using SQLite's own ON CONFLICT(col) DO UPDATE SET ... syntax directly.`
    );
  }

  const translatedAssignments = updateAssignments.replace(
    /\bVALUES\s*\(\s*[`"]?(\w+)[`"]?\s*\)/gi,
    "excluded.$1"
  );

  return (
    `INSERT INTO ${tableName}${explicitColumnsRaw ?? ""} VALUES ${valuesSection.trim()} ` +
    `ON CONFLICT(${conflictColumns.join(", ")}) DO UPDATE SET ${translatedAssignments.trim()};`
  );
}
