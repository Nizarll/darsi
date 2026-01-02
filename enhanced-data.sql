-- Clear existing lessons and chapters
DELETE FROM lessons;
DELETE FROM chapters;

-- Enhanced lessons for Course 1: Introduction to JavaScript
INSERT INTO lessons (course_id, title, description, content, video_url, order_index) VALUES
(4, 'Variables and Data Types', 'Understanding JavaScript variables and primitive types',
'<h2>JavaScript Variables</h2>
<p>In JavaScript, variables are containers for storing data values. We have three ways to declare variables:</p>
<ul>
<li><strong>var</strong>: Function-scoped, can be redeclared and updated</li>
<li><strong>let</strong>: Block-scoped, can be updated but not redeclared</li>
<li><strong>const</strong>: Block-scoped, cannot be updated or redeclared</li>
</ul>

<h3>Primitive Data Types</h3>
<ol>
<li><strong>String</strong>: Text values like "Hello World"</li>
<li><strong>Number</strong>: Integers and floating-point numbers</li>
<li><strong>Boolean</strong>: true or false values</li>
<li><strong>Null</strong>: Intentional absence of value</li>
<li><strong>Undefined</strong>: Variable declared but not assigned</li>
<li><strong>Symbol</strong>: Unique identifiers (ES6)</li>
<li><strong>BigInt</strong>: Large integers (ES2020)</li>
</ol>

<h3>Example Code</h3>
<pre><code>// Variable declarations
let name = "John";
const age = 25;
var isStudent = true;

// Type checking
console.log(typeof name);      // "string"
console.log(typeof age);       // "number"
console.log(typeof isStudent); // "boolean"
</code></pre>',
'https://www.youtube.com/embed/W6NZfCO5SIk', 1);

