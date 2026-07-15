import { IModule } from "@/types/app.types";
import { createModules } from "@/utils/networking";
import { IconSql } from "@tabler/icons-react";

export const SQL_DATA: IModule[] = createModules([
  // {
  //   slug: "module-00",
  //   title: "Module 00 - Setup and Basics",
  //   description:
  //     "Get a database running locally and understand the core mental model.",
  //   docs: "/docs/sql/module-00",
  //   icon: IconSql,
  //   topics: [
  //     {
  //       slug: "setup-mysql",
  //       title: "Setup MySQL (Docker Compose edition)",
  //       docs: "/docs/sql/module-00/setup-mysql",
  //       description:
  //         "Run MySQL locally with Docker Compose, connect via CLI and VS Code."
  //     },
  //     {
  //       slug: "docker-volumes",
  //       title: "Understanding Docker volumes",
  //       docs: "/docs/sql/module-00/docker-volumes",
  //       description:
  //         "Why volumes matter and how they keep your data safe across restarts."
  //     },
  //     {
  //       slug: "vscode-query-runner",
  //       title: "Running queries in VS Code",
  //       docs: "/docs/sql/module-00/vscode-query-runner",
  //       description:
  //         "Set up SQLTools to connect and run queries directly from your editor."
  //     }
  //   ]
  // },
  {
    slug: "module-01",
    title: "Module 01 - CRUD Operations",
    description: "Create, read, update, and delete data in a table.",
    docs: "/docs/sql/module-01",
    icon: IconSql,
    topics: [
      {
        slug: "create",
        title: "Create - INSERT",
        docs: "/create",
        description:
          "Add new rows to a MySQL table with INSERT, including bulk inserts."
      },
      {
        slug: "read",
        title: "Read - SELECT",
        docs: "/read",
        description: "Query rows with SELECT, WHERE, ORDER BY, and LIMIT."
      },
      {
        slug: "update",
        title: "Update - UPDATE",
        docs: "/docs/sql/module-01/update",
        description: "Modify existing rows safely with UPDATE and WHERE."
      },
      {
        slug: "delete",
        title: "Delete - DELETE",
        docs: "/delete",
        description: "Remove rows safely with DELETE and WHERE."
      }
    ]
  }

  // {
  //   slug: "module-02",
  //   title: "Module 02 - Querying",
  //   description: "Combine and filter data across tables.",
  //   docs: "/docs/sql/module-02",
  //   icon: IconSql,
  //   topics: [
  //     {
  //       slug: "joins",
  //       title: "Joins",
  //       docs: "/docs/sql/module-02/joins",
  //       description:
  //         "Combine rows from multiple tables with INNER, LEFT, and RIGHT joins."
  //     },
  //     {
  //       slug: "filtering",
  //       title: "Filtering and sorting",
  //       docs: "/docs/sql/module-02/filtering",
  //       description: "WHERE, ORDER BY, LIMIT, and combining conditions."
  //     },
  //     {
  //       slug: "aggregates",
  //       title: "Aggregate functions",
  //       docs: "/docs/sql/module-02/aggregates",
  //       description: "COUNT, SUM, AVG, GROUP BY, and HAVING."
  //     }
  //   ]
  // },
  // {
  //   slug: "module-03",
  //   title: "Module 03 - Data Integrity",
  //   description: "Keep your data consistent and reliable.",
  //   docs: "/docs/sql/module-03",
  //   icon: IconSql,
  //   topics: [
  //     {
  //       slug: "constraints-and-keys",
  //       title: "Constraints and keys",
  //       docs: "/docs/sql/module-03/constraints-and-keys",
  //       description: "Primary keys, foreign keys, unique and check constraints."
  //     },
  //     {
  //       slug: "transactions",
  //       title: "Transactions",
  //       docs: "/docs/sql/module-03/transactions",
  //       description:
  //         "START TRANSACTION, COMMIT, ROLLBACK, and why atomicity matters."
  //     }
  //   ]
  // },
  // {
  //   slug: "module-04",
  //   title: "Module 04 - Performance",
  //   description: "Make queries fast as data grows.",
  //   docs: "/docs/sql/module-04",
  //   icon: IconSql,
  //   topics: [
  //     {
  //       slug: "indexes",
  //       title: "Indexes",
  //       docs: "/docs/sql/module-04/indexes",
  //       description: "How indexes speed up lookups and when to use them."
  //     },
  //     {
  //       slug: "query-planning",
  //       title: "Query planning",
  //       docs: "/docs/sql/module-04/query-planning",
  //       description: "Reading EXPLAIN output to understand how queries execute."
  //     }
  //   ]
  // },
  // {
  //   slug: "module-05",
  //   title: "Module 05 - Advanced Features",
  //   description: "Go beyond basic tables and queries.",
  //   docs: "/docs/sql/module-05",
  //   icon: IconSql,
  //   topics: [
  //     {
  //       slug: "json-columns",
  //       title: "JSON columns",
  //       docs: "/docs/sql/module-05/json-columns",
  //       description: "Storing and querying semi-structured data."
  //     },
  //     {
  //       slug: "views-and-functions",
  //       title: "Views and functions",
  //       docs: "/docs/sql/module-05/views-and-functions",
  //       description: "Reusable queries and custom logic inside the database."
  //     },
  //     {
  //       slug: "triggers",
  //       title: "Triggers",
  //       docs: "/docs/sql/module-05/triggers",
  //       description: "Running logic automatically in response to data changes."
  //     }
  //   ]
  // }
]);
