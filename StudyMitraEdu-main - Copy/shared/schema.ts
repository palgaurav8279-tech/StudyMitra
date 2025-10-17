import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, jsonb, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Admin Users
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Chapters
export const chapters = pgTable("chapters", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  classNumber: integer("class_number").notNull(), // 6, 7, 8, or 9
  subject: text("subject").notNull(), // Science, Math, English, Social Science
  title: text("title").notNull(),
  content: text("content").notNull(),
  order: integer("order").notNull().default(0),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertChapterSchema = createInsertSchema(chapters).omit({
  id: true,
  updatedAt: true,
});

export type InsertChapter = z.infer<typeof insertChapterSchema>;
export type Chapter = typeof chapters.$inferSelect;

// Quizzes
export const quizzes = pgTable("quizzes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  classNumber: integer("class_number").notNull(),
  subject: text("subject").notNull(),
  title: text("title").notNull(),
  questions: jsonb("questions").notNull().$type<QuizQuestion[]>(),
  featured: boolean("featured").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number; // index of correct option
}

export const insertQuizSchema = createInsertSchema(quizzes).omit({
  id: true,
  createdAt: true,
});

export type InsertQuiz = z.infer<typeof insertQuizSchema>;
export type Quiz = typeof quizzes.$inferSelect;