INSERT INTO lessons (course_id, title, description, content, video_url, order_index) VALUES
(4, 'Functions and Scope', 'Mastering JavaScript functions',
'<h2>JavaScript Functions</h2>
<p>Functions are reusable blocks of code that perform specific tasks. They help organize code and avoid repetition.</p>

<h3>Function Declaration</h3>
<pre><code>function greet(name) {
  return "Hello, " + name + "!";
}
console.log(greet("Alice")); // "Hello, Alice!"
</code></pre>

<h3>Arrow Functions (ES6)</h3>
<pre><code>const add = (a, b) => a + b;
const square = x => x * x;

console.log(add(5, 3));  // 8
console.log(square(4));  // 16
</code></pre>

<h3>Understanding Scope</h3>
<ul>
<li><strong>Global Scope</strong>: Variables accessible everywhere</li>
<li><strong>Function Scope</strong>: Variables accessible only within function</li>
<li><strong>Block Scope</strong>: Variables accessible only within block (let/const)</li>
</ul>

<h3>Closures</h3>
<p>A closure is a function that has access to its outer function scope even after the outer function has returned.</p>
<pre><code>function createCounter() {
  let count = 0;
  return function() {
    count++;
    return count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
</code></pre>',
'https://www.youtube.com/embed/gigtS_5KOqo', 2);

INSERT INTO lessons (course_id, title, description, content, video_url, order_index) VALUES
(4, 'Arrays and Objects', 'Working with JavaScript data structures',
'<h2>Arrays in JavaScript</h2>
<p>Arrays are ordered collections of values that can hold multiple items of any type.</p>

<h3>Array Methods</h3>
<pre><code>const fruits = ["apple", "banana", "orange"];

// Adding elements
fruits.push("grape");      // Add to end
fruits.unshift("mango");   // Add to beginning

// Removing elements
fruits.pop();              // Remove from end
fruits.shift();            // Remove from beginning

// Useful methods
fruits.map(f => f.toUpperCase());
fruits.filter(f => f.length > 5);
fruits.reduce((acc, f) => acc + f.length, 0);
</code></pre>

<h2>Objects in JavaScript</h2>
<p>Objects are collections of key-value pairs that represent complex entities.</p>

<h3>Object Creation and Manipulation</h3>
<pre><code>const person = {
  name: "John",
  age: 30,
  city: "New York",
  greet() {
    console.log(`Hi, I am ${this.name}`);
  }
};

// Accessing properties
console.log(person.name);        // "John"
console.log(person["age"]);      // 30

// Destructuring
const { name, age } = person;

// Spread operator
const updatedPerson = { ...person, age: 31 };
</code></pre>',
'https://www.youtube.com/embed/R8rmfD9Y5-c', 3);

INSERT INTO lessons (course_id, title, description, content, video_url, order_index) VALUES
(4, 'Asynchronous JavaScript', 'Handling async operations',
'<h2>Understanding Asynchronous JavaScript</h2>
<p>JavaScript is single-threaded but can handle asynchronous operations using callbacks, promises, and async/await.</p>

<h3>Callbacks</h3>
<pre><code>function fetchData(callback) {
  setTimeout(() => {
    callback("Data loaded!");
  }, 1000);
}

fetchData((data) => {
  console.log(data); // "Data loaded!" after 1 second
});
</code></pre>

<h3>Promises</h3>
<pre><code>const promise = new Promise((resolve, reject) => {
  const success = true;
  if (success) {
    resolve("Operation successful!");
  } else {
    reject("Operation failed!");
  }
});

promise
  .then(result => console.log(result))
  .catch(error => console.error(error));
</code></pre>

<h3>Async/Await</h3>
<pre><code>async function loadData() {
  try {
    const response = await fetch("https://api.example.com/data");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
}

loadData().then(data => console.log(data));
</code></pre>

<h3>The Event Loop</h3>
<p>The event loop allows JavaScript to perform non-blocking operations despite being single-threaded by offloading operations to the browser APIs.</p>',
'https://www.youtube.com/embed/PoRJizFvM7s', 4);

-- Enhanced lessons for Course 2: Web Development with React
INSERT INTO lessons (course_id, title, description, content, video_url, order_index) VALUES
(5, 'React Fundamentals', 'Getting started with React',
'<h2>Introduction to React</h2>
<p>React is a JavaScript library for building user interfaces, particularly single-page applications where you need a fast, interactive user experience.</p>

<h3>Components</h3>
<p>Components are the building blocks of React applications. They can be function or class-based.</p>
<pre><code>// Function Component
function Welcome(props) {
  return &lt;h1&gt;Hello, {props.name}!&lt;/h1&gt;;
}

// Using the component
&lt;Welcome name="Alice" /&gt;
</code></pre>

<h3>JSX Syntax</h3>
<p>JSX allows you to write HTML-like code in JavaScript.</p>
<pre><code>const element = (
  &lt;div className="container"&gt;
    &lt;h1&gt;Welcome to React&lt;/h1&gt;
    &lt;p&gt;Build amazing UIs&lt;/p&gt;
  &lt;/div&gt;
);
</code></pre>

<h3>Props</h3>
<p>Props are arguments passed to components, similar to function parameters.</p>
<pre><code>function UserCard({ name, email, avatar }) {
  return (
    &lt;div className="card"&gt;
      &lt;img src={avatar} alt={name} /&gt;
      &lt;h2&gt;{name}&lt;/h2&gt;
      &lt;p&gt;{email}&lt;/p&gt;
    &lt;/div&gt;
  );
}
</code></pre>',
'https://www.youtube.com/embed/SqcY0GlETPk', 1);

INSERT INTO lessons (course_id, title, description, content, video_url, order_index) VALUES
(5, 'State and Hooks', 'Managing component state',
'<h2>React State Management</h2>
<p>State allows components to create and manage their own data that can change over time.</p>

<h3>useState Hook</h3>
<pre><code>import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    &lt;div&gt;
      &lt;p&gt;Count: {count}&lt;/p&gt;
      &lt;button onClick={() => setCount(count + 1)}&gt;
        Increment
      &lt;/button&gt;
    &lt;/div&gt;
  );
}
</code></pre>

<h3>useEffect Hook</h3>
<p>useEffect lets you perform side effects in function components.</p>
<pre><code>import { useEffect, useState } from "react";

function DataFetcher() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("https://api.example.com/data")
      .then(res => res.json())
      .then(data => setData(data));
  }, []); // Empty array means run once on mount

  return &lt;div&gt;{data ? data.title : "Loading..."}&lt;/div&gt;;
}
</code></pre>

<h3>Custom Hooks</h3>
<pre><code>function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
</code></pre>',
'https://www.youtube.com/embed/O6P86uwfdR0', 2);

