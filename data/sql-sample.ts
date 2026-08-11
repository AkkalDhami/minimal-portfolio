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
    (10, 'Oliver Kim', 1, 145000, '2017-04-11'),
    (11, 'Lily Li', 2, 100000, '2023-08-15');
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

export const BOOKS_TABLE_SCHEMA: TableSchema[] = [
  {
    name: "books",
    columns: [
      { name: "id", isPrimaryKey: true },
      { name: "title" },
      { name: "author" },
      { name: "genre" },
      { name: "price" },
      { name: "published_year" },
      { name: "in_stock" }
    ]
  }
];

export const BOOKS_TABLE_SCHEMA_SQL = `CREATE TABLE books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255),
    genre VARCHAR(100),
    price DECIMAL(6,2),
    published_year INT,
    in_stock BOOLEAN DEFAULT TRUE
);`;

export const BOOKS_TABLE_SEED_SQL = `INSERT INTO books (title, author, genre, price, published_year, in_stock) VALUES
('Dune', 'Frank Herbert', 'Sci-Fi', 15.50, 1965, TRUE),
('1984', 'George Orwell', 'Dystopian', 9.99, 1949, TRUE),
('Animal Farm', 'George Orwell', 'Satire', 7.50, 1945, FALSE),
('Brave New World', 'Aldous Huxley', 'Dystopian', 10.25, 1932, TRUE),
('Foundation', 'Isaac Asimov', 'Sci-Fi', 12.00, 1951, FALSE);
`;

export const BOOKS_TABLE_QUERIES: SampleQuery[] = [
  {
    id: "count",
    label: "1. Count all books",
    sql: `SELECT COUNT(*) as total_books
FROM books;`
  },
  {
    id: "total_value",
    label: "2. Total price of all books",
    sql: `SELECT SUM(price) as total_price
FROM books;`
  },
  {
    id: "avg_price",
    label: "3. Average price of all books",
    sql: `SELECT AVG(price) as avg_price
FROM books;`
  },
  {
    id: "cheapest_price",
    label: "4. Cheapest book's price.",
    sql: `SELECT MIN(price) as cheapest_price
FROM books;`
  },
  {
    id: "most_expensive_price",
    label: "5. Most expensive book's price.",
    sql: `SELECT MAX(price) as most_expensive_price
FROM books;`
  },
  {
    id: "in_stock",
    label: "6. Number of books in stock.",
    sql: `SELECT COUNT(*) as in_stock_books
FROM books
WHERE in_stock = TRUE;`
  },
  {
    id: "genre_books",
    label: "7. Number of books per genre.",
    sql: `SELECT genre, COUNT(*) as no_of_books
FROM books
GROUP BY genre;`
  },
  {
    id: "author",
    label: "8. Average price per author.",
    sql: `SELECT author, AVG(price) as avg_price
FROM books
GROUP BY author;`
  },
  {
    id: "genre",
    label: "9. Total price per genre.",
    sql: `SELECT genre, SUM(price) as total_price
FROM books
GROUP BY genre;`
  },
  {
    id: "earliest_latest_year",
    label: "10. Earliest & Latest published year per author.",
    sql: `SELECT author, MIN(published_year) AS earliest, MAX(published_year) AS latest
FROM books
GROUP BY author;`
  },
  {
    id: "exact_books",
    label: "11. Genres with exactly 2 books.",
    sql: `SELECT genre, COUNT(*) as no_of_books
FROM books
GROUP BY genre
HAVING no_of_books = 2;`
  },
  {
    id: "avg_price_filter",
    label: "12. Authors with average price greater than 12.",
    sql: `SELECT author, AVG(price) as avg_price
FROM books
GROUP BY author
HAVING avg_price > 12;`
  },
  {
    id: "in_stock_filter",
    label: "13. Genres with number of books in stock greater than 1.",
    sql: `SELECT genre, COUNT(*) as no_of_books
FROM books
WHERE in_stock = TRUE
GROUP BY genre;`
  },
  {
    id: "total_price_filter",
    label: "14. Genres with total price greater than 20.",
    sql: `SELECT genre, SUM(price) AS total_price
FROM books
GROUP BY genre
HAVING SUM(price) > 20;`
  }
];
