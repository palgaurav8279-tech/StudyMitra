import { useState } from "react";
import { useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle, XCircle, Trophy, RotateCcw } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useQuery } from "@tanstack/react-query";
import type { Quiz } from "@shared/schema";

export default function QuizPage() {
  const [, params] = useRoute("/quiz/:id");
  const quizId = params?.id || "";

  const { data: quiz, isLoading } = useQuery<Quiz>({
    queryKey: ["/api/quizzes/" + quizId],
  });

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/4 mb-8"></div>
            <div className="h-64 bg-muted rounded"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Quiz Not Found</h1>
          <Link href="/quizzes">
            <Button>Back to Quizzes</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const question = quiz.questions[currentQuestion];
  const isLastQuestion = currentQuestion === quiz.questions.length - 1;
  const hasSelectedAnswer = selectedAnswers[currentQuestion] !== undefined;

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      setShowResults(true);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
  };

  const calculateScore = () => {
    let correct = 0;
    quiz.questions.forEach((q, index) => {
      if (selectedAnswers[index] === q.correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  if (showResults) {
    const score = calculateScore();
    const percentage = Math.round((score / quiz.questions.length) * 100);

    return (
      <div className="min-h-screen bg-background">
        <Navigation />

        <div className="max-w-4xl mx-auto px-4 py-12">
          <Card className="border-primary/30">
            <CardContent className="p-8 md:p-12 text-center">
              <Trophy className="w-20 h-20 mx-auto mb-6 text-primary" />
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-quiz-complete">
                Quiz Complete!
              </h1>

              <div className="mb-8">
                <p className="text-6xl font-bold mb-2" data-testid="text-quiz-score">
                  {score}/{quiz.questions.length}
                </p>
                <p className="text-xl text-muted-foreground" data-testid="text-quiz-percentage">
                  {percentage}% Correct
                </p>
              </div>

              <div className="space-y-4 mb-8 max-w-2xl mx-auto">
                {quiz.questions.map((q, index) => {
                  const isCorrect = selectedAnswers[index] === q.correctAnswer;
                  return (
                    <Card key={index} className={isCorrect ? "border-success" : "border-destructive"}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          {isCorrect ? (
                            <CheckCircle className="w-6 h-6 text-success flex-shrink-0 mt-0.5" />
                          ) : (
                            <XCircle className="w-6 h-6 text-destructive flex-shrink-0 mt-0.5" />
                          )}
                          <div className="text-left flex-1">
                            <p className="font-medium mb-2">{q.question}</p>
                            <p className={`text-sm ${isCorrect ? "text-success" : "text-destructive"}`}>
                              Your answer: {q.options[selectedAnswers[index]]}
                            </p>
                            {!isCorrect && (
                              <p className="text-sm text-success mt-1">
                                Correct answer: {q.options[q.correctAnswer]}
                              </p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={handleRetry} className="gap-2" data-testid="button-retry-quiz">
                  <RotateCcw className="w-4 h-4" />
                  Retry Quiz
                </Button>
                <Link href="/quizzes">
                  <Button variant="outline" data-testid="button-back-to-quizzes">
                    Back to Quizzes
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Badge data-testid={`badge-class-${quiz.classNumber}`}>Class {quiz.classNumber}</Badge>
              <Badge variant="outline" data-testid={`badge-subject-${quiz.subject}`}>{quiz.subject}</Badge>
            </div>
            <Badge variant="secondary" data-testid="badge-progress">
              {currentQuestion + 1} / {quiz.questions.length}
            </Badge>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold" data-testid="text-quiz-title">
            {quiz.title}
          </h1>
        </div>

        {/* Question Card */}
        <Card className="mb-6">
          <CardContent className="p-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-6" data-testid={`text-question-${currentQuestion}`}>
              {question.question}
            </h2>

            <RadioGroup
              value={selectedAnswers[currentQuestion]?.toString()}
              onValueChange={(value) => handleAnswerSelect(parseInt(value))}
            >
              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer hover:border-primary/50 ${
                      selectedAnswers[currentQuestion] === index
                        ? "border-primary bg-primary/5"
                        : "border-border"
                    }`}
                    onClick={() => handleAnswerSelect(index)}
                    data-testid={`option-${index}`}
                  >
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                    <Label
                      htmlFor={`option-${index}`}
                      className="flex-1 cursor-pointer font-medium"
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between gap-4">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            data-testid="button-previous"
          >
            Previous
          </Button>

          <Button
            onClick={handleNext}
            disabled={!hasSelectedAnswer}
            data-testid="button-next"
          >
            {isLastQuestion ? "View Results" : "Next"}
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