INSERT INTO lessons (course_id, title, description, content, video_url, order_index) VALUES
(5, 'React Router', 'Building single-page applications',
'<h2>Client-Side Routing with React Router</h2>
<p>React Router enables navigation among views in a React application, allowing you to build single-page applications.</p>

<h3>Basic Setup</h3>
<pre><code>import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    &lt;BrowserRouter&gt;
      &lt;nav&gt;
        &lt;Link to="/"&gt;Home&lt;/Link&gt;
        &lt;Link to="/about"&gt;About&lt;/Link&gt;
        &lt;Link to="/contact"&gt;Contact&lt;/Link&gt;
      &lt;/nav&gt;

      &lt;Routes&gt;
        &lt;Route path="/" element={&lt;Home /&gt;} /&gt;
        &lt;Route path="/about" element={&lt;About /&gt;} /&gt;
        &lt;Route path="/contact" element={&lt;Contact /&gt;} /&gt;
      &lt;/Routes&gt;
    &lt;/BrowserRouter&gt;
  );
}
</code></pre>

<h3>Dynamic Routes</h3>
<pre><code>import { useParams } from "react-router-dom";

function UserProfile() {
  const { userId } = useParams();

  return &lt;h1&gt;User Profile: {userId}&lt;/h1&gt;;
}

// Route definition
&lt;Route path="/user/:userId" element={&lt;UserProfile /&gt;} /&gt;
</code></pre>

<h3>Programmatic Navigation</h3>
<pre><code>import { useNavigate } from "react-router-dom";

function LoginForm() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // After successful login
    navigate("/dashboard");
  };

  return &lt;form onSubmit={handleSubmit}&gt;...&lt;/form&gt;;
}
</code></pre>',
'https://www.youtube.com/embed/Law7wfdg_ls', 3);

INSERT INTO lessons (course_id, title, description, content, video_url, order_index) VALUES
(5, 'Component Composition and Patterns', 'Advanced React patterns',
'<h2>React Component Patterns</h2>
<p>Learn advanced patterns for building scalable and maintainable React applications.</p>

<h3>Compound Components</h3>
<pre><code>function Tabs({ children }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    &lt;div&gt;
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child, {
          isActive: index === activeIndex,
          onClick: () => setActiveIndex(index)
        })
      )}
    &lt;/div&gt;
  );
}
</code></pre>

<h3>Render Props</h3>
<pre><code>function DataProvider({ render }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData().then(setData);
  }, []);

  return render(data);
}

// Usage
&lt;DataProvider render={(data) => (
  &lt;div&gt;{data ? data.title : "Loading..."}&lt;/div&gt;
)} /&gt;
</code></pre>

<h3>Higher-Order Components</h3>
<pre><code>function withLoading(Component) {
  return function WithLoadingComponent({ isLoading, ...props }) {
    if (isLoading) return &lt;div&gt;Loading...&lt;/div&gt;;
    return &lt;Component {...props} /&gt;;
  };
}

const UserListWithLoading = withLoading(UserList);
</code></pre>',
'https://www.youtube.com/embed/3XaXKiXtNjw', 4);

