import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, BookOpen, HelpCircle, Trash2 } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Chapter, Quiz, QuizQuestion } from "@shared/schema";

export default function AdminDashboard() {
  const { toast } = useToast();

  // Chapter Form State
  const [chapterClass, setChapterClass] = useState("");
  const [chapterSubject, setChapterSubject] = useState("");
  const [chapterTitle, setChapterTitle] = useState("");
  const [chapterContent, setChapterContent] = useState("");
  const [chapterOrder, setChapterOrder] = useState("1");

  // Quiz Form State
  const [quizClass, setQuizClass] = useState("");
  const [quizSubject, setQuizSubject] = useState("");
  const [quizTitle, setQuizTitle] = useState("");
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([
    { question: "", options: ["", "", "", ""], correctAnswer: 0 },
  ]);
  const [quizFeatured, setQuizFeatured] = useState(false);

  const { data: chapters } = useQuery<Chapter[]>({ queryKey: ["/api/chapters"] });
  const { data: quizzes } = useQuery<Quiz[]>({ queryKey: ["/api/quizzes"] });

  const createChapterMutation = useMutation({
    mutationFn: async (data: any) => apiRequest("POST", "/api/chapters", data),
    onSuccess: () => {
      toast({ title: "Success", description: "Chapter created successfully" });
      queryClient.invalidateQueries({ queryKey: ["/api/chapters"] });
      // Reset form
      setChapterClass("");
      setChapterSubject("");
      setChapterTitle("");
      setChapterContent("");
      setChapterOrder("1");
    },
    onError: () => {
      toast({ variant: "destructive", title: "Error", description: "Failed to create chapter" });
    },
  });

  const createQuizMutation = useMutation({
    mutationFn: async (data: any) => apiRequest("POST", "/api/quizzes", data),
    onSuccess: () => {
      toast({ title: "Success", description: "Quiz created successfully" });
      queryClient.invalidateQueries({ queryKey: ["/api/quizzes"] });
      // Reset form
      setQuizClass("");
      setQuizSubject("");
      setQuizTitle("");
      setQuizQuestions([{ question: "", options: ["", "", "", ""], correctAnswer: 0 }]);
      setQuizFeatured(false);
    },
    onError: () => {
      toast({ variant: "destructive", title: "Error", description: "Failed to create quiz" });
    },
  });

  const deleteChapterMutation = useMutation({
    mutationFn: async (id: string) => apiRequest("DELETE", `/api/chapters/${id}`, {}),
    onSuccess: () => {
      toast({ title: "Success", description: "Chapter deleted successfully" });
      queryClient.invalidateQueries({ queryKey: ["/api/chapters"] });
    },
  });

  const deleteQuizMutation = useMutation({
    mutationFn: async (id: string) => apiRequest("DELETE", `/api/quizzes/${id}`, {}),
    onSuccess: () => {
      toast({ title: "Success", description: "Quiz deleted successfully" });
      queryClient.invalidateQueries({ queryKey: ["/api/quizzes"] });
    },
    onError: () => {
      toast({ variant: "destructive", title: "Error", description: "Failed to delete quiz" });
    },
  });

  const handleCreateChapter = (e: React.FormEvent) => {
    e.preventDefault();
    createChapterMutation.mutate({
      classNumber: parseInt(chapterClass),
      subject: chapterSubject,
      title: chapterTitle,
      content: chapterContent,
      order: parseInt(chapterOrder),
    });
  };

  const handleCreateQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    createQuizMutation.mutate({
      classNumber: parseInt(quizClass),
      subject: quizSubject,
      title: quizTitle,
      questions: quizQuestions,
      featured: quizFeatured,
    });
  };

  const addQuestion = () => {
    setQuizQuestions([...quizQuestions, { question: "", options: ["", "", "", ""], correctAnswer: 0 }]);
  };

  const updateQuestion = (index: number, field: keyof QuizQuestion, value: any) => {
    const updated = [...quizQuestions];
    updated[index] = { ...updated[index], [field]: value };
    setQuizQuestions(updated);
  };

  const updateOption = (qIndex: number, optIndex: number, value: string) => {
    const updated = [...quizQuestions];
    updated[qIndex].options[optIndex] = value;
    setQuizQuestions(updated);
  };

  const removeQuestion = (index: number) => {
    setQuizQuestions(quizQuestions.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3" data-testid="text-page-title">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground text-lg">
            Manage chapters, quizzes, and content for StudyMitra
          </p>
        </div>

        <Tabs defaultValue="chapters" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="chapters" data-testid="tab-chapters">Chapters</TabsTrigger>
            <TabsTrigger value="quizzes" data-testid="tab-quizzes">Quizzes</TabsTrigger>
            <TabsTrigger value="manage" data-testid="tab-manage">Manage</TabsTrigger>
          </TabsList>

          {/* Chapters Tab */}
          <TabsContent value="chapters" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Add New Chapter
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateChapter} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Class</Label>
                      <Select value={chapterClass} onValueChange={setChapterClass} required>
                        <SelectTrigger data-testid="select-chapter-class">
                          <SelectValue placeholder="Select class" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="6">Class 6</SelectItem>
                          <SelectItem value="7">Class 7</SelectItem>
                          <SelectItem value="8">Class 8</SelectItem>
                          <SelectItem value="9">Class 9</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Subject</Label>
                      <Select value={chapterSubject} onValueChange={setChapterSubject} required>
                        <SelectTrigger data-testid="select-chapter-subject">
                          <SelectValue placeholder="Select subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Science">Science</SelectItem>
                          <SelectItem value="Math">Math</SelectItem>
                          <SelectItem value="English">English</SelectItem>
                          <SelectItem value="Social Science">Social Science</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Order</Label>
                      <Input
                        type="number"
                        value={chapterOrder}
                        onChange={(e) => setChapterOrder(e.target.value)}
                        min="1"
                        data-testid="input-chapter-order"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Chapter Title</Label>
                    <Input
                      value={chapterTitle}
                      onChange={(e) => setChapterTitle(e.target.value)}
                      placeholder="Enter chapter title"
                      required
                      data-testid="input-chapter-title"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Chapter Content</Label>
                    <Textarea
                      value={chapterContent}
                      onChange={(e) => setChapterContent(e.target.value)}
                      placeholder="Enter chapter content (supports formatting)"
                      rows={10}
                      required
                      data-testid="textarea-chapter-content"
                    />
                  </div>

                  <Button type="submit" disabled={createChapterMutation.isPending} data-testid="button-create-chapter">
                    <Plus className="w-4 h-4 mr-2" />
                    {createChapterMutation.isPending ? "Creating..." : "Create Chapter"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Quizzes Tab */}
          <TabsContent value="quizzes" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5" />
                  Add New Quiz
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateQuiz} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Class</Label>
                      <Select value={quizClass} onValueChange={setQuizClass} required>
                        <SelectTrigger data-testid="select-quiz-class">
                          <SelectValue placeholder="Select class" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="6">Class 6</SelectItem>
                          <SelectItem value="7">Class 7</SelectItem>
                          <SelectItem value="8">Class 8</SelectItem>
                          <SelectItem value="9">Class 9</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Subject</Label>
                      <Select value={quizSubject} onValueChange={setQuizSubject} required>
                        <SelectTrigger data-testid="select-quiz-subject">
                          <SelectValue placeholder="Select subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Science">Science</SelectItem>
                          <SelectItem value="Math">Math</SelectItem>
                          <SelectItem value="English">English</SelectItem>
                          <SelectItem value="Social Science">Social Science</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Quiz Title</Label>
                    <Input
                      value={quizTitle}
                      onChange={(e) => setQuizTitle(e.target.value)}
                      placeholder="Enter quiz title"
                      required
                      data-testid="input-quiz-title"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={quizFeatured}
                      onChange={(e) => setQuizFeatured(e.target.checked)}
                      className="w-4 h-4"
                      data-testid="checkbox-quiz-featured"
                    />
                    <Label htmlFor="featured">Mark as Featured</Label>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-lg">Questions</Label>
                      <Button type="button" size="sm" onClick={addQuestion} data-testid="button-add-question">
                        <Plus className="w-4 h-4 mr-1" />
                        Add Question
                      </Button>
                    </div>

                    {quizQuestions.map((q, qIndex) => (
                      <Card key={qIndex}>
                        <CardContent className="p-4 space-y-3">
                          <div className="flex items-start justify-between gap-2">
                            <Input
                              value={q.question}
                              onChange={(e) => updateQuestion(qIndex, "question", e.target.value)}
                              placeholder={`Question ${qIndex + 1}`}
                              required
                              data-testid={`input-question-${qIndex}`}
                            />
                            {quizQuestions.length > 1 && (
                              <Button
                                type="button"
                                size="icon"
                                variant="ghost"
                                onClick={() => removeQuestion(qIndex)}
                                data-testid={`button-remove-question-${qIndex}`}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            )}
                          </div>

                          <div className="space-y-2">
                            {q.options.map((opt, optIndex) => (
                              <div key={optIndex} className="flex items-center gap-2">
                                <input
                                  type="radio"
                                  name={`correct-${qIndex}`}
                                  checked={q.correctAnswer === optIndex}
                                  onChange={() => updateQuestion(qIndex, "correctAnswer", optIndex)}
                                  className="w-4 h-4"
                                  data-testid={`radio-correct-${qIndex}-${optIndex}`}
                                />
                                <Input
                                  value={opt}
                                  onChange={(e) => updateOption(qIndex, optIndex, e.target.value)}
                                  placeholder={`Option ${optIndex + 1}`}
                                  required
                                  data-testid={`input-option-${qIndex}-${optIndex}`}
                                />
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <Button type="submit" disabled={createQuizMutation.isPending} data-testid="button-create-quiz">
                    <Plus className="w-4 h-4 mr-2" />
                    {createQuizMutation.isPending ? "Creating..." : "Create Quiz"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5" />
                  Manage Quizzes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {quizzes?.map((quiz) => (
                    <li key={quiz.id} className="flex items-center justify-between">
                      <span>{quiz.title}</span>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteQuizMutation.mutate(quiz.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </Button>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Manage Tab */}
          <TabsContent value="manage" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Manage Chapters</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {chapters?.map((chapter) => (
                    <div
                      key={chapter.id}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50"
                      data-testid={`manage-chapter-${chapter.id}`}
                    >
                      <div>
                        <p className="font-medium">{chapter.title}</p>
                        <p className="text-sm text-muted-foreground">
                          Class {chapter.classNumber} - {chapter.subject}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => deleteChapterMutation.mutate(chapter.id)}
                        data-testid={`button-delete-chapter-${chapter.id}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  {!chapters?.length && (
                    <p className="text-center text-muted-foreground py-8">No chapters yet</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Manage Quizzes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {quizzes?.map((quiz) => (
                    <div
                      key={quiz.id}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50"
                      data-testid={`manage-quiz-${quiz.id}`}
                    >
                      <div>
                        <p className="font-medium">{quiz.title}</p>
                        <p className="text-sm text-muted-foreground">
                          Class {quiz.classNumber} - {quiz.subject} - {quiz.questions.length} questions
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => deleteQuizMutation.mutate(quiz.id)}
                        data-testid={`button-delete-quiz-${quiz.id}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  {!quizzes?.length && (
                    <p className="text-center text-muted-foreground py-8">No quizzes yet</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
}
