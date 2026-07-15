import type { SampleQuery, TableSchema } from "@/types/sql-playground.types";

export const SCHEMA_SQL = `
  CREATE TABLE departments (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    budget INTEGER
  );

  CREATE TABLE employees (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    department_id INTEGER,
    salary INTEGER,
    hire_date TEXT,
    FOREIGN KEY (department_id) REFERENCES departments(id)
  );
`;

export const SEED_SQL = `
  INSERT INTO departments (id, name, budget) VALUES
    (1, 'Engineering', 850000),
    (2, 'Design', 320000),
    (3, 'Sales', 460000),
    (4, 'Marketing', 280000);

  INSERT INTO employees (id, name, department_id, salary, hire_date) VALUES
    (1, 'Priya Sharma', 1, 118000, '2021-03-14'),
    (2, 'Marcus Chen', 1, 132000, '2019-07-01'),
    (3, 'Elena Vasquez', 1, 121000, '2022-11-08'),
    (4, 'Noah Bekele', 2, 96000, '2020-05-19'),
    (5, 'Aiko Tanaka', 2, 101000, '2023-01-10'),
    (6, 'Liam O''Connor', 3, 88000, '2018-09-23'),
    (7, 'Fatima Rahman', 3, 92000, '2021-06-30'),
    (8, 'Diego Fernandez', 3, 85000, '2022-02-14'),
    (9, 'Grace Adeyemi', 4, 78000, '2020-10-05'),
    (10, 'Oliver Kim', 1, 145000, '2017-04-11');
`;

export const TABLE_SCHEMAS: TableSchema[] = [
  {
    name: "departments",
    columns: [
      { name: "id", isPrimaryKey: true },
      { name: "name" },
      { name: "budget" }
    ]
  },
  {
    name: "employees",
    columns: [
      { name: "id", isPrimaryKey: true },
      { name: "name" },
      { name: "department_id" },
      { name: "salary" },
      { name: "hire_date" }
    ]
  }
];

export const DEFAULT_QUERY = `SELECT
d.name AS department,
COUNT(e.id) AS headcount,
ROUND(AVG(e.salary), 0) AS avg_salary

FROM employees e
JOIN departments d ON e.department_id = d.id
GROUP BY d.name
ORDER BY avg_salary DESC;`;

export const SAMPLE_QUERIES: SampleQuery[] = [
  {
    id: "select",
    label: "Select all",
    description: "Basic SELECT",
    sql: "SELECT * FROM employees;"
  },
  {
    id: "join",
    label: "Join tables",
    description: "INNER JOIN",
    sql: `SELECT e.name AS employee, d.name AS department, e.salary
FROM employees e
JOIN departments d ON e.department_id = d.id
ORDER BY e.salary DESC;`
  },
  {
    id: "aggregate",
    label: "Group + average",
    description: "GROUP BY, AVG",
    sql: DEFAULT_QUERY
  },
  {
    id: "subquery",
    label: "Subquery",
    description: "Correlated filter",
    sql: `SELECT name, salary
FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);`
  },
  {
    id: "having",
    label: "Having filter",
    description: "GROUP BY + HAVING",
    sql: `SELECT d.name AS department, COUNT(*) AS headcount
FROM employees e
JOIN departments d ON e.department_id = d.id
GROUP BY d.name
HAVING COUNT(*) >= 2;`
  }
];
