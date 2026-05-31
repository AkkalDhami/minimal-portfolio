import { IPlaybook } from "@/types/app.types";

export const PLAYBOOK_DATA = [
  {
    slug: "rest-api-basic",
    title: "01. REST API Design Principles",
    description:
      "REST API design principles are guidelines used to build scalable, maintainable, and predictable APIs.",
    docs: "/docs/playbook/rest-api-basic"
  },
  {
    slug: "http-status-codes",
    title: "02. HTTP Methods and Status Codes",
    description:
      "HTTP methods define what action the client wants to perform on a resource, while HTTP status codes indicate the result of that action.",
    docs: "/docs/playbook/http-status-codes"
  },
  {
    slug: "backend-fundamentals-01",
    title: "03. Backend Fundamentals: 01",
    description:
      "Backend fundamentals encompass the core concepts and technologies that form the foundation of backend development, including server architecture, databases, APIs, and security.",
    docs: "/docs/playbook/backend-fundamentals-01"
  },
  {
    slug: "backend-fundamentals-02",
    title: "04. Backend Fundamentals: 02",
    description:
      "Backend fundamentals encompass the core concepts and technologies that form the foundation of backend development, including server architecture, databases, APIs, and security.",
    docs: "/docs/playbook/backend-fundamentals-02"
  },
  {
    slug: "github-oauth",
    title: "05. GitHub OAuth",
    description:
      "An end-to-end GitHub OAuth flow designed for scalable backend systems.",
    docs: "/docs/playbook/github-oauth"
  },
  {
    slug: "google-oauth",
    title: "06. Google OAuth",
    description:
      "An end-to-end Google OAuth flow designed for scalable backend systems.",
    docs: "/docs/playbook/google-oauth"
  },
  {
    slug: "mongodb-aggregation",
    title: "07. MongoDB Aggregation",
    description:
      "MongoDB aggregation is a feature that allows you to perform complex data transformations and analysis on your MongoDB collections.",
    docs: "/docs/playbook/mongodb-aggregation"
  },
  {
    slug: "yaml",
    title: "08. Introduction to YAML",
    description:
      "Learn YAML fundamentals including syntax, objects, arrays, nesting, and real-world configuration examples.",
    docs: "/docs/playbook/yaml"
  },
  {
    slug: "normalization",
    title: "09. Basics Concepts of Normalization",
    description:
      "Learn database normalization concepts including 1NF, 2NF, 3NF, BCNF, and common use cases.",
    docs: "/docs/playbook/normalization"
  }
] satisfies IPlaybook[];