-- Enhanced lessons for Course 3: Database Design and SQL
INSERT INTO lessons (course_id, title, description, content, video_url, order_index) VALUES
(6, 'Introduction to Databases', 'Understanding relational databases',
'<h2>What is a Database?</h2>
<p>A database is an organized collection of structured information or data stored electronically in a computer system.</p>

<h3>Types of Databases</h3>
<ul>
<li><strong>Relational Databases</strong>: MySQL, PostgreSQL, SQLite - Data organized in tables with relationships</li>
<li><strong>NoSQL Databases</strong>: MongoDB, Redis - Flexible schema, document or key-value based</li>
<li><strong>Graph Databases</strong>: Neo4j - Optimized for relationship-heavy data</li>
</ul>

<h3>Database Concepts</h3>
<ul>
<li><strong>Tables</strong>: Collections of related data entries</li>
<li><strong>Rows</strong>: Individual records in a table</li>
<li><strong>Columns</strong>: Attributes or fields of data</li>
<li><strong>Primary Key</strong>: Unique identifier for each record</li>
<li><strong>Foreign Key</strong>: Reference to a primary key in another table</li>
</ul>

<h3>Example Schema</h3>
<pre><code>CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE posts (
  id INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
</code></pre>',
'https://www.youtube.com/embed/FR4QIeZaPeM', 1);

INSERT INTO lessons (course_id, title, description, content, video_url, order_index) VALUES
(6, 'SQL Basics - SELECT, INSERT, UPDATE, DELETE', 'Essential SQL operations',
'<h2>SQL CRUD Operations</h2>
<p>CRUD stands for Create, Read, Update, and Delete - the four basic operations of persistent storage.</p>

<h3>SELECT - Reading Data</h3>
<pre><code>-- Select all columns
SELECT * FROM users;

-- Select specific columns
SELECT username, email FROM users;

-- With conditions
SELECT * FROM users WHERE age > 18;

-- Sorting
SELECT * FROM users ORDER BY created_at DESC;

-- Limiting results
SELECT * FROM users LIMIT 10;
</code></pre>

<h3>INSERT - Creating Data</h3>
<pre><code>-- Insert single row
INSERT INTO users (username, email)
VALUES ("john_doe", "john@example.com");

-- Insert multiple rows
INSERT INTO users (username, email) VALUES
  ("alice", "alice@example.com"),
  ("bob", "bob@example.com");
</code></pre>

<h3>UPDATE - Modifying Data</h3>
<pre><code>-- Update single field
UPDATE users
SET email = "newemail@example.com"
WHERE id = 1;

-- Update multiple fields
UPDATE users
SET username = "john_updated", email = "updated@example.com"
WHERE id = 1;
</code></pre>

<h3>DELETE - Removing Data</h3>
<pre><code>-- Delete specific record
DELETE FROM users WHERE id = 1;

-- Delete with condition
DELETE FROM users WHERE created_at < "2020-01-01";

-- Delete all (be careful!)
DELETE FROM users;
</code></pre>',
'https://www.youtube.com/embed/HXV3zeQKqGY', 2);

INSERT INTO lessons (course_id, title, description, content, video_url, order_index) VALUES
(6, 'SQL Joins and Relationships', 'Working with multiple tables',
'<h2>Understanding SQL Joins</h2>
<p>Joins allow you to combine rows from two or more tables based on a related column.</p>

<h3>INNER JOIN</h3>
<p>Returns records that have matching values in both tables.</p>
<pre><code>SELECT users.username, posts.title
FROM users
INNER JOIN posts ON users.id = posts.user_id;
</code></pre>

<h3>LEFT JOIN</h3>
<p>Returns all records from the left table and matched records from the right table.</p>
<pre><code>SELECT users.username, posts.title
FROM users
LEFT JOIN posts ON users.id = posts.user_id;
</code></pre>

<h3>RIGHT JOIN</h3>
<p>Returns all records from the right table and matched records from the left table.</p>
<pre><code>SELECT users.username, posts.title
FROM users
RIGHT JOIN posts ON users.id = posts.user_id;
</code></pre>

<h3>Multiple Joins</h3>
<pre><code>SELECT
  users.username,
  posts.title,
  comments.content
FROM users
INNER JOIN posts ON users.id = posts.user_id
INNER JOIN comments ON posts.id = comments.post_id;
</code></pre>',
'https://www.youtube.com/embed/9yeOJ0ZMUYw', 3);

INSERT INTO lessons (course_id, title, description, content, video_url, order_index) VALUES
(6, 'Database Normalization and Design', 'Designing efficient databases',
'<h2>Database Normalization</h2>
<p>Normalization is the process of organizing data to minimize redundancy and improve data integrity.</p>

<h3>First Normal Form (1NF)</h3>
<ul>
<li>Each table cell should contain a single value</li>
<li>Each record needs to be unique</li>
</ul>

<h3>Second Normal Form (2NF)</h3>
<ul>
<li>Must be in 1NF</li>
<li>All non-key attributes must depend on the entire primary key</li>
</ul>

<h3>Third Normal Form (3NF)</h3>
<ul>
<li>Must be in 2NF</li>
<li>No transitive dependencies</li>
</ul>

<h3>Example: Unnormalized to Normalized</h3>
<pre><code>-- Unnormalized
CREATE TABLE orders (
  order_id INT,
  customer_name TEXT,
  customer_email TEXT,
  product1 TEXT,
  product2 TEXT
);

-- Normalized
CREATE TABLE customers (
  customer_id INT PRIMARY KEY,
  name TEXT,
  email TEXT
);

CREATE TABLE orders (
  order_id INT PRIMARY KEY,
  customer_id INT,
  order_date DATE,
  FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

CREATE TABLE order_items (
  order_id INT,
  product_id INT,
  quantity INT,
  PRIMARY KEY (order_id, product_id)
);
</code></pre>',
'https://www.youtube.com/embed/GFQaEYEc8_8', 4);

-- Enhanced lessons for Course 4: Python for Data Science
INSERT INTO lessons (course_id, title, description, content, video_url, order_index) VALUES
(7, 'Python Fundamentals', 'Getting started with Python programming',
'<h2>Introduction to Python</h2>
<p>Python is a high-level, interpreted programming language known for its simplicity and readability.</p>

<h3>Variables and Data Types</h3>
<pre><code># Variables
name = "Alice"
age = 25
height = 5.6
is_student = True

# Lists
fruits = ["apple", "banana", "orange"]

# Dictionaries
person = {
    "name": "John",
    "age": 30,
    "city": "New York"
}

# Tuples (immutable)
coordinates = (10, 20)
</code></pre>

<h3>Control Flow</h3>
<pre><code># If statements
if age >= 18:
    print("Adult")
elif age >= 13:
    print("Teenager")
else:
    print("Child")

# Loops
for fruit in fruits:
    print(fruit)

count = 0
while count < 5:
    print(count)
    count += 1
</code></pre>

<h3>Functions</h3>
<pre><code>def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

print(greet("Alice"))
print(greet("Bob", "Hi"))

# Lambda functions
square = lambda x: x ** 2
print(square(5))  # 25
</code></pre>',
'https://www.youtube.com/embed/_uQrJ0TkZlc', 1);

INSERT INTO lessons (course_id, title, description, content, video_url, order_index) VALUES
(7, 'NumPy for Numerical Computing', 'Working with arrays and mathematical operations',
'<h2>Introduction to NumPy</h2>
<p>NumPy is the fundamental package for scientific computing in Python, providing support for large multi-dimensional arrays.</p>

<h3>Creating Arrays</h3>
<pre><code>import numpy as np

# From list
arr = np.array([1, 2, 3, 4, 5])

# Special arrays
zeros = np.zeros((3, 3))
ones = np.ones((2, 4))
range_arr = np.arange(0, 10, 2)  # [0, 2, 4, 6, 8]
linspace = np.linspace(0, 1, 5)  # 5 evenly spaced values

# Random arrays
random_arr = np.random.rand(3, 3)
</code></pre>

<h3>Array Operations</h3>
<pre><code># Element-wise operations
a = np.array([1, 2, 3])
b = np.array([4, 5, 6])

print(a + b)  # [5, 7, 9]
print(a * b)  # [4, 10, 18]
print(a ** 2) # [1, 4, 9]

# Matrix operations
matrix = np.array([[1, 2], [3, 4]])
print(matrix.T)           # Transpose
print(np.dot(matrix, matrix))  # Matrix multiplication
</code></pre>

<h3>Indexing and Slicing</h3>
<pre><code>arr = np.array([1, 2, 3, 4, 5])
print(arr[0])      # 1
print(arr[1:4])    # [2, 3, 4]
print(arr[-1])     # 5

# 2D arrays
matrix = np.array([[1, 2, 3], [4, 5, 6]])
print(matrix[0, 1])   # 2
print(matrix[:, 1])   # [2, 5]
</code></pre>',
'https://www.youtube.com/embed/QUT1VHiLmmI', 2);

INSERT INTO lessons (course_id, title, description, content, video_url, order_index) VALUES
(7, 'Pandas for Data Analysis', 'Data manipulation and analysis',
'<h2>Introduction to Pandas</h2>
<p>Pandas is a powerful data analysis library that provides DataFrames for structured data manipulation.</p>

<h3>Creating DataFrames</h3>
<pre><code>import pandas as pd

# From dictionary
data = {
    "name": ["Alice", "Bob", "Charlie"],
    "age": [25, 30, 35],
    "city": ["NY", "LA", "SF"]
}
df = pd.DataFrame(data)

# From CSV
df = pd.read_csv("data.csv")
</code></pre>

<h3>Data Selection and Filtering</h3>
<pre><code># Select column
print(df["name"])
print(df.name)

# Select multiple columns
print(df[["name", "age"]])

# Filter rows
adults = df[df["age"] >= 30]
ny_residents = df[df["city"] == "NY"]

# Multiple conditions
result = df[(df["age"] > 25) & (df["city"] == "LA")]
</code></pre>

<h3>Data Manipulation</h3>
<pre><code># Add new column
df["is_senior"] = df["age"] > 60

# Drop column
df = df.drop("city", axis=1)

# Sort
df_sorted = df.sort_values("age", ascending=False)

# Group by
grouped = df.groupby("city").agg({
    "age": "mean",
    "name": "count"
})

# Missing data
df.fillna(0)
df.dropna()
</code></pre>',
'https://www.youtube.com/embed/vmEHCJofslg', 3);

INSERT INTO lessons (course_id, title, description, content, video_url, order_index) VALUES
(7, 'Data Visualization with Matplotlib', 'Creating informative visualizations',
'<h2>Introduction to Matplotlib</h2>
<p>Matplotlib is a comprehensive library for creating static, animated, and interactive visualizations in Python.</p>

<h3>Basic Plotting</h3>
<pre><code>import matplotlib.pyplot as plt
import numpy as np

# Line plot
x = np.linspace(0, 10, 100)
y = np.sin(x)

plt.plot(x, y)
plt.xlabel("X axis")
plt.ylabel("Y axis")
plt.title("Sine Wave")
plt.show()
</code></pre>

<h3>Different Plot Types</h3>
<pre><code># Scatter plot
plt.scatter(x, y)

# Bar chart
categories = ["A", "B", "C"]
values = [10, 25, 15]
plt.bar(categories, values)

# Histogram
data = np.random.randn(1000)
plt.hist(data, bins=30)

# Pie chart
sizes = [30, 25, 20, 25]
labels = ["A", "B", "C", "D"]
plt.pie(sizes, labels=labels, autopct="%1.1f%%")
</code></pre>

<h3>Multiple Subplots</h3>
<pre><code>fig, axes = plt.subplots(2, 2, figsize=(10, 8))

axes[0, 0].plot(x, y)
axes[0, 0].set_title("Sine")

axes[0, 1].plot(x, np.cos(x))
axes[0, 1].set_title("Cosine")

axes[1, 0].scatter(x, y)
axes[1, 0].set_title("Scatter")

axes[1, 1].hist(data, bins=30)
axes[1, 1].set_title("Histogram")

plt.tight_layout()
plt.show()
</code></pre>',
'https://www.youtube.com/embed/3Xc3CA655Y4', 4);

-- Enhanced lessons for Course 5: Advanced TypeScript
INSERT INTO lessons (course_id, title, description, content, video_url, order_index) VALUES
(8, 'TypeScript Basics and Types', 'Understanding TypeScript type system',
'<h2>Introduction to TypeScript</h2>
<p>TypeScript is a typed superset of JavaScript that compiles to plain JavaScript, adding optional static typing.</p>

<h3>Basic Types</h3>
<pre><code>// Primitive types
let name: string = "Alice";
let age: number = 25;
let isStudent: boolean = true;

// Arrays
let numbers: number[] = [1, 2, 3];
let strings: Array&lt;string&gt; = ["a", "b", "c"];

// Tuples
let person: [string, number] = ["Alice", 25];

// Enums
enum Color {
  Red,
  Green,
  Blue
}
let color: Color = Color.Red;

// Any and Unknown
let dynamic: any = 4;
let uncertain: unknown = "hello";
</code></pre>

<h3>Interfaces</h3>
<pre><code>interface User {
  id: number;
  name: string;
  email?: string;  // Optional property
  readonly createdAt: Date;  // Readonly
}

const user: User = {
  id: 1,
  name: "Alice",
  createdAt: new Date()
};
</code></pre>

<h3>Type Aliases and Union Types</h3>
<pre><code>// Type alias
type ID = string | number;

// Union types
let value: string | number;
value = "hello";
value = 42;

// Literal types
type Status = "pending" | "approved" | "rejected";
let status: Status = "pending";
</code></pre>',
'https://www.youtube.com/embed/ahCwqrYpIuM', 1);

INSERT INTO lessons (course_id, title, description, content, video_url, order_index) VALUES
(8, 'Advanced Types and Generics', 'Mastering TypeScript generics',
'<h2>Generic Types</h2>
<p>Generics provide a way to create reusable components that work with multiple types.</p>

<h3>Generic Functions</h3>
<pre><code>function identity&lt;T&gt;(arg: T): T {
  return arg;
}

let output1 = identity&lt;string&gt;("hello");
let output2 = identity&lt;number&gt;(42);

// Generic with constraints
function getProperty&lt;T, K extends keyof T&gt;(obj: T, key: K) {
  return obj[key];
}

const person = { name: "Alice", age: 25 };
getProperty(person, "name");  // OK
</code></pre>

<h3>Generic Interfaces</h3>
<pre><code>interface Container&lt;T&gt; {
  value: T;
  getValue(): T;
  setValue(value: T): void;
}

class NumberContainer implements Container&lt;number&gt; {
  constructor(public value: number) {}

  getValue(): number {
    return this.value;
  }

  setValue(value: number): void {
    this.value = value;
  }
}
</code></pre>

<h3>Utility Types</h3>
<pre><code>interface User {
  id: number;
  name: string;
  email: string;
}

// Partial - makes all properties optional
type PartialUser = Partial&lt;User&gt;;

// Required - makes all properties required
type RequiredUser = Required&lt;User&gt;;

// Pick - selects specific properties
type UserPreview = Pick&lt;User, "id" | "name"&gt;;

// Omit - excludes specific properties
type UserWithoutId = Omit&lt;User, "id"&gt;;

// Record - creates object type with specific keys
type Roles = Record&lt;"admin" | "user" | "guest", number&gt;;
</code></pre>',
'https://www.youtube.com/embed/nViEqpgwxHE', 2);

INSERT INTO lessons (course_id, title, description, content, video_url, order_index) VALUES
(8, 'Decorators and Metadata', 'Using TypeScript decorators',
'<h2>TypeScript Decorators</h2>
<p>Decorators are a special declaration that can be attached to classes, methods, properties, or parameters.</p>

<h3>Class Decorators</h3>
<pre><code>function Component(target: Function) {
  target.prototype.isComponent = true;
}

@Component
class MyComponent {
  name = "MyComponent";
}

const instance = new MyComponent();
console.log((instance as any).isComponent);  // true
</code></pre>

<h3>Method Decorators</h3>
<pre><code>function Log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function(...args: any[]) {
    console.log(`Calling ${propertyKey} with:`, args);
    const result = originalMethod.apply(this, args);
    console.log(`Result:`, result);
    return result;
  };

  return descriptor;
}

class Calculator {
  @Log
  add(a: number, b: number): number {
    return a + b;
  }
}
</code></pre>

<h3>Property Decorators</h3>
<pre><code>function MinLength(length: number) {
  return function(target: any, propertyKey: string) {
    let value: string;

    const getter = () => value;
    const setter = (newValue: string) => {
      if (newValue.length < length) {
        throw new Error(`${propertyKey} must be at least ${length} characters`);
      }
      value = newValue;
    };

    Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter
    });
  };
}

