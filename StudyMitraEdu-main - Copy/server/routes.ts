import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertChapterSchema, insertQuizSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Chapter routes
  app.get("/api/chapters", async (_req, res) => {
    try {
      const chapters = await storage.getAllChapters();
      res.json(chapters);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch chapters" });
    }
  });

  app.get("/api/chapters/recent", async (_req, res) => {
    try {
      const chapters = await storage.getRecentChapters(6);
      res.json(chapters);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch recent chapters" });
    }
  });

  app.get("/api/chapters/:id", async (req, res) => {
    try {
      const chapter = await storage.getChapter(req.params.id);
      if (!chapter) {
        return res.status(404).json({ message: "Chapter not found" });
      }
      res.json(chapter);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch chapter" });
    }
  });

  app.post("/api/chapters", async (req, res) => {
    try {
      const validatedData = insertChapterSchema.parse(req.body);
      const chapter = await storage.createChapter(validatedData);
      res.status(201).json(chapter);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid chapter data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create chapter" });
    }
  });

  app.delete("/api/chapters/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteChapter(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Chapter not found" });
      }
      res.json({ message: "Chapter deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete chapter" });
    }
  });

  // Quiz routes
  app.get("/api/quizzes", async (_req, res) => {
    try {
      const quizzes = await storage.getAllQuizzes();
      res.json(quizzes);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch quizzes" });
    }
  });

  app.get("/api/quizzes/:id", async (req, res) => {
    try {
      const quiz = await storage.getQuiz(req.params.id);
      if (!quiz) {
        return res.status(404).json({ message: "Quiz not found" });
      }
      res.json(quiz);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch quiz" });
    }
  });

  app.post("/api/quizzes", async (req, res) => {
    try {
      const validatedData = insertQuizSchema.parse(req.body);
      const quiz = await storage.createQuiz(validatedData);
      res.status(201).json(quiz);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid quiz data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create quiz" });
    }
  });

  app.delete("/api/quizzes/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteQuiz(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Quiz not found" });
      }
      res.json({ message: "Quiz deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete quiz" });
    }
  });

  // Admin authentication routes
  app.post("/api/admin/login", async (req, res) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
      }

      const user = await storage.getUserByUsername(username);

      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // In a real app, you'd set up session/JWT here
      // For now, just return success
      res.json({ message: "Login successful", user: { id: user.id, username: user.username } });
    } catch (error) {
      res.status(500).json({ message: "Login failed" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
