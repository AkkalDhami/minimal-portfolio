export type IDSA = {
  slug: string;
  title: string;
  description: string;
  docs: string;
};

export const DSA_DATA: IDSA[] = [
  {
    slug: "intro",
    title: "01. Introduction to Data Structures & Algorithms",
    description:
      "Learn the basics of data structures and algorithms with this introduction.",
    docs: "/docs/dsa/intro"
  },
  {
    slug: "cpp-intro",
    title: "02. Introduction to C++",
    description:
      "Learn the basics of C++. Variables, Data types, Control flow, and operators, etc.",
    docs: "/docs/dsa/cpp-intro"
  },
  {
    slug: "pattern-printing",
    title: "03. Pattern Printing",
    description: "Learn to print patterns in C++.",
    docs: "/docs/dsa/pattern-printing"
  },
  {
    slug: "no-system-conversion",
    title: "04. Number System Conversion",
    description: "Learn about converting between different number systems.",
    docs: "/docs/dsa/no-system-conversion"
  },
  {
    slug: "arrays",
    title: "05. Basic Arrays Problems",
    description: "Solve basic arrays problems.",
    docs: "/docs/dsa/arrays"
  }
];
