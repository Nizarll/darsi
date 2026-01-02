export interface Course {
  id: string;
  title: string;
  description: string;
  content: string;
  chapters: Chapter[];
};

export interface Chapter {
  id: string;
  title: string;
  description: string;
  content: string;
};

export interface Quiz {
  id: string;
  title: string;
  description: string;
  content: string;
  options: string[];
  valid_options: string[];
};

export const CREATE_DATABASE = `
create table if not exists users (
  id integer primary key autoincrement,
  username text unique not null,
  role text not null,
  password text not null
);

create table if not exists courses (
  id integer primary key autoincrement,
  title text not null,
  description text,
  content text,
  created_at text default current_date
);

create table if not exists chapters (
  id integer primary key autoincrement,
  course_id integer not null,
  title text not null,
  description text,
  content text,
  foreign key (course_id) references courses(id) on delete cascade
);

create table if not exists lessons (
  id integer primary key autoincrement,
  course_id integer not null,
  title text not null,
  description text,
  content text,
  video_url text,
  order_index integer,
  foreign key (course_id) references courses(id) on delete cascade
);

create table if not exists user_courses (
  user_id integer references users(id) on delete cascade,
  course_id integer references courses(id) on delete cascade,
  primary key (user_id, course_id)
);

create table if not exists quizzes (
  id integer primary key autoincrement,
  title text not null,
  description text,
  content text,
  options text not null,
  valid_options text not null
);
`; // password is encrypted with bcrypt

export const CREATE_USER_QUERY = ` INSERT INTO users (username, password, role) VALUES (?, ?, ?); `;
export const GET_USER_BY_USERNAME = `SELECT * FROM users WHERE username = ?; `;
export const GET_USER_COURSES = `SELECT * FROM user_courses WHERE user_id = ?;`;
export const CREATE_USER_COURSE = `INSERT INTO user_courses (user_id, course_id) VALUES (?, ?);`;
export const CREATE_COURSE_QUERY = ` INSERT INTO courses (title, description, content) VALUES (?, ?, ?); `;
export const GET_ALL_COURSES_QUERY = ` SELECT * FROM courses; `;
export const GET_COURSE_BY_ID_QUERY = ` SELECT * FROM courses WHERE id = ?; `;
export const UPDATE_COURSE_QUERY = ` UPDATE courses SET title = ?, description = ?, content = ? WHERE id = ?; `;
export const DELETE_COURSE_QUERY = ` DELETE FROM courses WHERE id = ?; `;
export const CREATE_CHAPTER_QUERY = ` INSERT INTO chapters (course_id, title, description, content) VALUES (?, ?, ?, ?);`;
export const GET_CHAPTERS_BY_COURSE_QUERY = ` SELECT * FROM chapters WHERE course_id = ?; `;
export const GET_CHAPTER_BY_ID_QUERY = ` SELECT * FROM chapters WHERE id = ?; `;
export const UPDATE_CHAPTER_QUERY = ` UPDATE chapters SET title = ?, description = ?, content = ? WHERE id = ?; `;
export const DELETE_CHAPTER_QUERY = ` DELETE FROM chapters WHERE id = ?; `;
export const CREATE_QUIZ_QUERY = ` INSERT INTO quizzes (title, description, content, options, valid_options) VALUES (?, ?, ?, ?, ?); `;
export const GET_ALL_QUIZZES_QUERY = ` SELECT * FROM quizzes; `;
export const GET_QUIZ_BY_ID_QUERY = ` SELECT * FROM quizzes WHERE id = ?; `;
export const UPDATE_QUIZ_QUERY = ` UPDATE quizzes SET title = ?, description = ?, content = ?, options = ?, valid_options = ? WHERE id = ?; `;
export const DELETE_QUIZ_QUERY = ` DELETE FROM quizzes WHERE id = ?; `;

export const CREATE_LESSON_QUERY = ` INSERT INTO lessons (course_id, title, description, content, video_url, order_index) VALUES (?, ?, ?, ?, ?, ?); `;
export const GET_LESSONS_BY_COURSE_QUERY = ` SELECT * FROM lessons WHERE course_id = ? ORDER BY order_index; `;
export const GET_LESSON_BY_ID_QUERY = ` SELECT * FROM lessons WHERE id = ?; `;
export const UPDATE_LESSON_QUERY = ` UPDATE lessons SET title = ?, description = ?, content = ?, video_url = ?, order_index = ? WHERE id = ?; `;
export const DELETE_LESSON_QUERY = ` DELETE FROM lessons WHERE id = ?; `;

export const JWT_SECRET = process.env.JWT_SECRET || "this sentence is serving as a random sequence of words maybe i should consider using a hash";
export const JWT_EXPIRES_IN = "24h";
