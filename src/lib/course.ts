export type Course = {
  id: number;               // unique identifier for the course
  title: string;            // course title
  description: string;      // short description
  level: 'Beginner' | 'Intermediate' | 'Advanced'; // course difficulty
  creationDate: string;
  durationHours: number;    // approximate duration in hours
  tags: string[];           // ex: javascript, react, programming, etc...
};

export const courses: Course[] = [
  {
    id: 1,
    title: "Mastering JavaScript Fundamentals",
    description: "Learn the core concepts of JavaScript and start building interactive web applications from scratch.",
    level: "Beginner",
    creationDate: "2025-03-15",
    durationHours: 18,
    tags: ["javascript", "web development", "frontend"]
  },
  {
    id: 2,
    title: "React in Practice",
    description: "A hands-on guide to building modern React applications with hooks, context, and best practices.",
    level: "Intermediate",
    creationDate: "2025-05-10",
    durationHours: 22,
    tags: ["react", "javascript", "frontend"]
  },
  {
    id: 3,
    title: "Advanced Node.js and Backend Architecture",
    description: "Deep dive into Node.js, creating scalable backend systems, REST APIs, and working with databases efficiently.",
    level: "Advanced",
    creationDate: "2025-02-28",
    durationHours: 30,
    tags: ["node.js", "backend", "api", "databases"]
  },
  {
    id: 4,
    title: "CSS Grid and Flexbox Mastery",
    description: "Learn modern CSS layout techniques to build responsive and visually appealing websites.",
    level: "Beginner",
    creationDate: "2025-04-05",
    durationHours: 12,
    tags: ["css", "frontend", "web design"]
  },
  {
    id: 5,
    title: "TypeScript for Professional Developers",
    description: "Enhance your JavaScript skills with TypeScript and write safer, more maintainable code in large projects.",
    level: "Intermediate",
    creationDate: "2025-06-20",
    durationHours: 20,
    tags: ["typescript", "javascript", "programming"]
  }
];
