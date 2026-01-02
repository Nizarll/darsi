import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { AuthScema, CourseSchema, ChapterSchema, QuizSchema } from "./schemas";
import { authenticateUser, createUser } from "./auth";
import { generateToken } from "./jwt";
import { authenticateToken } from "./middleware";
import { getDatabase } from "./utils";
import {
  GET_USER_COURSES,
  CREATE_USER_COURSE,
  CREATE_COURSE_QUERY,
  GET_ALL_COURSES_QUERY,
  GET_COURSE_BY_ID_QUERY,
  UPDATE_COURSE_QUERY,
  DELETE_COURSE_QUERY,
  CREATE_CHAPTER_QUERY,
  GET_CHAPTERS_BY_COURSE_QUERY,
  GET_CHAPTER_BY_ID_QUERY,
  UPDATE_CHAPTER_QUERY,
  DELETE_CHAPTER_QUERY,
  CREATE_QUIZ_QUERY,
  GET_ALL_QUIZZES_QUERY,
  GET_QUIZ_BY_ID_QUERY,
  UPDATE_QUIZ_QUERY,
  DELETE_QUIZ_QUERY,
  GET_LESSONS_BY_COURSE_QUERY,
  GET_LESSON_BY_ID_QUERY,
} from "./constants";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

const server = app.listen(7000, () => {
  console.log("backend running on http://localhost:7000");
});

server.on('error', (err: Error) => {
  console.error('Server error:', err);
  process.exit(1);
});

app.post("/login", async (req, res) => {
  const parseResult = AuthScema.safeParse(req.body);

  if (!parseResult.success) {
    return res.status(400).json({
      message: "Invalid input",
      errors: parseResult.error,
    });
  }

  const { username, password } = parseResult.data;

  try {
    const user = await authenticateUser(username, password);

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = generateToken(user.id, user.username, user.role);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    });

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        username: user.username,
      }
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});


