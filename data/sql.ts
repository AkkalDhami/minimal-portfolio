import { IModule } from "@/types/app.types";
import { createModules } from "@/utils/networking";
import { IconDatabase, IconDatabaseEdit } from "@tabler/icons-react";

export const SQL_DATA: IModule[] = createModules([
  {
    slug: "module-01",
    title: "Module 01 - Database Theory",
    description:
      "Core database and DBMS concepts you should know before writing any SQL.",
    docs: "/docs/sql/module-01",
    icon: IconDatabase,
    topics: [
      {
        slug: "intro",
        title: "Introduction to Databases",
        docs: "/intro",
        description:
          "Core theory before hands-on work: databases, DBMS, SQL, MySQL, and key concepts."
      },
      {
        slug: "dbms-concepts",
        title: "DBMS Theory Concepts",
        docs: "/dbms-concepts",
        description:
          "Relational vs non-relational, keys, normalization, ACID, and schema design basics."
      },
      {
        slug: "types-of-keys",
        title: "Types of Keys",
        docs: "/types-of-keys",
        description:
          "Primary, foreign, candidate, unique, composite, super, alternate, and surrogate keys explained."
      },

      {
        slug: "db-relationships",
        title: "Database Relationships",
        docs: "/db-relationships",
        description:
          "One-to-one, one-to-many, many-to-many relationships and how keys model them."
      },
      {
        slug: "dbms-interview-questions",
        title: "DBMS Interview Questions",
        docs: "/dbms-interview-questions",
        description:
          "Commonly asked DBMS theory questions and simple, clear answers for interviews."
      }
    ]
  },

  {
    slug: "module-02",
    title: "Module 02 - CRUD Operations",
    description: "Create, read, update, and delete data in a table.",
    docs: "/docs/sql/module-02",
    icon: IconDatabaseEdit,
    topics: [
      {
        slug: "create",
        title: "Create - INSERT",
        docs: "/create",
        description:
          "Add new rows to a MySQL table with INSERT, including bulk inserts."
      },
      {
        slug: "select",
        title: "Read - SELECT",
        docs: "/select",
        description: "Query rows with SELECT, WHERE, ORDER BY, and LIMIT."
      },
      {
        slug: "update",
        title: "Update - UPDATE",
        docs: "/update",
        description: "Modify existing rows safely with UPDATE and WHERE."
      },
      {
        slug: "delete",
        title: "Delete - DELETE",
        docs: "/delete",
        description: "Remove rows safely with DELETE and WHERE."
      },
      {
        slug: "alter",
        title: "Alter - ALTER TABLE",
        docs: "/alter",
        description:
          "Change a table's structure: add, modify, rename, or drop columns."
      }
    ]
  },

  {
    slug: "module-03",
    title: "Module 03 - Querying",
    description: "Combine and filter data across tables.",
    docs: "/docs/sql/module-03",
    icon: IconDatabaseEdit,
    topics: [
      {
        slug: "joins",
        title: "Joins",
        docs: "/joins",
        description:
          "Combine rows from multiple tables with INNER, LEFT, and RIGHT joins."
      },
      {
        slug: "filtering-and-sorting",
        title: "Filtering and sorting",
        docs: "/filtering-and-sorting",
        description: "WHERE, ORDER BY, LIMIT, and combining conditions."
      },
      {
        slug: "filtering-and-sorting-practice",
        title: "Practice - Filtering and Sorting",
        docs: "/filtering-and-sorting-practice",
        description:
          "Exercises to test WHERE, AND/OR, BETWEEN, IN, NULL handling, and ORDER BY."
      },
      {
        slug: "aggregate-functions",
        title: "Aggregate functions",
        docs: "/aggregate-functions",
        description: "COUNT, SUM, AVG, GROUP BY, and HAVING."
      },
      {
        slug: "aggregate-functions-practice",
        title: "Practice - Aggregate Functions",
        docs: "/aggregate-functions-practice",
        description: "Exercises to test aggregate functions."
      }
    ]
  }
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
