import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, Clock, ChevronRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AdPanel from "@/components/AdPanel";
import { useQuery } from "@tanstack/react-query";
import type { Quiz } from "@shared/schema";

export default function QuizzesPage() {
  const { data: quizzes, isLoading } = useQuery<Quiz[]>({
    queryKey: ["/api/quizzes"],
  });

  const featuredQuizzes = quizzes?.filter((q) => q.featured) || [];
  const otherQuizzes = quizzes?.filter((q) => !q.featured) || [];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1 lg:w-[70%]">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-3" data-testid="text-page-title">
                Interactive Quizzes
              </h1>
              <p className="text-muted-foreground text-lg">
                Test your knowledge and reinforce your learning with our interactive quizzes
              </p>
            </div>

            {/* Featured Quizzes */}
            {featuredQuizzes.length > 0 && (
              <section className="mb-12">
                <div className="flex items-center gap-2 mb-6">
                  <Trophy className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-semibold" data-testid="text-section-featured">
                    Featured Quizzes
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {featuredQuizzes.map((quiz) => (
                    <Link key={quiz.id} href={`/quiz/${quiz.id}`}>
                      <Card 
                        className="group cursor-pointer hover:shadow-lg transition-all duration-200 hover:-translate-y-1 border-primary/30"
                        data-testid={`card-quiz-${quiz.id}`}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <Badge className="bg-primary" data-testid={`badge-class-${quiz.classNumber}`}>
                              Class {quiz.classNumber}
                            </Badge>
                            <Badge variant="outline" data-testid={`badge-subject-${quiz.subject}`}>
                              {quiz.subject}
                            </Badge>
                          </div>

                          <h3 className="font-semibold text-xl mb-3 group-hover:text-primary transition-colors" data-testid={`text-quiz-title-${quiz.id}`}>
                            {quiz.title}
                          </h3>

                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              <span>{quiz.questions.length} questions</span>
                            </div>
                            <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* All Quizzes */}
            <section>
              <h2 className="text-2xl font-semibold mb-6" data-testid="text-section-all">
                All Quizzes
              </h2>

              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[1, 2, 3, 4].map((i) => (
                    <Card key={i} className="animate-pulse">
                      <CardContent className="p-6">
                        <div className="h-6 bg-muted rounded w-3/4 mb-3"></div>
                        <div className="h-4 bg-muted rounded w-1/2"></div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : otherQuizzes.length > 0 || featuredQuizzes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {(featuredQuizzes.length === 0 ? quizzes : otherQuizzes)?.map((quiz) => (
                    <Link key={quiz.id} href={`/quiz/${quiz.id}`}>
                      <Card 
                        className="group cursor-pointer hover:shadow-md transition-all hover-elevate"
                        data-testid={`card-quiz-${quiz.id}`}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <Badge variant="secondary" data-testid={`badge-class-${quiz.classNumber}`}>
                              Class {quiz.classNumber}
                            </Badge>
                            <Badge variant="outline" data-testid={`badge-subject-${quiz.subject}`}>
                              {quiz.subject}
                            </Badge>
                          </div>

                          <h3 className="font-semibold text-lg mb-3 group-hover:text-primary transition-colors" data-testid={`text-quiz-title-${quiz.id}`}>
                            {quiz.title}
                          </h3>

                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            <span>{quiz.questions.length} questions</span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Trophy className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-xl font-semibold mb-2">No Quizzes Available</h3>
                    <p className="text-muted-foreground">
                      Quizzes will be added soon. Check back later!
                    </p>
                  </CardContent>
                </Card>
              )}
            </section>
          </div>

          {/* Ad Panel */}
          <AdPanel />
        </div>
      </div>

      <Footer />
    </div>
  );
}
