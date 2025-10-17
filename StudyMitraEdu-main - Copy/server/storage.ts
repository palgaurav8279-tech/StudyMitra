import { type User, type InsertUser, type Chapter, type InsertChapter, type Quiz, type InsertQuiz, type QuizQuestion } from "@shared/schema";
import { randomUUID } from "crypto";
import { promises as fs } from "fs";
import { fileURLToPath } from "url";
import { dirname, join, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DATA_DIR = resolve(__dirname, "data");
const CHAPTERS_FILE = join(DATA_DIR, "chapters.json");
const QUIZZES_FILE = join(DATA_DIR, "quizzes.json");

async function readJSONFile<T>(filePath: string): Promise<T> {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return [] as T; // Return empty array if file doesn't exist
    }
    throw error;
  }
}

async function writeJSONFile<T>(filePath: string, data: T): Promise<void> {
  await fs.mkdir(dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Chapter methods
  getAllChapters(): Promise<Chapter[]>;
  getChaptersByClass(classNumber: number): Promise<Chapter[]>;
  getChapter(id: string): Promise<Chapter | undefined>;
  getRecentChapters(limit: number): Promise<Chapter[]>;
  createChapter(chapter: InsertChapter): Promise<Chapter>;
  deleteChapter(id: string): Promise<boolean>;

  // Quiz methods
  getAllQuizzes(): Promise<Quiz[]>;
  getQuiz(id: string): Promise<Quiz | undefined>;
  createQuiz(quiz: InsertQuiz): Promise<Quiz>;
}

export class PersistentStorage implements IStorage {
  private chapters: Chapter[] = [];
  private quizzes: Quiz[] = [];

  constructor() {
    this.loadData();
  }

  private async loadData() {
    this.chapters = await readJSONFile<Chapter[]>(CHAPTERS_FILE);
    this.quizzes = await readJSONFile<Quiz[]>(QUIZZES_FILE);
  }

  private async saveData() {
    await writeJSONFile(CHAPTERS_FILE, this.chapters);
    await writeJSONFile(QUIZZES_FILE, this.quizzes);
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    return user;
  }

  // Chapter methods
  async getAllChapters(): Promise<Chapter[]> {
    return this.chapters;
  }

  async getChaptersByClass(classNumber: number): Promise<Chapter[]> {
    return Array.from(this.chapters.values())
      .filter((ch) => ch.classNumber === classNumber)
      .sort((a, b) => {
        if (a.subject !== b.subject) return a.subject.localeCompare(b.subject);
        return a.order - b.order;
      });
  }

  async getChapter(id: string): Promise<Chapter | undefined> {
    return this.chapters.find((chapter) => chapter.id === id);
  }

  async getRecentChapters(limit: number = 6): Promise<Chapter[]> {
    return Array.from(this.chapters.values())
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, limit);
  }

  async createChapter(insertChapter: InsertChapter): Promise<Chapter> {
    const id = randomUUID();
    const chapter: Chapter = {
      ...insertChapter,
      id,
      updatedAt: new Date(),
      order: insertChapter.order ?? 0,
    };
    this.chapters.push(chapter);
    await this.saveData();
    return chapter;
  }

  async deleteChapter(id: string): Promise<boolean> {
    const initialLength = this.chapters.length;
    this.chapters = this.chapters.filter((chapter) => chapter.id !== id);
    const deleted = this.chapters.length < initialLength;
    if (deleted) await this.saveData();
    return deleted;
  }

  // Quiz methods
  async getAllQuizzes(): Promise<Quiz[]> {
    return this.quizzes;
  }

  async getQuiz(id: string): Promise<Quiz | undefined> {
    return this.quizzes.find((quiz) => quiz.id === id);
  }

  async createQuiz(insertQuiz: InsertQuiz): Promise<Quiz> {
    const id = randomUUID();
    const quiz: Quiz = {
      ...insertQuiz,
      id,
      createdAt: new Date(),
      questions: insertQuiz.questions as QuizQuestion[],
      featured: insertQuiz.featured ?? false,
    };
    this.quizzes.push(quiz);
    await this.saveData();
    return quiz;
  }

  async deleteQuiz(id: string): Promise<boolean> {
    const initialLength = this.quizzes.length;
    this.quizzes = this.quizzes.filter((quiz) => quiz.id !== id);
    const deleted = this.quizzes.length < initialLength;
    if (deleted) await this.saveData();
    return deleted;
  }
}

export const storage = new PersistentStorage();
