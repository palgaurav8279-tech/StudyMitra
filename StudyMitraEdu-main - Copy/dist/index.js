// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
import { randomUUID } from "crypto";
import { promises as fs } from "fs";
import { fileURLToPath } from "url";
import { dirname, join, resolve } from "path";
var __filename = fileURLToPath(import.meta.url);
var __dirname = dirname(__filename);
var DATA_DIR = resolve(__dirname, "data");
var CHAPTERS_FILE = join(DATA_DIR, "chapters.json");
var QUIZZES_FILE = join(DATA_DIR, "quizzes.json");
async function readJSONFile(filePath) {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    if (error.code === "ENOENT") {
      return [];
    }
    throw error;
  }
}
async function writeJSONFile(filePath, data) {
  await fs.mkdir(dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}
var PersistentStorage = class {
  chapters = [];
  quizzes = [];
  constructor() {
    this.loadData();
  }
  async loadData() {
    this.chapters = await readJSONFile(CHAPTERS_FILE);
    this.quizzes = await readJSONFile(QUIZZES_FILE);
  }
  async saveData() {
    await writeJSONFile(CHAPTERS_FILE, this.chapters);
    await writeJSONFile(QUIZZES_FILE, this.quizzes);
  }
  // User methods
  async getUser(id) {
    return void 0;
  }
  async getUserByUsername(username) {
    return void 0;
  }
  async createUser(insertUser) {
    const id = randomUUID();
    const user = { ...insertUser, id };
    return user;
  }
  // Chapter methods
  async getAllChapters() {
    return this.chapters;
  }
  async getChaptersByClass(classNumber) {
    return Array.from(this.chapters.values()).filter((ch) => ch.classNumber === classNumber).sort((a, b) => {
      if (a.subject !== b.subject) return a.subject.localeCompare(b.subject);
      return a.order - b.order;
    });
  }
  async getChapter(id) {
    return this.chapters.find((chapter) => chapter.id === id);
  }
  async getRecentChapters(limit = 6) {
    return Array.from(this.chapters.values()).sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()).slice(0, limit);
  }
  async createChapter(insertChapter) {
    const id = randomUUID();
    const chapter = {
      ...insertChapter,
      id,
      updatedAt: /* @__PURE__ */ new Date(),
      order: insertChapter.order ?? 0
    };
    this.chapters.push(chapter);
    await this.saveData();
    return chapter;
  }
  async deleteChapter(id) {
    const initialLength = this.chapters.length;
    this.chapters = this.chapters.filter((chapter) => chapter.id !== id);
    const deleted = this.chapters.length < initialLength;
    if (deleted) await this.saveData();
    return deleted;
  }
  // Quiz methods
  async getAllQuizzes() {
    return this.quizzes;
  }
  async getQuiz(id) {
    return this.quizzes.find((quiz) => quiz.id === id);
  }
  async createQuiz(insertQuiz) {
    const id = randomUUID();
    const quiz = {
      ...insertQuiz,
      id,
      createdAt: /* @__PURE__ */ new Date(),
      questions: insertQuiz.questions,
      featured: insertQuiz.featured ?? false
    };
    this.quizzes.push(quiz);
    await this.saveData();
    return quiz;
  }
  async deleteQuiz(id) {
    const initialLength = this.quizzes.length;
    this.quizzes = this.quizzes.filter((quiz) => quiz.id !== id);
    const deleted = this.quizzes.length < initialLength;
    if (deleted) await this.saveData();
    return deleted;
  }
};
var storage = new PersistentStorage();

// shared/schema.ts
import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, jsonb, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});
var chapters = pgTable("chapters", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  classNumber: integer("class_number").notNull(),
  // 6, 7, 8, or 9
  subject: text("subject").notNull(),
  // Science, Math, English, Social Science
  title: text("title").notNull(),
  content: text("content").notNull(),
  order: integer("order").notNull().default(0),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});
var insertChapterSchema = createInsertSchema(chapters).omit({
  id: true,
  updatedAt: true
});
var quizzes = pgTable("quizzes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  classNumber: integer("class_number").notNull(),
  subject: text("subject").notNull(),
  title: text("title").notNull(),
  questions: jsonb("questions").notNull().$type(),
  featured: boolean("featured").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var insertQuizSchema = createInsertSchema(quizzes).omit({
  id: true,
  createdAt: true
});

// server/routes.ts
import { z } from "zod";
async function registerRoutes(app2) {
  app2.get("/api/chapters", async (_req, res) => {
    try {
      const chapters2 = await storage.getAllChapters();
      res.json(chapters2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch chapters" });
    }
  });
  app2.get("/api/chapters/recent", async (_req, res) => {
    try {
      const chapters2 = await storage.getRecentChapters(6);
      res.json(chapters2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch recent chapters" });
    }
  });
  app2.get("/api/chapters/:id", async (req, res) => {
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
  app2.post("/api/chapters", async (req, res) => {
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
  app2.delete("/api/chapters/:id", async (req, res) => {
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
  app2.get("/api/quizzes", async (_req, res) => {
    try {
      const quizzes2 = await storage.getAllQuizzes();
      res.json(quizzes2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch quizzes" });
    }
  });
  app2.get("/api/quizzes/:id", async (req, res) => {
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
  app2.post("/api/quizzes", async (req, res) => {
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
  app2.delete("/api/quizzes/:id", async (req, res) => {
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
  app2.post("/api/admin/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
      }
      const user = await storage.getUserByUsername(username);
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      res.json({ message: "Login successful", user: { id: user.id, username: user.username } });
    } catch (error) {
      res.status(500).json({ message: "Login failed" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs2 from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      ),
      await import("@replit/vite-plugin-dev-banner").then(
        (m) => m.devBanner()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    port: 3e3,
    fs: {
      strict: true,
      deny: ["**/.*"]
    },
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        rewrite: (path3) => path3.replace(/^\/api/, "")
      }
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs2.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs2.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen({
    port,
    host: "127.0.0.1"
    // IPv4 address
  }, () => {
    log(`serving on http://127.0.0.1:${port}`);
  });
})();
