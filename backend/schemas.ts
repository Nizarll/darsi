import z from "zod";

export const AuthScema = z.object({
  username: z.string().min(3, "username must be at least 3 characters"),
  role: z.enum(["teacher","student"]).optional().default("student"),
  password: z.string()
  .min(6)
  .regex(/[a-z]/, "password requires a lowercase letter")
  .regex(/[A-Z]/, "password must contain an uppercase letter")
  .regex(/[0-9]/, "password must contain a number")
});

export const CourseSchema = z.object({
  title: z.string().min(1, "title is required"),
  description: z.string().optional(),
  content: z.string().optional()
});

export const ChapterSchema = z.object({
  course_id: z.number().int().positive(),
  title: z.string().min(1, "title is required"),
  description: z.string().optional(),
  content: z.string().optional()
});

export const QuizSchema = z.object({
  title: z.string().min(1, "title is required"),
  description: z.string().optional(),
  content: z.string().optional(),
  options: z.array(z.string()).min(1, "at least one option is required"),
  valid_options: z.array(z.string()).min(1, "at least one valid option is required")
});

