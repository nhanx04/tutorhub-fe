import type { Book } from "src/types/library";

export const BOOKS: Book[] = [
  {
    id: "intro-to-algo",
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen",
    description:
      "A comprehensive textbook on computer algorithms. Covers fundamental algorithms and data structures with detailed analysis.",
  },
  {
    id: "clean-code",
    title: "Clean Code",
    author: "Robert C. Martin",
    description:
      "A handbook of agile software craftsmanship. Learn how to write clean, maintainable code that stands the test of time.",
  },
  {
    id: "design-patterns",
    title: "Design Patterns",
    author: "Erich Gamma",
    description:
      "Elements of reusable object-oriented software. Essential reading for understanding software design patterns.",
  },
  {
    id: "pragmatic-programmer",
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt",
    description:
      "Your journey to mastery. Practical advice for software developers on all aspects of the craft. A timeless guide to programming excellence.",
  },
  {
    id: "refactoring",
    title: "Refactoring",
    author: "Martin Fowler",
    description:
      "A detailed exploration of improving existing code through small, systematic changes to enhance readability, structure, and performance.",
  },
  {
    id: "computer-networks",
    title: "Computer Networks",
    author: "Andrew S. Tanenbaum",
    description:
      "A comprehensive introduction to computer networks, from physical layer to application layer protocols.",
  },
];