class User {
  @MinLength(3)
  username: string;
}
</code></pre>',
'https://www.youtube.com/embed/O6A-u_FoEX8', 3);

INSERT INTO lessons (course_id, title, description, content, video_url, order_index) VALUES
(8, 'TypeScript Design Patterns', 'Building scalable applications',
'<h2>Common Design Patterns in TypeScript</h2>
<p>Design patterns are reusable solutions to common software design problems.</p>

<h3>Singleton Pattern</h3>
<pre><code>class Database {
  private static instance: Database;
  private constructor() {}

  static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  query(sql: string) {
    console.log(`Executing: ${sql}`);
  }
}

const db1 = Database.getInstance();
const db2 = Database.getInstance();
console.log(db1 === db2);  // true
</code></pre>

<h3>Factory Pattern</h3>
<pre><code>interface Animal {
  speak(): void;
}

class Dog implements Animal {
  speak() {
    console.log("Woof!");
  }
}

class Cat implements Animal {
  speak() {
    console.log("Meow!");
  }
}

class AnimalFactory {
  static createAnimal(type: "dog" | "cat"): Animal {
    switch(type) {
      case "dog": return new Dog();
      case "cat": return new Cat();
    }
  }
}

const dog = AnimalFactory.createAnimal("dog");
dog.speak();  // "Woof!"
</code></pre>

<h3>Observer Pattern</h3>
<pre><code>interface Observer {
  update(data: any): void;
}

class Subject {
  private observers: Observer[] = [];

  attach(observer: Observer) {
    this.observers.push(observer);
  }

  detach(observer: Observer) {
    const index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
    }
  }

  notify(data: any) {
    for (const observer of this.observers) {
      observer.update(data);
    }
  }
}

class ConcreteObserver implements Observer {
  constructor(private name: string) {}

  update(data: any) {
    console.log(`${this.name} received:`, data);
  }
}
</code></pre>',
'https://www.youtube.com/embed/tv-_1er1mWI', 4);
