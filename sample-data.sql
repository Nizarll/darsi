-- Sample Data Queries for Darsi Platform
-- This file contains sample INSERT queries for testing the application
-- Run these queries against your SQLite database (local.db)

-- =====================================================
-- SAMPLE USERS
-- =====================================================
-- Note: Passwords should be hashed with bcrypt in production
-- These are example queries - actual password hashing happens in the backend

-- Sample Teacher User
-- Username: teacher1, Password: password123 (would be hashed)
-- INSERT INTO users (username, password, role) VALUES ('teacher1', '$2b$10$...', 'teacher');

-- Sample Student User
-- Username: student1, Password: password123 (would be hashed)
-- INSERT INTO users (username, password, role) VALUES ('student1', '$2b$10$...', 'student');

-- =====================================================
-- SAMPLE COURSES
-- =====================================================

INSERT INTO courses (title, description, content) VALUES
('Introduction to JavaScript',
 'Learn the fundamentals of JavaScript programming language',
 'This comprehensive course covers JavaScript basics including variables, functions, objects, and modern ES6+ features.');

INSERT INTO courses (title, description, content) VALUES
('Web Development with React',
 'Build modern web applications using React framework',
 'Master React fundamentals, hooks, state management, and build real-world applications.');

INSERT INTO courses (title, description, content) VALUES
('Database Design and SQL',
 'Learn database modeling and SQL query language',
 'Understand relational databases, normalization, and write complex SQL queries.');

INSERT INTO courses (title, description, content) VALUES
('Python for Data Science',
 'Introduction to Python programming for data analysis',
 'Learn Python basics, pandas, numpy, and data visualization techniques.');

INSERT INTO courses (title, description, content) VALUES
('Advanced TypeScript',
 'Master TypeScript for large-scale applications',
 'Deep dive into TypeScript generics, decorators, and advanced type system features.');

-- =====================================================
-- SAMPLE CHAPTERS (for course_id = 1: JavaScript)
-- =====================================================

INSERT INTO chapters (course_id, title, description, content) VALUES
(1, 'Variables and Data Types',
 'Understanding JavaScript variables and primitive types',
 'Learn about var, let, const, and different data types: strings, numbers, booleans, null, undefined, and symbols.');

INSERT INTO chapters (course_id, title, description, content) VALUES
(1, 'Functions and Scope',
 'Mastering JavaScript functions',
 'Explore function declarations, expressions, arrow functions, closures, and scope chain.');

INSERT INTO chapters (course_id, title, description, content) VALUES
(1, 'Arrays and Objects',
 'Working with JavaScript data structures',
 'Learn array methods, object manipulation, destructuring, and spread operator.');

INSERT INTO chapters (course_id, title, description, content) VALUES
(1, 'Asynchronous JavaScript',
 'Handling async operations',
 'Master callbacks, promises, async/await, and the event loop.');

-- =====================================================
-- SAMPLE CHAPTERS (for course_id = 2: React)
-- =====================================================

INSERT INTO chapters (course_id, title, description, content) VALUES
(2, 'React Fundamentals',
 'Getting started with React',
 'Learn about components, JSX, props, and the virtual DOM.');

INSERT INTO chapters (course_id, title, description, content) VALUES
(2, 'State and Hooks',
 'Managing component state',
 'Master useState, useEffect, and other built-in React hooks.');

INSERT INTO chapters (course_id, title, description, content) VALUES
(2, 'React Router',
 'Building single-page applications',
 'Implement routing, navigation, and dynamic pages in React.');

-- =====================================================
-- SAMPLE QUIZZES
-- =====================================================

-- Quiz 1: JavaScript Basics
INSERT INTO quizzes (title, description, content, options, valid_options) VALUES
('JavaScript Variables Quiz',
 'Test your knowledge of JavaScript variables and scope',
 'Which keyword should you use to declare a variable that cannot be reassigned?',
 '["var", "let", "const", "function"]',
 '["const"]');

-- Quiz 2: JavaScript Functions
INSERT INTO quizzes (title, description, content, options, valid_options) VALUES
('JavaScript Functions Quiz',
 'Test your understanding of JavaScript functions',
 'What is the correct way to define an arrow function in JavaScript?',
 '["function myFunc() {}", "const myFunc = () => {}", "def myFunc():", "var myFunc => {}"]',
 '["const myFunc = () => {}"]');