app.post("/register", async (req, res) => {
  console.log("received request")
  const parseResult = AuthScema.safeParse(req.body);

  if (!parseResult.success) {
    console.log(parseResult, req.body)
    return res.status(400).json({
      message: "Invalid input",
      errors: parseResult.error,
    });
  }

  const { username, password, role } = parseResult.data;

  try {
    const result = await createUser(username, password, role);
    const userId = result.lastInsertRowid as number;

    const token = generateToken(userId, username, role);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      message: "Registration successful",
      token,
      user: {
        id: userId,
        username,
      }
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

app.get("/profile", authenticateToken, (req, res) => {
  res.json({
    message: "Profile data",
    user: req.user,
  });
});

app.get("/dashboard", authenticateToken, (req, res) => {
  res.json({
    userId: req.user?.userId,
  });
});

app.post("/courses", authenticateToken, (req, res) => {
  const parseResult = CourseSchema.safeParse(req.body);

  if (!parseResult.success) {
    return res.status(400).json({
      message: "Invalid input",
      errors: parseResult.error,
    });
  }

  const { title, description, content } = parseResult.data;

  try {
    const db = getDatabase();
    const result = db.run(CREATE_COURSE_QUERY, [title, description || "", content || ""]);
    res.status(201).json({
      message: "Course created successfully",
      courseId: result.lastInsertRowid,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/courses", (req, res) => {
  try {
    const db = getDatabase();
    const courses = db.query(GET_ALL_COURSES_QUERY).all();
    res.json({ courses });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/courses/:id", (req, res) => {
  const courseId = parseInt(req.params.id);

  try {
    const db = getDatabase();
    const course = db.query(GET_COURSE_BY_ID_QUERY).get(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const chapters = db.query(GET_CHAPTERS_BY_COURSE_QUERY).all(courseId);
    const lessons = db.query(GET_LESSONS_BY_COURSE_QUERY).all(courseId);
    res.json({ ...course, chapters, lessons });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.put("/courses/:id", authenticateToken, (req, res) => {
  const courseId = parseInt((req.params as any).id);
  const parseResult = CourseSchema.safeParse(req.body);

  if (!parseResult.success) {
    return res.status(400).json({
      message: "Invalid input",
      errors: parseResult.error,
    });
  }

  const { title, description, content } = parseResult.data;

  try {
    const db = getDatabase();
    db.run(UPDATE_COURSE_QUERY, [title, description || "", content || "", courseId]);
    res.json({ message: "Course updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.delete("/courses/:id", authenticateToken, (req, res) => {
  const courseId = parseInt((req.params as any).id);

  try {
    const db = getDatabase();
    db.run(DELETE_COURSE_QUERY, [courseId]);
    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/chapters", authenticateToken, (req, res) => {
  const parseResult = ChapterSchema.safeParse(req.body);

  if (!parseResult.success) {
    return res.status(400).json({
      message: "Invalid input",
      errors: parseResult.error,
    });
  }

  const { course_id, title, description, content } = parseResult.data;

  try {
    const db = getDatabase();
    const result = db.run(CREATE_CHAPTER_QUERY, [course_id, title, description || "", content || ""]);
    res.status(201).json({
      message: "Chapter created successfully",
      chapterId: result.lastInsertRowid,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/courses/:courseId/chapters", (req, res) => {
  const courseId = parseInt(req.params.courseId);

  try {
    const db = getDatabase();
    const chapters = db.query(GET_CHAPTERS_BY_COURSE_QUERY).all(courseId);
    res.json({ chapters });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/chapters/:id", (req, res) => {
  const chapterId = parseInt(req.params.id);

  try {
    const db = getDatabase();
    const chapter = db.query(GET_CHAPTER_BY_ID_QUERY).get(chapterId);

    if (!chapter) {
      return res.status(404).json({ message: "Chapter not found" });
    }

    res.json(chapter);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.put("/chapters/:id", authenticateToken, (req, res) => {
  const chapterId = parseInt((req.params as any).id);
  const parseResult = ChapterSchema.partial().safeParse(req.body);

  if (!parseResult.success) {
    return res.status(400).json({
      message: "Invalid input",
      errors: parseResult.error,
    });
  }

  const { title, description, content } = parseResult.data;

  try {
    const db = getDatabase();
    db.run(UPDATE_CHAPTER_QUERY, [title || "", description || "", content || "", chapterId]);
    res.json({ message: "Chapter updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.delete("/chapters/:id", authenticateToken, (req, res) => {
  const chapterId = parseInt((req.params as any).id);

  try {
    const db = getDatabase();
    db.run(DELETE_CHAPTER_QUERY, [chapterId]);
    res.json({ message: "Chapter deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// ========== LESSON ENDPOINTS ==========

app.get("/lessons/:id", (req, res) => {
  const lessonId = parseInt(req.params.id);

  try {
    const db = getDatabase();
    const lesson = db.query(GET_LESSON_BY_ID_QUERY).get(lessonId);

    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    res.json(lesson);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/courses/:courseId/lessons", (req, res) => {
  const courseId = parseInt(req.params.courseId);

  try {
    const db = getDatabase();
    const lessons = db.query(GET_LESSONS_BY_COURSE_QUERY).all(courseId);
    res.json({ lessons });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/quizzes", authenticateToken, (req, res) => {
  const parseResult = QuizSchema.safeParse(req.body);

  if (!parseResult.success) {
    return res.status(400).json({
      message: "Invalid input",
      errors: parseResult.error,
    });
  }

  const { title, description, content, options, valid_options } = parseResult.data;

  try {
    const db = getDatabase();
    const result = db.run(CREATE_QUIZ_QUERY, [
      title,
      description || "",
      content || "",
      JSON.stringify(options),
      JSON.stringify(valid_options),
    ]);
    res.status(201).json({
      message: "Quiz created successfully",
      quizId: result.lastInsertRowid,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/quizzes", (req, res) => {
  try {
    const db = getDatabase();
    const quizzes = db.query(GET_ALL_QUIZZES_QUERY).all() as any[];

    const parsedQuizzes = quizzes.map(quiz => ({
      ...quiz,
      options: JSON.parse(quiz.options),
      valid_options: JSON.parse(quiz.valid_options),
    }));

    res.json({ quizzes: parsedQuizzes });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/quizzes/:id", (req, res) => {
  const quizId = parseInt(req.params.id);

  try {
    const db = getDatabase();
    const quiz = db.query(GET_QUIZ_BY_ID_QUERY).get(quizId) as any;

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    const parsedQuiz = {
      ...quiz,
      options: JSON.parse(quiz.options),
      valid_options: JSON.parse(quiz.valid_options),
    };

    res.json(parsedQuiz);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.put("/quizzes/:id", authenticateToken, (req, res) => {
  const quizId = parseInt((req.params as any).id);
  const parseResult = QuizSchema.safeParse(req.body);

  if (!parseResult.success) {
    return res.status(400).json({
      message: "Invalid input",
      errors: parseResult.error,
    });
  }

  const { title, description, content, options, valid_options } = parseResult.data;

  try {
    const db = getDatabase();
    db.run(UPDATE_QUIZ_QUERY, [
      title,
      description || "",
      content || "",
      JSON.stringify(options),
      JSON.stringify(valid_options),
      quizId,
    ]);
    res.json({ message: "Quiz updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.delete("/quizzes/:id", authenticateToken, (req, res) => {
  const quizId = parseInt((req.params as any).id);

  try {
    const db = getDatabase();
    db.run(DELETE_QUIZ_QUERY, [quizId]);
    res.json({ message: "Quiz deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});


app.get("/subscribe/:id", authenticateToken, async (req, res) => {

  const user = req.user;
  const courseId = parseInt((req.params as any).id);

  console.log(req.params)
  console.log(courseId)

  if (!user) return res.status(400).json({ message: "User must be authenticated to follow a course" });
  if (!courseId) return res.status(400).json({ message: "User must follow a valid course" });
  const db = getDatabase();

  try {
    const courses_followed: Array<{courseId: number, userId: number}> = db.query(GET_USER_COURSES).all(user.userId) as any;
    if (courses_followed &&
      courses_followed.length > 0 &&
      courses_followed.find((conn) => conn.courseId == courseId)
    )  return res.status(400).json({ message: "User must follow a valid course" });
    db.run(CREATE_USER_COURSE, [user.userId, courseId]);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/user_courses", authenticateToken, async (req, res) => {

  const user = req.user;

  if (!user) return res.status(400).json({ message: "User must be authenticated to follow a course" });
  const db = getDatabase();

  try {
    const courses_followed: Array<{courseId: string, userId: string}> = db.query(GET_USER_COURSES).all(user.userId) as any;
    return res.status(201).json({
      data: courses_followed
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