-- Quiz 3: JavaScript Arrays
INSERT INTO quizzes (title, description, content, options, valid_options) VALUES
('JavaScript Arrays Quiz',
 'Test your knowledge of array methods',
 'Which array method is used to transform each element and return a new array?',
 '["forEach()", "filter()", "map()", "reduce()"]',
 '["map()"]');

-- Quiz 4: React Basics
INSERT INTO quizzes (title, description, content, options, valid_options) VALUES
('React Fundamentals Quiz',
 'Test your React knowledge',
 'What is JSX?',
 '["A JavaScript library", "JavaScript XML syntax extension", "A CSS framework", "A database query language"]',
 '["JavaScript XML syntax extension"]');

-- Quiz 5: React Hooks
INSERT INTO quizzes (title, description, content, options, valid_options) VALUES
('React Hooks Quiz',
 'Test your understanding of React hooks',
 'Which hook is used to perform side effects in function components?',
 '["useState", "useEffect", "useContext", "useReducer"]',
 '["useEffect"]');

-- Quiz 6: TypeScript
INSERT INTO quizzes (title, description, content, options, valid_options) VALUES
('TypeScript Basics Quiz',
 'Test your TypeScript knowledge',
 'What is the main purpose of TypeScript?',
 '["To replace JavaScript", "To add static typing to JavaScript", "To make code run faster", "To create mobile apps"]',
 '["To add static typing to JavaScript"]');

-- Quiz 7: Web Development (Multiple Correct Answers)
INSERT INTO quizzes (title, description, content, options, valid_options) VALUES
('Web Development Tools Quiz',
 'Identify common web development tools',
 'Which of the following are JavaScript frameworks/libraries? (Select all that apply)',
 '["React", "Django", "Vue", "Flask", "Angular", "Ruby on Rails"]',
 '["React", "Vue", "Angular"]');

-- Quiz 8: CSS Basics
INSERT INTO quizzes (title, description, content, options, valid_options) VALUES
('CSS Fundamentals Quiz',
 'Test your CSS knowledge',
 'Which CSS property is used to change the text color?',
 '["color", "text-color", "font-color", "text-style"]',
 '["color"]');

-- Quiz 9: HTTP Methods
INSERT INTO quizzes (title, description, content, options, valid_options) VALUES
('HTTP Methods Quiz',
 'Understanding RESTful APIs',
 'Which HTTP method is used to retrieve data from a server?',
 '["POST", "PUT", "GET", "DELETE"]',
 '["GET"]');

-- Quiz 10: Database Concepts
INSERT INTO quizzes (title, description, content, options, valid_options) VALUES
('SQL Fundamentals Quiz',
 'Test your SQL knowledge',
 'Which SQL clause is used to filter records?',
 '["SELECT", "FROM", "WHERE", "ORDER BY"]',
 '["WHERE"]');

-- =====================================================
-- SAMPLE USER-COURSE ENROLLMENTS
-- =====================================================
-- Note: Replace user_id and course_id with actual IDs from your database

-- Example: Student 1 enrolls in JavaScript course
-- INSERT INTO user_courses (user_id, course_id) VALUES (2, 1);

-- Example: Student 1 enrolls in React course
-- INSERT INTO user_courses (user_id, course_id) VALUES (2, 2);

-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================
-- Use these to verify your data was inserted correctly:

-- Check all courses
-- SELECT * FROM courses;

-- Check all chapters for a specific course
-- SELECT * FROM chapters WHERE course_id = 1;

-- Check all quizzes
-- SELECT * FROM quizzes;

-- Check user enrollments
-- SELECT u.username, c.title
-- FROM user_courses uc
-- JOIN users u ON uc.user_id = u.id
-- JOIN courses c ON uc.course_id = c.id;

-- =====================================================
-- HOW TO RUN THESE QUERIES
-- =====================================================
--
-- Option 1: Using SQLite CLI
-- $ sqlite3 local.db < sample-data.sql
--
-- Option 2: Using SQLite CLI interactively
-- $ sqlite3 local.db
-- sqlite> .read sample-data.sql
--
-- Option 3: Using Bun/Node.js with better-sqlite3
-- See backend/utils.ts for database connection
-- Then run queries programmatically
--
-- =====================================================
